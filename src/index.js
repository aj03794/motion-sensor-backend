// I need to get a client right away when the server spins up
// As long as the server is running, the client should be available
import 'babel-polyfill'
import { provision } from './server'

provision();
