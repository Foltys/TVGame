import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, View } from 'react-native'
export type AnswersKey = 'A' | 'B' | 'C' | 'D'
export const AnswersKeys: AnswersKey[] = ['A', 'B', 'C', 'D']
// type AnswersKey = typeof AnswersKeys
export type QuestionProps = {
	question: string
	showCorrectAnswer?: AnswersKey
	answers: [AnswersKey, string][]
}
const Question = (props: QuestionProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.question}>
				<Text style={styles.questionText}>{props.question}</Text>
			</View>
			<View style={styles.answers}>
				{props.answers.map(([letter, answer]) => {
					return (
						<View style={styles.answer}>
							<Text style={styles.answerText}>{letter}</Text>
							<Text style={styles.answerText}>{answer}</Text>
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
		flex: 2,
	},
	questionText: {
		fontSize: 42,
		fontWeight: 'bold',
	},
	answers: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	answer: {
		width: '45%',
		justifyContent: 'space-between',
		borderRadius: 10,
	},
	answerHighlight: {
		borderColor: 'green',
		borderWidth: 2,
	},
	answerText: {
		fontSize: 22,
	},
})

export default Question
