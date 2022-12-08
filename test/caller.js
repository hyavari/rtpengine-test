const fs = require('fs');
const Client = require('rtpengine-client').Client;
const sdpTransform = require('sdp-transform');
const config = require("../config");

var cmdArgs = process.argv.slice(2);
const callerSdp = JSON.parse(fs.readFileSync(cmdArgs[0]).toString());

const port = config.rtpEnginePort;
const ip = config.rtpEngineHost;
const caller = new Client(config.callerNgPort, config.callerHost);

caller.offer(port, ip, callerSdp)
    .then((res) => {
        console.log(res);
        let callerPort = sdpTransform.parse(res.sdp).media[0].port;
        console.log("RTPEngine port for caller: " + callerPort);
        process.exit(1)
    })
    .catch((err) => {
        console.log(`Error!!!: ${err}`);
        process.exit(1)
    })