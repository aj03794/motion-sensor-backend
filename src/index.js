//NOTE: Should I possibly using redux to move my client around

const Hapi = require('hapi');
const path = require('path');
const connectToGcp = require('./connect');
const lookupRegistry = require('./look-up-registry');
const listDevices = require('./list-devices');
const setDeviceConfig = require('./set-device-config');
const getDeviceState = require('./get-device-state')

require('dotenv').config();

// 1) Create a server with a host and port
// 2) Origin is '*' so the react app can communicate with it
// 3) Host is '0.0.0.0' so that it can be placed inside of a docker container and
// still be communicated with
const server = Hapi.server({
    host: '0.0.0.0',
    port: 4200,
    routes: {
      cors: {
        origin: ['*']
      }
    }
});

let gcpClient;

const API_VERSION = 'v1';
const DISCOVERY_API = 'https://cloudiot.googleapis.com/$discovery/rest';

const cloudRegion = process.env.CLOUD_REGION;
const projectId = process.env.PROJECT_ID;
const registryId = process.env.REGISTRY_ID;
const deviceId = process.env.DEVICE_ID;
// const version =

const serviceAccountLocation = path.resolve('service-account-test.json')

server.route({
    method: 'GET',
    path:'/',
    handler: function (request, h) {
      return 'hello world'
    }
});

// This will always be called first by the react app so that the client is set
// for the duration
// Can wrap this route in a function if it needs to be called in other places
// const getClient = () => {
  server.route({
      method: 'GET',
      path:'/connect',
      handler: function (request, h) {
        return new Promise((resolve, reject) => {
          connectToGcp({serviceAccountLocation, API_VERSION, DISCOVERY_API})
            .then((client) => {
              gcpClient = client
              console.log('Client established')
              resolve({connected: true});
            })
            .catch((err) => {
              console.log(err)
              reject(err);
            })
        })
      }
  });
// }

server.route({
    method: 'GET',
    path:'/device-registry',
    handler: function (request, h) {
      return new Promise((resolve, reject) => {
        lookupRegistry({gcpClient, registryId, projectId, cloudRegion})
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            console.log(err)
            reject(err);
          })
      })
    }
});

server.route({
    method: 'GET',
    path:'/list-devices',
    handler: function (request, h) {
      return new Promise((resolve, reject) => {
        listDevices({gcpClient, registryId, projectId, cloudRegion})
          .then((response) => {
            console.log(response);
            resolve(response);
          })
          .catch((err) => {
            console.log(err)
            reject(err);
          });
      });
    }
});


// Can I use some sort of device name and map it to the deviceId so that I
// do not need to pass around the deviceId?
// Does it matter if I do pass it around
// NOTE: Should probably add the deviceId as a url param
server.route({
  method: 'POST',
  // This path will need to change but this is okay for now
  path: '/device-config',
  handler: function(request, h) {
    const {on, deviceId} = request.payload;
    const data = {
      on
    }
    console.log(data);
    return new Promise((resolve, reject) => {
      setDeviceConfig({gcpClient,
        deviceId,
        registryId,
        projectId,
        cloudRegion,
        data})
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
    // return {msg: '/device-config route'};
  }
})

server.route({
  method: 'GET',
  path: '/device-state',
  handler: function(request, h) {
    return new Promise((resolve, reject) => {
      getDeviceState({gcpClient, deviceId, registryId, projectId, cloudRegion})
        .then((response) => {
          console.log(response)
          resolve(response)
        })
        .catch((err) => {
          console.log(err);
          reject(err)
        })
    })
  }
})


// Start the server
async function start() {

    try {
        await server.start();
        // server.info.host = '0.0.0.0'
        console.log(server.info)
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
};

start();
