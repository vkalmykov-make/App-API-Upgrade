import mongoose, { Schema } from "mongoose";

const CommitSchema = new Schema(
  {
    app_name: String,
    name: String,
    table: String,
    column: String,
    created: String,
    app_version: Number,
    commit_message: String,
    value: {
      type: Schema.Types.Mixed,
      get: (obj: any) => {
        return JSON.stringify(obj, null, "\t");
      },
    },
  },
  { toJSON: { getters: true } }
);

export const CommitModel = mongoose.model("Commit", CommitSchema);
