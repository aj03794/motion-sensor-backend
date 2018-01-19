// **NOTE: If server restarts, the connect end point needs to be called again
// or the call will fail
const googleapis = require('googleapis');

const lookupRegistry = ({gcpClient, registryId, projectId, cloudRegion}) => {
  // [START iot_lookup_registry]
  // Client retrieved in callback
  // getClient(serviceAccountJson, function(client) {...});
  return new Promise((resolve, reject) => {
    const parentName = `projects/${projectId}/locations/${cloudRegion}`;
    const registryName = `${parentName}/registries/${registryId}`;
    const request = {
      name: registryName
    };
    console.log('parentName', parentName)
    console.log('registryName', registryName)
    console.log('client', gcpClient)

    // resolve(client);
    // if (err) reject(err);
    gcpClient.projects.locations.registries.get(request, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data)
      }
    });
    // [END iot_lookup_registry]
  });
};

module.exports = lookupRegistry;
