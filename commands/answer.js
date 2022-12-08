const fs = require('fs');
const config = require("../config");
const Client = require('rtpengine-client').Client;
const client = new Client(); //you can specify client port and host

const myArgs = process.const.slice(2);
const sdp = JSON.parse(fs.readFileSync(myArgs[0]).toString());
console.log(sdp);

client.answer(config.rtpEnginePort, config.rtpEngineHost, sdp)
    .then((res) => {
        console.log(res); // {"result": "ok", "sdp": "v=\0..."}
    })
    .catch((err) => {
        console.log(`Error!!!: ${err}`);
    })

