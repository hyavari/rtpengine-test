const fs = require('fs');
const Client = require('rtpengine-client').Client;
const sdpTransform = require('sdp-transform');
const config = require("../config");

var myArgs = process.argv.slice(2);
const CALLER_SDP = JSON.parse(fs.readFileSync(myArgs[0]).toString());

const PORT = config.rtpEnginePort;
const IP = config.rtpEngineHost;
const CALLER = new Client(config.callerNgPort, config.callerHost);

CALLER.offer(PORT, IP, CALLER_SDP)
    .then((res) => {
        //console.log(res);
        let callerPort = sdpTransform.parse(res.sdp).media[0].port;
        //console.log("RTPEngine port for caller: " + callerPort);
        console.log(callerPort);
        process.exit(1)
    })
    .catch((err) => {
        console.log(`Error!!!: ${err}`);
        process.exit(1)
    })