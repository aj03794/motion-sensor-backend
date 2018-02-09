// Why importing this here instead of injecting it at the
import { createGcpIotCore } from '../gcp-iot-core'

export const createRoutes = ({
	gcpIotCoreQueue,
	client,
	registryName,
	partialApplicationFunction,
	sendClientData,
	observer,
	createSubscription
}) => {
	const {
		getDevices
	} = createGcpIotCore({ client })

	return [{
		method: 'GET',
		path: '/api/devices',
		handler: (req, h) => {
			return createSubscription({
				gcpCommand: getDevices,
				sendClientData,
				partialApplicationFunction,
				registryName,
				req,
				h
			})
			.then(res => res)
				// return 'hello world'
		}
	}]
}
