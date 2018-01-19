const path = require('path');
const fs = require('fs');
const google = require('googleapis')

// cb removed as a parameter
function connectToGcp({serviceAccountLocation, API_VERSION, DISCOVERY_API}) {
  return new Promise((resolve, reject) => {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountLocation));
    const jwtAccess = new google.auth.JWT();
    jwtAccess.fromJSON(serviceAccount);
    // Note that if you require additional scopes, they should be specified as a
    // string, separated by spaces.
    // Move these locations out into an environmental variable
    jwtAccess.scopes = 'https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/cloudiot';
    // Set the default authentication to the above JWT access.
    google.options({ auth: jwtAccess });

    const discoveryUrl = `${DISCOVERY_API}?version=${API_VERSION}`;

    google.discoverAPI(discoveryUrl, {}, (err, client) => {
      if (err) {
        console.log('Error during API discovery', err);
        reject(err);
      }
      resolve(client)
    });
  })
}

module.exports = connectToGcp
