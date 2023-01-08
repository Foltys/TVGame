import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ClientJoin from './ClientJoin'
import ClientLobby from './ClientLobby'

export type ClientNavigatorStackParams = {
	ClientJoin: undefined
	QuizAdapter: undefined
	ClientLobby: undefined
}

export const ClientNavigatorStack = createStackNavigator<ClientNavigatorStackParams>()

const ClientNavigator = () => {
	return (
		<ClientNavigatorStack.Navigator initialRouteName="ClientJoin" screenOptions={{ headerShown: false }}>
			<ClientNavigatorStack.Screen name="ClientJoin" component={ClientJoin}></ClientNavigatorStack.Screen>
			<ClientNavigatorStack.Screen name="ClientLobby" component={ClientLobby}></ClientNavigatorStack.Screen>
			<ClientNavigatorStack.Screen name="QuizAdapter" component={React.PureComponent}></ClientNavigatorStack.Screen>
		</ClientNavigatorStack.Navigator>
	)
}

export default ClientNavigator
