import { createGcpIotCore } from '../gcp-iot-core'

export const createRoutes = ({
	gcpIotCoreQueue,
	client,
	registryName,
	partialApplicationFunction,
	observer,
	createSubscription
}) => {
	const {
		getDeviceState,
		setDeviceConfig
	} = createGcpIotCore({ client })

  const extractDeviceStateData = (data, req, h) => {
    const res = h.response(JSON.parse(Buffer.from(data.data.deviceStates[0].binaryData, 'base64')))
    // const res = h.response(JSON.stringify(data.data.deviceStates))
    res.headers = { 'content-type': 'application/json' }
    return res
  }

	return [{
		method: 'GET',
		path: '/api/devices/${deviceId}/state',
		handler: (req, h) => {
			return createSubscription({
				gcpCommand: getDeviceState,
				partialApplicationFunction,
				registryName
			})
			.then(data => extractDeviceStateData(data, req, h))
			.catch(e => console.log(e))
		}
	}, {
	  method: 'POST',
	  path: '/api/devices/${deviceId}/config',
		config: {
			payload: { allow: 'application/json' }
		},
	  handler: (req, h) => {
			// console.log(Buffer.from(JSON.stringify(req.payload.on)).toString('base64'));
			const { on } = req.payload;
			console.log('on', on)
			const data = { on }
			console.log('data', data)
			// const binaryData = Buffer.from(JSON.stringify(data)).toString('base64');
	    return createSubscription({
	      gcpCommand: setDeviceConfig,
	      partialApplicationFunction,
	      registryName,
				data
	    })
	    .then(data => 'Config successfully updated')
			.catch(e => console.log(e))
	  }
	}]
}
