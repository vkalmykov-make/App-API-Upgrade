export interface IResult {
  group: string;
  name: string;
  value: {
    request?: IResultRequest;
    response?: IResultResponse;
  };
}

export interface IResultRequest {
  method: string;
  url: string;
  qs?: string;
  body?: string | null;
}

export interface IResultResponse {
  output?: string[];
}


