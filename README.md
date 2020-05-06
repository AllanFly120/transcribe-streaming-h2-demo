## Overview
This demo shows how a speech is transcribed over H2 endpoint by transcribe streaming service.

## Building and Deploying

1. Clone the repo

2. Clone the SDK V3 repo outside this package folder: 
    ```
    cd ..
    git clone https://github.com/AllanFly120/aws-sdk-js-v3.git
    cd aws-sdk-js-v3
    git checkout h2-eventstream-continue
    ```
    if you don't checkout SDK to directory above, you need to replace the client importing path in **step 8** to the correct one.
3. Bootstrap the workspace, make sure you have [yarn installed](https://classic.yarnpkg.com/en/docs/install/#mac-stable):
    ```
    yarn bootstrap
    yarn build:crypto-dependencies
    ```
4. Build the SDK core packages, make sure you have lerna installed. If not, run `npm i -g lerna`
    ```
    lerna run pretest --scope '@aws-sdk/client-transcribe-streaming' --include-dependencies
    ```
5. Build Transcribe Streaming client:
    ```
    cd clients/client-transcribe-streaming
    yarn build
    ```
    Now the client is ready to be consumed.
6. To back to this repo:
    ```
    cd ../../../transcribe-streaming-h2-demo
    ```
7. run `npm install`

8. confirm the client importing path in `lib/main.js`. If you clone the SDK repo into other location, you need to update the import path to correct one:
    ```javascript
    const { TranscribeStreamingClient, StartStreamTranscriptionCommand } = require("../../aws-sdk-js-v3/clients/client-transcribe-streaming"); // <--update this path
    ```
9. Make sure you are using Node.js >= 10. Execute the process with command: `node src/index.js`

If you'd like to make code change and automatically refresh the page, you can run:
```
npm run start
```

## License

This library is licensed under the Apache 2.0 License. 
