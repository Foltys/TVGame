import { useEffect, useState } from 'react'
import { QuestionProps } from '../gameComponents/Quiz/Question'
import { useQuizAdapter } from './useAdapter'
import usePlayersScore, { ScoreBoard } from './usePlayersScore'
import sleep from '../lib/sleep'
import useQuestions from './useQuestions'
import { SocketModuleServer } from '../modules/SocketModule'

const letterToIndexMap = ['A', 'B', 'C', 'D']

type StartGameFc = ({ difficulty, questionCount }: { difficulty?: number; questionCount: number }) => void
type QuizManagerHook = [QuestionProps | undefined, StartGameFc, ScoreBoard]

function useQuizManager(): QuizManagerHook {
	const { connectedClients } = SocketModuleServer.getInstance()
	const [gameRunning, setGameRunning] = useState<boolean>(false)

	const [question, setQuestion] = useState<QuestionProps>()
	const [getNextQuestion, raiseDifficulty, remainingQuestions] = useQuestions({ questionCount: 5 })
	const [scoreboard, addPoints] = usePlayersScore([...connectedClients].map(([address]) => address))
	const waitForAnswers = useQuizAdapter()
	// useEffect(() => {
	// 	console.log({ question })
	// }, [question])

	async function nextQuestion() {
		const newQuestion = await getNextQuestion()
		const { question, allAnswers, correctAnswerIndex } = newQuestion
		setQuestion({ question, answers: allAnswers })
		const playerAnswers = await waitForAnswers(5)
		const scoreToAdd: ScoreBoard = new Map()
		playerAnswers.forEach((a, key) => {
			if (a == letterToIndexMap[correctAnswerIndex]) {
				scoreToAdd.set(key, 100)
			}
		})
		addPoints(scoreToAdd)
		setQuestion((currentQuestion) => {
			if (!currentQuestion) return
			currentQuestion.correctAnswerIndex = correctAnswerIndex
			return { ...currentQuestion }
		})

		await sleep(5000)
	}

	async function startQuiz({ difficulty, questionCount }: { difficulty?: number; questionCount: number }) {
		setGameRunning(true)
		while (remainingQuestions > 0) {
			await nextQuestion()
		}
	}

	return [question, startQuiz, scoreboard]
}

export default useQuizManager
