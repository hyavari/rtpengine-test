const udp = require('dgram');
const HEPjs = require('hep-js');
const config = require("../config");

// UDP server 
const server = udp.createSocket('udp4');

// server listening
server.on('listening', function () {
    const address = server.address();
    const port = address.port;
    const ip = address.address;
    console.log(`Server is listening on: ${ip}:${port}`);
});

// receiving data from client 
server.on('message', function (msg, info) {
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
    let hep_decoded = HEPjs.decapsulate(msg);

    if (hep_decoded) {
        console.log('HEP pdu received from client: ' + JSON.stringify(hep_decoded));
    } else {
        console.log('Received data is not HEP pdu!');
        console.log('Data received from client : ' + msg.toString() + '\n');
    }

});

// if error occurs
server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
});

server.bind(config.hepServerPort, config.hepServerHost);
