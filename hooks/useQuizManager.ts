import { useState } from 'react'
import { AnswersKey, AnswersKeys, QuestionProps } from '../gameComponents/Quiz/Question'
import questionsFromFile from '../assets/questions'
import { Answers, useQuizAdapter } from './useAdapter'
import usePlayersScore, { ScoreBoard } from './usePlayersScore'
import sleep from '../lib/sleep'

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
type StartGameFc = (difficulty: number) => void
type NextQuestionFc = (cb: (props: QuestionProps) => void) => void
type QuizManagerHook = [QuestionProps | undefined, StartGameFc]

function useQuizManager(): QuizManagerHook {
	const [question, setQuestion] = useState<QuestionProps>()
	const [correctLetter, setCorrectLetter] = useState<AnswersKey>()
	const [scoreboard, addPoints] = usePlayersScore()

	const waitForAnswers = useQuizAdapter()
	async function showAnswersAndCalculateScore(playerAnswers:Answers) {
		setQuestion((currentQuestion) => {
			currentQuestion && correctLetter && (currentQuestion.showCorrectAnswer = correctLetter)
			return currentQuestion
		})
		await sleep(5000) // sleep here to show the correct answer for a little while

	}
	async function nextQuestion() {
		const newQuestion = await fetchNewQuestion()
		const { question, answers } = newQuestion
		setCorrectLetter(newQuestion.correctAnswerLetter)
		setQuestion({ question, answers })
		const playerAnswers = await waitForAnswers(30)
		const scoreToAdd: ScoreBoard = new Map()
		playerAnswers.forEach((a, key) => {
			if (a == correctLetter)
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
