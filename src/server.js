
import path from 'path'
import url from 'url'
require('dotenv').config()
import Hapi from 'hapi'
import fs from 'fs'
import { Observable } from 'rxjs';
// import Inert from 'inert'
//
// import { createLogger } from './logger'
// const { logHandler, requestLoggerExt } = createLogger()
//
// import { createAuthStrategy } from './auth'
//
// These are defined from ./routes/index

import {
	// createAppRoutes,
	// createHealthCheckRoutes,
	createDevicesRoutes,
	createDeviceRoutes,
	// createLampRoutes
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
 const addRoute = route => {
	 console.log(route);
	 server.route(route)
}


// const log = (...args) => server.log.apply(server, args)

// const authStrategy = createAuthStrategy({
// 	log,
// 	oauthSecret
// })

export async function provision() {

	//
	// server.events.on('log', logHandler);
	//
	// server.ext(requestLoggerExt({ log }))
	//
	// server.auth.scheme('jwt', authStrategy)
	// server.auth.strategy('default', 'jwt')

	try {

		await server.start()
	}
		catch (err) {
		console.log(err);
		process.exit(1);
	}
	console.log('Server running at:', server.info.uri);

	// GCP will send back a sigterm, and we do not want to cancel the users
	// last HTTP request so we do this to make sure that last response is responded
	// to.  The load balancer will redirect new requests to other instances
	// process.once('SIGTERM', async () => {
	// 	server.log(['debug'], 'server shutting down')
	// 	await server.stop()
	// })
	//
	// server.log(['debug'], `serving app from ${app}`)
	// server.log(['info'], `server up on ${port}`)

getClient({
	readFileSync: fs.readFileSync,
	resolvePath: path.resolve
})
	.then(client => {
		const gcpRoutes = {
			client,
			registryName,
			partialApplicationFunction,
			observer,
			createSubscription
		}
		createDevicesRoutes(gcpRoutes).forEach(addRoute)
		createDeviceRoutes(gcpRoutes).forEach(addRoute)
	})
	.catch(e => console.log(e))

}
