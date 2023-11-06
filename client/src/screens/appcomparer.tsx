import React from "react";
import Editor from "@monaco-editor/react";
import { Stack, Box, getValue } from "@mui/system";
import {
  Chip,
  Typography,
  Button
} from "@mui/material";
import { PostmanModel, isFolderType, Item } from "../models/postman";
import postmanToOutput from "../helpers/postmanToOutput";
import { IResult } from "../models/result";
import { useFetcher } from "../helpers/fetch";



export const AppComparer = () => {
  const [input, setInput] = React.useState<string>("");
  const [output, setOutput] = React.useState<IResult[]>([]);
  const [data, setData] = React.useState<any[] | null>(null);

  const handleCollection = () => {
    if (!input) return setOutput([]);
    try {
      const results: IResult[] = postmanToOutput(JSON.parse(input));
      setOutput(results);
      console.log(results);
    } catch (e) {
      console.log(e);
    }
  }

  useFetcher({
    config: {
      method: "GET",
      url: `/activecampaign/1/comparer`,
    },
    onSuccess: (data) => {
      setData(data);
      console.log(data)
    },
    onError: () => null
  });

  return (
    <Box p={2}>
      <Stack
        spacing={2}
        direction="column"
        alignItems="start"
        justifyContent="space-between"
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <React.Fragment>
              <Typography variant="h4">Active Campaign</Typography>
              <Chip
                size="small"
                variant="filled"
                color="secondary"
                label={"1.32.9"}
              />
            </React.Fragment>
          </Stack>
          <Box mt={1}>

          </Box>

        </Box>
        <Editor
          height="200px"
          language="json"
          theme="vs-dark"
          //defaultValue="// put a Postman collection here"
          value={input}
          onChange={(value) => setInput(value || "")}
          options={{ readOnly: false, minimap: { enabled: false } }}
        />
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCollection}
        >Parse collection
        </Button>
        {/* <Button
          variant="outlined"
          color="secondary"
          onClick={FetchModules}
        >Get modules
        </Button> */}
      </Stack>
    </Box>
  );
}