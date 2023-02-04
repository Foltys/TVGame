import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SocketModuleServer } from '../../modules/SocketModule'
import ServerLobby from './ServerLobby'
import GameNavigator from './Games/GameNavigator'

export type ServerNavigatorStackParams = {
	ServerLobby: undefined
	GameNavigator: undefined
}

export const ServerStack = createStackNavigator<ServerNavigatorStackParams>()

const ServerNavigator = () => {
	useEffect(() => {
		return () => {
			SocketModuleServer.getInstance().stop()
		}
	}, [])
	return (
		<>
			<ServerStack.Navigator initialRouteName="ServerLobby" screenOptions={{ headerShown: false }}>
				<ServerStack.Screen name="ServerLobby" component={ServerLobby}></ServerStack.Screen>
				<ServerStack.Screen name="GameNavigator" component={GameNavigator}></ServerStack.Screen>
			</ServerStack.Navigator>
		</>
	)
}

export default ServerNavigator
