import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Question from './Question'
import useQuizManager from '../../hooks/useQuizManager'
import { TouchableHighlight } from 'react-native-gesture-handler'

const QuizManager = () => {
	const [question, startQuiz] = useQuizManager()

	return (
		<View style={styles.container}>
			<View style={styles.header}></View>
			<View style={styles.question}>
				{question ? (
					<Question {...question}></Question>
				) : (
					<TouchableHighlight onPress={() => startQuiz(0)} style={styles.startButton}>
						<Text adjustsFontSizeToFit>Start Game</Text>
					</TouchableHighlight>
				)}
			</View>
			<View style={styles.footer}></View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
	},
	question: {
		flex: 3,
	},
	header: {
		flex: 1,
	},
	footer: {
		flex: 1,
	},
	startButton: {
		padding: 20,
		width: '50%',
		height: '50%',
	},
})
