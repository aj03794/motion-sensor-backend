// Why importing this here instead of injecting it at the
import { createGcpIotCore } from '../gcp-iot-core'

export const createRoutes = ({
	gcpIotCoreQueue,
	client,
	registryName,
	partialApplicationFunction,
	observer,
	createSubscription
}) => {
	const { getDevices } = createGcpIotCore({ client })
	const extractDevicesData = (data, req, h) => {
		  const res = h.response(JSON.stringify(data.data.devices))
		  res.headers = { 'content-type': 'application/json' }
		  return res
	}

	return [{
		method: 'GET',
		path: '/api/devices',
		handler: (req, h) => {
			return createSubscription({
				gcpCommand: getDevices,
				partialApplicationFunction,
				registryName
			})
			.then(data => extractDevicesData(data, req, h))
			.catch(e => console.log(e))
		}
	}]
}
