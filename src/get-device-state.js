// Can I sub to the device state so that I constantly get any update that is sent from
// the esp32 to this?

function getDeviceState ({gcpClient, deviceId, registryId, projectId, cloudRegion}) {
  return new Promise((resolve, reject) => {
    console.log('Getting device state')
    const parentName = `projects/${projectId}/locations/${cloudRegion}`;
    const registryName = `${parentName}/registries/${registryId}`;
    const request = {
      name: `${registryName}/devices/${deviceId}`
    };

    gcpClient.projects.locations.registries.devices.states.list(request,
        (err, data) => {
          if (err) {
            console.log('Could not find device:', deviceId);
            console.log(err);
            reject(err)
          } else {
            // const deviceState = Buffer.from(JSON.stringify(data)).toString('base64');
            // console.log(data);
            // const deviceState = Buffer.from(JSON.parse(data), 'base64')
            // console.log(deviceState)
            const currentDeviceState = JSON.parse(Buffer.from(data.deviceStates[0].binaryData, 'base64'));
            resolve(currentDeviceState)
          }
        });
  })
  // [END iot_get_device_state]
}

module.exports = getDeviceState
