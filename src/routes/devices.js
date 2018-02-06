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
	return [{
		// Replacing promises with observables in a REST API seem
		// to fit very well
		method: 'GET',
		path: '/api/devices',
		handler: (req, h) => {
			console.log('inside of /api/devices route')
			const y = (someValue) => {
				// const iotDevices = devices.data.devices
				// const res = h.response(JSON.stringify(iotDevices))
				// res.headers = { 'content-type': 'application/json' }
				const res = h.response('hello world')
				return res
			}
			// returning an Observable gives a new Observable
			// return getDevices({ registryName })
			// 	.subscribe({
			// 		next: x => y(x),
			// 		error: err => console.log(err),
			// 		complete: () => console.log('complete')
			// 	})
			return getDevices.take(1).map(x => console.log(x))

				// const x = () => {
				// 	return new Promise((resolve, reject) => {
				// 		setTimeout(() => {
				// 			resolve('hello')
				// 		}, 1000)
				// 	})
				// }
				// return x().then(y => y)
				// console.log(x)
				// x.unsubscribe();
				// const y =
			// console.log(x)
			// return 'hello world';
		}
	}]
}
