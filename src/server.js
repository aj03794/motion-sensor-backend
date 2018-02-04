
import path from 'path'
import url from 'url'
require('dotenv').config()
import Hapi from 'hapi'
import fs from 'fs'
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
	// createDeviceRoutes,
	// createLampRoutes
} from './routes'

import { createGcpIotCore } from './gcp-iot-core'
import { getClient } from './gcp-iot-core/connect'

const port = process.env.PORT
const projectId = process.env.GCP_PROJECT_ID
const region = process.env.GCP_REGION
// const oauthSecret = process.env.GCP_OAUTH_SECRET
const registryId = process.env.GCP_REGISTRY_ID
const parentName = `projects/${projectId}/locations/${region}`
const registryName = `${parentName}/registries/${registryId}`


// Why new Hapi.Server and not just Hapi.server
const server = new Hapi.Server({
	port: 8000
})

// Simple function to add routes without having to call server.route every single time
const addRoute = route => {
  server.route(route)
	console.log('=====>', route);
}


// const log = (...args) => server.log.apply(server, args)

// const authStrategy = createAuthStrategy({
// 	log,
// 	oauthSecret
// })

// gcpClient()
// 	.then(client => {
// 		console.log('client established')
// 		return gcpClient
// 	})
// 	.catch(e => console.log(e))



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
			// gcpClient will be a promise until it is resolved
			client,
			// region,
			// projectId,
			// registryId,
			registryName,
		}
		// createAppRoutes().forEach(addRoute)
		// createHealthCheckRoutes().forEach(addRoute)
		createDevicesRoutes(gcpRoutes).forEach(addRoute)
		// createDeviceRoutes(gcpRoutes).forEach(addRoute)
		// createLampRoutes(gcpRoutes).forEach(addRoute)
	})
	.catch(e => console.log(e))

}
