// This is where I will set up getting my gcp client so I can call
// other google apis

// NOTE: I am retrieving a client via an API key

import path from 'path'
import fs from 'fs'
import google from 'googleapis'
import { Observable } from 'rxjs'

// Will probably need a to inject a queue here
// 1) Want to call that checkForClient function every single time
// to check to see if a client exists or not.  Maybe that doesn't matter
// if there is no expiration time for the client that we receive from google
export const createGcpIotCore = ({ client }) => {


  const gcpCommand = ({ request, googleFunction, trackState }) => {
    return Observable.create(observer => {
      googleFunction(request, (err, data) => {
        if (err) {
          return observer.error(err)
        }
        trackState({ gcpCommandFunction: { request: request.name } })
        observer.next(data)
        observer.complete()
      })
    })
  }


  return {
  getDevices: ({
		registryName,
        partialApplicationFunction
		}) => gcpCommand({
    request:  { parent: registryName },
    googleFunction: client.projects.locations.registries.devices.list,
		}),
      getDeviceState: ({
        registryName,
        trackState
      }) => gcpCommand({
        request: { name: `${registryName}/devices/esp32_830B20` },
        googleFunction:  client.projects.locations.registries.devices.states.list,
        trackState
      }),
      setDeviceConfig: ({
        registryName,
        partialApplicationFunction,
        binaryData
      }) => gcpCommand({
        request: {
          name: `${registryName}/devices/esp32_830B20`,
          binaryData
        },
        googleFunction: client.projects.locations.registries.devices.modifyCloudToDeviceConfig,
      })
    }

}
