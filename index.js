/**
 * @format
 */
import 'react-native-gesture-handler'

import { AppRegistry } from 'react-native'
import Axios from 'axios'
import io from 'socket.io-client'
import App from './src/Navigator'
import { name as appName } from './app.json'

Axios.defaults.baseURL = 'http://localhost:3333'

export const socket = io('http://localhost:3333')

AppRegistry.registerComponent(appName, () => App)
