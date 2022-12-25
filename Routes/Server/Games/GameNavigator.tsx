import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import GamePicker from './GamePicker'

export type GameNavigatorStackParams = {
	GamePicker: undefined
	Quiz: undefined
}

export const GameNavigatorStack = createStackNavigator<GameNavigatorStackParams>()

const GameNavigator = () => {
	return (
		<GameNavigatorStack.Navigator initialRouteName="GamePicker">
			<GameNavigatorStack.Screen name="GamePicker" component={GamePicker}></GameNavigatorStack.Screen>
		</GameNavigatorStack.Navigator>
	)
}
export default GameNavigator
