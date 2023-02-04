import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Answers } from '../../hooks/useAdapter'

const letterMap = ['A', 'B', 'C', 'D']

export type QuestionProps = {
	question: string
	correctAnswerIndex?: number
	answers: string[]
	playerAnswers?: Answers
}
const Question = (props: QuestionProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.question}>
				<Text style={styles.questionText}>{props.question}</Text>
			</View>
			<View style={styles.answers}>
				{props.answers.map((answer, key) => {
					return (
						// <View style={styles.answer} key={key}>
						<View style={[styles.answer, props.correctAnswerIndex == key ? styles.correctAnswer : {}]} key={key}>
							<Text style={(styles.answerText, { marginRight: 20 })}>{letterMap[key]}</Text>
							<View>
								<Text adjustsFontSizeToFit style={styles.answerText}>
									{answer}
								</Text>
							</View>
							{/* here I should somehow show who answered what */}
						</View>
					)
				})}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		flexDirection: 'column',
	},
	question: {
		flex: 1,
		justifyContent: 'center',
	},
	questionText: {
		fontSize: 42,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	answers: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'space-between',
	},
	answer: {
		width: '48%',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 10,
		borderWidth: 1,
		padding: 15,
		height: '45%',
		borderColor: 'black',
	},
	correctAnswer: {
		borderColor: 'green',
		borderWidth: 3,
		backgroundColor: '#70E976',
	},
	answerText: {
		fontSize: 18,
	},
})

export default Question
