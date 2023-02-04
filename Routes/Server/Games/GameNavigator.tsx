import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import GamePicker from './GamePicker'
import Quiz from './Implementations/Quiz'

export type GameNavigatorStackParams = {
	GamePicker: undefined
	Quiz: undefined
}

export const GameNavigatorStack = createStackNavigator<GameNavigatorStackParams>()

const GameNavigator = () => {
	return (
		<GameNavigatorStack.Navigator initialRouteName="GamePicker" screenOptions={{ headerShown: false }}>
			<GameNavigatorStack.Screen name="GamePicker" component={GamePicker}></GameNavigatorStack.Screen>
			<GameNavigatorStack.Screen name="Quiz" component={Quiz}></GameNavigatorStack.Screen>
		</GameNavigatorStack.Navigator>
	)
}
export default GameNavigator
