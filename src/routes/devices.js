// Why importing this here instead of injecting it at the
import { createGcpIotCore } from '../gcp-iot-core'
import Rx from 'rxjs'

export const createRoutes = ({
	gcpIotCoreQueue,
	client,
	registryName,
}) => {
	const {
		getDevices
	} = createGcpIotCore({ client })

	// const routeHandler = (x, {req, h}) => {
	// 	return
	// }

	const partialApplicationFunction = data => {
		return (req, h) => {
				// console.log(h)
				const res = h.response(JSON.stringify(data.data.devices))
				res.headers = { 'content-type': 'application/json' }
				return res
			}
		}

	// sendClientData will hold the function that partialApplicationFunction returns
	// after it is invoked the first time
	let sendClientData


	getDevices({ registryName })
		.subscribe({
			//
			next: data => {
				// Sets sendClientData equal to the function that is returned by
				// partialApplicationFunction when it is first invoked
				sendClientData = partialApplicationFunction(data)
				console.log(sendClientData.toString())
			}
		})

	return [{
		method: 'GET',
		path: '/api/devices',
		handler: (req, h) => {
			return (sendClientData(req, h));
		}
	}]
}
