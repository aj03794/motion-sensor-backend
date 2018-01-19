//

const ping = require ("net-ping");
// const dgram = require('dgram');
// const server = dgram.createSocket('udp4');
//
// server.on('error', (err) => {
//   console.log(`server error:\n${err.stack}`);
//   server.close();
// });
//
// server.on('message', (msg, rinfo) => {
//   console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
// });
//
// server.on('listening', () => {
//   const address = server.address();
//   console.log(`server listening ${address.address}:${address.port}`);
// });
//
// server.setBroadcast(true)
//
// server.bind(41234);
// server listening 0.0.0.0:41234


const session = ping.createSession();

session.pingHost (target, function (error, target) {
    if (error)
        console.log (target + ": " + error.toString ());
    else
        console.log (target + ": Alive");
});
