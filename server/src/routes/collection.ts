import axios, { AxiosResponse } from 'axios';
import "dotenv/config";


const collectionID:string= "14246477-3bc661d0-12e3-4a63-b916-8b6c27fcea10"
const endpoint = `https://api.getpostman.com/collections/${collectionID}`;
const apiKey = process.env.postmanApiKey || 'PMAK-64944dbbf99f4a0031f976d6-225641ba508bdd77bae3d77af7ebd9c112';

// Define your API request headers
const headers = {
  'X-Api-Key': apiKey,
};

axios.get(endpoint, { headers })
  .then((response: AxiosResponse) => {
    console.log(response.data);
  })
  .catch((error: any) => {
    console.error(error);
  });


