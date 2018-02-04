// Why importing this here instead of injecting it at the
import { createGcpIotCore } from '../gcp-iot-core'

export const createRoutes = ({
	gcpIotCoreQueue,
	client,
	// region,
	// projectId,
	// registryId,
	registryName,
}) => {
	const {
		getDevices
		// getDeviceState
	} = createGcpIotCore({ client })
	console.log('client in routes/devices.js')
	return [{
		method: 'GET',
		path: '/api/devices',
		// config: { auth: 'default' },
		// Gets all device states for their corresponding deviceId's
		handler: (req, h) => {
			console.log('registryName', registryName)
			getDevices({
				// region,
				// projectId,
				// registryId,
				registryName
			}).then(devices => {
				console.log(devices);
				// const res = h.response(JSON.stringify(devices))
				// res.headers = { 'content-type': 'application/json' }
				// return res
			}).catch(err => {
				if (err instanceof Error) {
					throw err
				}
				else {
					throw new Error(JSON.stringify(err))
				}
			})
		}
	}]
}
