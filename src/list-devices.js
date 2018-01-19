function listDevices({gcpClient, registryId, projectId, cloudRegion}) {
  // [START iot_list_devices]
  // Client retrieved in callback
  return new Promise((resolve, reject) => {
    const parentName = `projects/${projectId}/locations/${cloudRegion}`;
    const registryName = `${parentName}/registries/${registryId}`;

    const request = {
      parent: registryName
    };

    gcpClient.projects.locations.registries.devices.list(request, (err, data) => {
      if (err) {
        reject(err);
      } else {
        // console.log('Current devices in registry:', data['devices']);
        resolve(data);
      }
    });

    // [END iot_list_devices]
  })
}

module.exports = listDevices
