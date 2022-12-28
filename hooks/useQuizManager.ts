import { useState } from 'react'
import { AnswersKey, AnswersKeys, QuestionProps } from '../gameComponents/Quiz/Question'
import questionsFromFile from '../assets/questions'

async function fetchNewQuestion() {
	const pickedQuestion = questionsFromFile[Math.floor(Math.random() * questionsFromFile.length)]

	const question = pickedQuestion.question
	const correctAnswer = pickedQuestion.correct_answer
	const wrongAnswers = pickedQuestion.incorrect_answers
	const allAnswers = shuffle([...wrongAnswers, correctAnswer])
	const correctAnswerLetter = AnswersKeys[allAnswers.indexOf(correctAnswer)]
	return { question, answers: markAnswers(allAnswers), correctAnswerLetter }
}

function markAnswers(answers: string[]): QuestionProps['answers'] {
	return answers.map((answer, index) => {
		return [AnswersKeys[index], answer]
	})
}

type NextQuestionFc = (cb: (props: QuestionProps) => void) => void
type QuizManagerHook = [QuestionProps | undefined, NextQuestionFc]

function useQuizManager(): QuizManagerHook {
	const [question, setQuestion] = useState<QuestionProps>()
	const [correctLetter, setCorrectLetter] = useState<AnswersKey>()
	const nextQuestion: NextQuestionFc = (cb) => {
		setQuestion((currentQuestion) => {
			currentQuestion && correctLetter && (currentQuestion.showCorrectAnswer = correctLetter)
			return currentQuestion
		})
		fetchNewQuestion().then((newQuestion) => {
			const { question, answers } = newQuestion
			setCorrectLetter(newQuestion.correctAnswerLetter)
			setTimeout(() => {
				setQuestion({ question, answers })
				cb({ question, answers })
			}, 5000)
		})
	}

	function startQuiz(difficulty?: number) {
		// if (difficulty)
	}

	return [question, nextQuestion]
}

export default useQuizManager

function shuffle(array: any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}
