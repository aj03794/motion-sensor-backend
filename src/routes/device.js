import { createGcpIotCore } from '../gcp-iot-core'

export const createRoutes = ({
	gcpIotCoreQueue,
	client,
	registryName,
	partialApplicationFunction,
	observer,
	createSubscription,
	trackState,
	reportState,
	resetState
}) => {
	const {
		getDeviceState,
		setDeviceConfig
	} = createGcpIotCore({ client })
	// trackState({ getDeviceState, setDeviceConfig })
  const extractDeviceStateData = (data, req, h) => {
	const dataToSend = JSON.parse(Buffer.from(data.data.deviceStates[0].binaryData, 'base64'))
    const res = h.response(dataToSend)
    // const res = h.response(JSON.stringify(data.data.deviceStates))
    const headers = res.headers = { 'content-type': 'application/json' }
	// trackState({ extractDeviceStateData: {res: res ? true : false, headers, dataToSend } })
	// reportState()
	// resetState()
    return { res, dataToSend, headers }
  }

	return [{
		method: 'GET',
		path: '/api/devices/${deviceId}/state',
		handler: (req, h) => {
			return createSubscription({
				gcpCommand: getDeviceState,
				registryName,
				trackState
			})
			.then(data => extractDeviceStateData(data, req, h))
			.then(({ res, dataToSend, headers }) => {
				trackState({ getDeviceStateResponse: {res: res ? true : false, headers, dataToSend } })
				reportState()
				resetState()
				return res
			})
			.catch(e => {
				trackState({ error: e })
				console.log(e)
			})
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
			// const data = { on }
			console.log('data', data)
			const binaryData = Buffer.from(JSON.stringify(data)).toString('base64');
	    return createSubscription({
	      gcpCommand: setDeviceConfig,
	      partialApplicationFunction,
	      registryName,
		  binaryData
	    })
	    .then(data => 'Config successfully updated')
		.catch(e => console.log(e))
	  }
	}]
}
