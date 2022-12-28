import React from 'react'
import { StyleSheet, View } from 'react-native'
import Question from './Question'
import useQuizManager from '../../hooks/useQuizManager'

const QuizManager = () => {
	const [question, startQuiz] = useQuizManager()

	return (
		<View style={styles.container}>
			<View style={styles.header}></View>
			<View style={styles.question}>{question ? <Question {...question}></Question> : null}</View>
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
})
