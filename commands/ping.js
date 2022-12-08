
const config = require("../config");
const Client = require("rtpengine-client").Client;
const client = new Client(); //you can specify client port and host


setInterval(function () {
  client.ping(config.rtpEnginePort, config.rtpEngineHost)
    .then((res) => {
      console.log(`received ${JSON.stringify(res)}`); // {result: 'pong'}
    })
    .catch((err) => {
      console.log(`Error!!!: ${err}`);
    })
}, 30000);

