import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Question from './Question'
import useQuizManager from '../../hooks/useQuizManager'
import ScoreBoardComponent from '../../components/ScoreBoardComponent'
import { FocusableButton } from '../../components/Focusables'

const QuizManager = () => {
	const [question, startQuiz, scoreboard] = useQuizManager()

	return (
		<View style={styles.container}>
			<ScoreBoardComponent score={scoreboard}>
				<View style={styles.question}>
					{question ? (
						<Question {...question}></Question>
					) : (
						<FocusableButton onPress={() => startQuiz({ questionCount: 10 })} style={styles.startButton}>
							<Text>Start Game</Text>
						</FocusableButton>
					)}
				</View>
			</ScoreBoardComponent>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		width: '100%',
		height: '100%',
	},
	question: {
		flex: 3,
		backgroundColor: 'azure',
		borderRadius: 15,
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
	startButtonText: {
		fontSize: 30,
		margin: 'auto',
	},
})

export default QuizManager
