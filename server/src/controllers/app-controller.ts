import axios from "axios";
import { AppModel } from "../models/app-model";
import { CommitModel } from "../models/commit-model";

export type GetAppParams = {
  name: string;
  version: string;
}

export type GetAppsQuery = {
  skip?: string;
  take?: string;
  search?: string;
  apps?: string[] | "*";
}

export type GetAppChangesQuery = GetAppParams & {
  table: string;
};


export class AppController {
  private static metaFields = [
    "name",
    "theme",
    "label",
    "origin",
    "version",
    "version_full"
  ];

  static get = async (query: GetAppsQuery = {}) => {
    const { search, skip, take, apps } = query;

    return AppModel.find(
      (() => {
        if (!search && apps === "*") {
          return {};
        }

        const searchFilter = !search
          ? {}
          : {
            $or: [
              { name: { $regex: "^" + search, $options: "i" } },
              { label: { $regex: "^" + search, $options: "i" } },
            ],
          };

        if (apps === "*") {
          return searchFilter;
        }

        return {
          $and: [
            {
              name: { $in: Array.isArray(apps) ? apps : [] }
            },
            searchFilter
          ]
        }
      })(),
      {},
      {
        sort: {
          name: 1,
        },
        skip: Number(skip),
        limit: Number(take),
      }
    ).select(
      this.metaFields.join(" ")
    );
  }

  static getOne = async ({ name, version }: GetAppParams) => {

    return AppModel.findOne({
      $and: [
        { name },
        { version: parseInt(version as string) }
      ],
    })
      .select(
        ["", "_id", "invite_token", "__v"].join(" -")
      );
  }

  static getChanges = async (query: GetAppChangesQuery) => {
    const { table, name, version } = query;

    return CommitModel.aggregate([
      {
        $match: { $and: [{ app_name: name }, { table: "module" }, { column: "api" }, { app_version: parseInt(version as string) }] }
      },
      {
        $sort: { created: -1 }
      },
      {
        $group: {
          _id: { name: "$name" },
          created: { $first: "$created" },
          value: { $push: "$value" }
        }
      }
    ])
  }
}