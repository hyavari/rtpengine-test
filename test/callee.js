const fs = require('fs');
const Client = require('rtpengine-client').Client;
const sdpTransform = require('sdp-transform');
const config = require("../config");

var myArgs = process.argv.slice(2);
const CALLEE_SDP = JSON.parse(fs.readFileSync(myArgs[0]).toString());

const PORT = config.rtpEnginePort;
const IP = config.rtpEngineHost;
const CALLEE = new Client(config.calleeNgPort, config.calleeHost);

CALLEE.answer(PORT, IP, CALLEE_SDP)
    .then((res) => {
        //console.log(res);
        let calleePort = sdpTransform.parse(res.sdp).media[0].port;
        //console.log("RTPEngine port for callee: " + calleePort);
        console.log(calleePort);
        process.exit(1)
    })
    .catch((err) => {
        console.log(`Error!!!: ${err}`);
        process.exit(1)
    })

