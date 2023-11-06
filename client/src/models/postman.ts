export const isFolderType = (value: Folder | Item): value is Folder => {
  return value.hasOwnProperty("item");
};

export type PostmanModel = {
  info: Info;
  item: (Folder | Item)[];
};

interface Info {
  name: string;
  // _postman_id
}

export interface Folder {
  // event
  // protocolProfileBehavior
  name: string;
  item: Item[];
}

export interface Item {
  name: string;
  request: Request;
  response: Response[];
}

export interface Request {
  // auth
  //header
  method: Method;
  body: Body;
  url: Url;
}

export interface Response {
  //originalRequest
  // _postman_previewlanguage
  // header
  // cookie
  name: string;
  status: string;
  code: number;
  body: string;
}

interface Url {
  // path: string[]
  raw: string;
  host: string[];
}

interface Body {
  // options
  mode: Mode;
  raw: string;
}

type Method =
  | "GET"
  | "PUT"
  | "POST"
  | "PATCH"
  | "DELETE"
  | "COPY"
  | "HEAD"
  | "OPTIONS"
  | "LINK"
  | "UNLINK"
  | "PURGE"
  | "LOCK"
  | "UNLOCK"
  | "PROPFIND"
  | "VIEW";

type Mode = "raw" | "urlencoded" | "formdata" | "file" | "graphql";
