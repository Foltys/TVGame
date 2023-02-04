import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, LayoutChangeEvent } from 'react-native'
import { SocketModuleClient } from '../../../modules/SocketModule'

type ButtonProps = {
	letter: string
	onPress: () => void
}
const Button = ({ letter, onPress }: ButtonProps) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.gridItem}>
			<Text style={styles.gridItemText}>{letter}</Text>
		</TouchableOpacity>
	)
}
const QuizAdapter = () => {
	const handleAnswer = (letter: string) => {
		SocketModuleClient.getInstance().sendJson({ input: letter })
	}
	return (
		<View style={styles.container}>
			{['A', 'B', 'C', 'D'].map((letter, index) => {
				return <Button key={index} letter={letter} onPress={handleAnswer.bind(null, letter)} />
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: '90%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
	},
	gridItem: {
		marginTop: 20,
		padding: 20,
		width: '45%',
		height: '45%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'gray',
		borderColor: 'black',
		borderWidth: 1,
	},
	gridItemText: {
		fontSize: 20,
		color: 'white',
	},
})

export default QuizAdapter
