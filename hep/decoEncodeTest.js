const HEPjs = require('hep-js');

const payload = 
`ACK sip:883510000000091@domain.net SIP/2.0
Via: SIP/2.0/UDP 192.168.1.23:5060;rport;branch=z9hG4bK484759904 
From: <sip:somebody@somewhere.net>;tag=412285373 
To: <sip:883510000000091@domain.net>;tag=1d24a28a0bded6c40d31e6db8aab9ac6.4679 
Call-ID: 1003554701 
CSeq: 20 ACK 
Content-Length: 0 `;

const rcinfo = {
    type: 'HEP',
    version: 3,
    payload_type: 'SIP',
    captureId: '2001',
    capturePass: 'myHep',
    ip_family: 2,
    time_sec: 1433719443,
    time_usec: 979,
    protocol: 17,
    proto_type: 1,
    srcIp: '192.168.100.1',
    dstIp: '192.168.1.23',
    srcPort: 5060,
    dstPort: 5060
};

var hep_encoder = HEPjs.encapsulate(payload, rcinfo); // returns data buffer
var hep_decoder = HEPjs.decapsulate(hep_encoder); // returns JSON Object {payload,rcinfo}

console.log(hep_decoder);
