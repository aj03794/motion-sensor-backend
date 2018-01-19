// What would happen to a device you post config to if it is not set up to receive that
// config?
function setDeviceConfig({gcpClient,
  deviceId,
  registryId,
  projectId,
  cloudRegion,
  data}) {
    return new Promise((resolve, reject) => {
      // console.log('---->', Buffer.from(data).toString('base64'))
      // Line 15, the buffer, cannot take an object so I just changed that
      const parentName = `projects/${projectId}/locations/${cloudRegion}`;
      const registryName = `${parentName}/registries/${registryId}`;
      const binaryData = Buffer.from(JSON.stringify(data)).toString('base64');
      const request = {
        name: `${registryName}/devices/${deviceId}`,
        binaryData: binaryData
      }

      gcpClient.projects.locations.registries.devices.modifyCloudToDeviceConfig(request,
          (err, data) => {
            if (err) {
              console.log('Could not update config:', deviceId);
              console.log('Message: ', err);
              reject(err)
            } else {
              console.log('Success :', data);
              resolve(data);
            }
          });
    })
}

module.exports = setDeviceConfig
