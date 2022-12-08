const fs = require('fs');
const Client = require('rtpengine-client').Client;
const sdpTransform = require('sdp-transform');
const config = require("../config");

var cmdArgs = process.argv.slice(2);
const calleeSdp = JSON.parse(fs.readFileSync(cmdArgs[0]).toString());

const port = config.rtpEnginePort;
const ip = config.rtpEngineHost;
const callee = new Client(config.calleeNgPort, config.calleeHost);

callee.answer(port, ip, calleeSdp)
    .then((res) => {
        console.log(res);
        let calleePort = sdpTransform.parse(res.sdp).media[0].port;
        console.log("RTPEngine port for callee: " + calleePort);
        process.exit(1)
    })
    .catch((err) => {
        console.log(`Error!!!: ${err}`);
        process.exit(1)
    })

