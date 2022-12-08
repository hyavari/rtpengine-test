## Run Test Call

Before starting the test, you need to setup a RTPEngine instance. 
You can use a docker image or if you are developing around the project, 
you can just compile and install it from project source. 

[RTPEngine project](https://github.com/sipwise/rtpengine)

based on your RTPEngine configs, you need to update the port and host values 
that is under config folder.

Finally you just need `generateCall.sh` script under tests folder. 

*Note*: you can change caller and callee ports in config file but not forget to update 
`generateCall.sh` file as well.

*Note*: If you like to receive RTCP info over HEP, you need to enable HOMER 
configs in RTPEngine config file and run the `hepServer.js` under hep folder (just UDP supported!).