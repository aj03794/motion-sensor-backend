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
			// returning an Observable gives a new Observable`
			console.log(req, h)
			getDevices({ registryName })
				.subscribe({
					// This next, error, complete can be broken out to a separate object
					// to make things simpler
					next: x => console.log(x),
					error: err => console.log(err),
					complete: () => console.log('complete')
				})
				return 'hello world'
			// return getDevices.take(1).map(x => console.log(x))

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
