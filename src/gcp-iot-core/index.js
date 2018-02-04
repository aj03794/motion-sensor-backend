// This is where I will set up getting my gcp client so I can call
// other google apis

// NOTE: I am retrieving a client via an API key

import path from 'path'
import fs from 'fs'
import google from 'googleapis'

// Will probably need a to inject a queue here
// 1) Want to call that checkForClient function every single time
// to check to see if a client exists or not.  Maybe that doesn't matter
// if there is no expiration time for the client that we receive from google
export const createGcpIotCore = ({ client }) => {

  const handleGcpCommand = ({ registryName, googleFunction }) => {
    // console.log(gcpClient)
    // console.log(client);
    // console.log(gcpClient.projects.locations.registries.devices.list.toString())
    return new Promise((resolve, reject) => {
      // console.log('----->', registryName);
      // console.log('=====>', googleFunction.toString())
      callGcpCommand({
        registryName,
        googleFunction,
        resolve,
        reject,
      })
    })
  }

  const callGcpCommand = ({ registryName, googleFunction, resolve, reject }) => {
    // console.log(googleFunction)
    console.log('hello')
    // console.log(gcpClient.projects.locations.registries.devices.list.toString())
    // This is done because it was done in
    // https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/master/iot/manager/manager.js
    const request = { parent: registryName }
    googleFunction(request, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  }


  // 1) Getting the client here and setting gcpClient = client so that this function
  // has the client and can use it accordingly
  // 2) Will this client have an expiration period, or will it always be valid
  // as long as the server is on

  return {
    getDevices: ({
  		registryName,
		}) => handleGcpCommand({
      registryName,
      googleFunction: client.projects.locations.registries.devices.list,
		})
  }

}
