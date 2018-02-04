import google from 'googleapis'

export const getClient = ({ readFileSync, resolvePath }) => {
  return new Promise((resolve, reject) => {
    const apiVersion = 'v1';
    const discoveryApi = 'https://cloudiot.googleapis.com/$discovery/rest';
    const serviceAccount = JSON.parse(readFileSync(resolvePath('./service-account-test.json')));
    const jwtAccess = new google.auth.JWT();
    jwtAccess.fromJSON(serviceAccount);
    jwtAccess.scopes = 'https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/cloudiot';
    google.options({ auth: jwtAccess });
    const discoveryUrl = `${discoveryApi}?version=${apiVersion}`;
    google.discoverAPI(discoveryUrl, {}, (err, client) => !err ? resolve(client) : reject(err))
  })
}
