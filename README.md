# App-API-Upgrade

### Overview

Purpose of this app is to simplify manual review/update processes by using postman collection format.

Concept document is [here](https://docs.google.com/document/d/1aD6y_n-BmZHYsJJdulv3J-fQunYvyjZuFztxuYOo0mY/edit)

### Env variables

PORT=8080 <br>
DB_HOST=localhost <br>
DB_NAME=integromat <br>
DB_PORT=27017 <br>

### Get started

Step 1. Install dependencies

    npm install
     
Step 2. Install TypeScript globally

    run npm install -g typescript
    
Step 3. Create .env file and fill it

    cd server && touch .env
    
Step 4. Run client and sever at same time

    npm run start:client
    npm run start:server

### Database
Set up a MongoDB Docker container <br>
Use these files to upload [commits](https://integromat.slack.com/files/U021GHF119D/F0636BYM6Q6/commits.json) and [apps](https://integromat.slack.com/files/U021GHF119D/F063CU8M7GB/apps.json)


