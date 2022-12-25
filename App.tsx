import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ServerClientButtons from './components/ServerClientButtons'
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native'
import ServerNavigator, { ServerNavigatorStackParams } from './Routes/Server/ServerNavigator'
import ClientNavigator, { ClientNavigatorStackParams } from './Routes/Client/ClientNavigator'

export type RootStackParams = {
	Home: undefined
	ServerNavigator: NavigatorScreenParams<ServerNavigatorStackParams>
	ClientNavigator: NavigatorScreenParams<ClientNavigatorStackParams>
}

const Stack = createStackNavigator<RootStackParams>()

const MainView = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={ServerClientButtons} />
				<Stack.Screen name="ServerNavigator" component={ServerNavigator} />
				<Stack.Screen name="ClientNavigator" component={ClientNavigator} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default MainView
