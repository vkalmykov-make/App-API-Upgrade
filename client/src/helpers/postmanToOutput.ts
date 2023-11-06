import { PostmanModel, isFolderType, Item } from "../models/postman";
import { IResult } from "../models/result";
import { JsonToType } from "./jsontotype";

const apiToResult = (item: Item, name: string): IResult => {

  let result: IResult = {
    group: name,
    name: item.name,
    value: {},
  };

  if (item.request) {

    let url = "";
    let requestBody = null;

    if (item.request.url.raw) {
      url = item.request.url.raw;
    }

    if (item.request.body?.raw) {
      requestBody = JsonToType(item.request.body.raw);
    }

    result.value.request = {
      method: item.request.method,
      url: url,
      body: requestBody,
    }
  }

  if (item.response) {
    const output: string[] = [];
    item.response.forEach(i => {
      if (i.body) {
        let responseBody = JsonToType(i.body)
        if (responseBody) {
          output.push(responseBody);
        }
      }
    })
    result.value.response = {
      output: output,
    }
  }

  return result;
};


const postmanToOutput = (input: PostmanModel): IResult[] => {
  const results: IResult[] = [];

  input.item.forEach(item => {
    if (isFolderType(item)) {
      item.item.forEach((i) => {
        const result: IResult = apiToResult(i, item.name);
        results.push(result);
      });
    };
    if (!isFolderType(item)) {
      const result: IResult = apiToResult(item, "");
      results.push(result);
    }
  });

  return results;
}

export default postmanToOutput;