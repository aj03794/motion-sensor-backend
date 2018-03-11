
import path from 'path'
import url from 'url'
require('dotenv').config()
import Hapi from 'hapi'
import fs from 'fs'
import { Observable } from 'rxjs';
import { createSmartLogger } from './smart-logger'
//
// These are defined from ./routes/index

import {
	createDevicesRoutes,
	createDeviceRoutes,
} from './routes'

import { createGcpIotCore } from './gcp-iot-core'
import { getClient } from './gcp-iot-core/connect'
import { partialApplicationFunction, sendClientData} from './utils/hapi-handler'
import { observer } from './utils/observer-creator'
import { createSubscription } from './utils/create-subscription'

// Env variables necessary to establish a gcp client and make
// subsequent googleapis function calls
const port = process.env.PORT
const projectId = process.env.GCP_PROJECT_ID
const region = process.env.GCP_REGION
const registryId = process.env.GCP_REGISTRY_ID
const parentName = `projects/${projectId}/locations/${region}`
const registryName = `${parentName}/registries/${registryId}`

// Why new Hapi.Server and not just Hapi.server
const server = new Hapi.Server({
	port
})

// Simple function to add routes without having to call server.route every single time
 const addRoute = route => server.route(route)
 const { trackState, reportState, resetState } = createSmartLogger()

export async function provision() {

	try {
		await server.start()
	}
		catch (err) {
		console.log(err);
		process.exit(1);
	}
	console.log('Server running at:', server.info.uri);

getClient({
	readFileSync: fs.readFileSync,
	resolvePath: path.resolve,
	trackState,
	reportState
})
	.then(client => {
		trackState({ registryName })
		const gcpRoutes = {
			client,
			registryName,
			partialApplicationFunction,
			observer,
			createSubscription,
			trackState,
			reportState,
			resetState
		}
		createDevicesRoutes(gcpRoutes).forEach(addRoute)
		createDeviceRoutes(gcpRoutes).forEach(addRoute)
	})
	.catch(e => console.log(e))

}
