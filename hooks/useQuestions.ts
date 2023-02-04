import { useCallback, useState } from 'react'
import questionsFromFile from '../assets/questions'
import { shuffle } from '../lib/helpers'

export async function fetchNewQuestion() {
	const randomQuestion = { ...questionsFromFile[Math.floor(Math.random() * questionsFromFile.length)] }
	const { question, correct_answer, incorrect_answers } = randomQuestion
	const correctAnswerIndex = Math.floor(Math.random() * 4)
	const allAnswers = [...incorrect_answers]
	allAnswers.splice(correctAnswerIndex, 0, correct_answer)
	return { question, allAnswers, correctAnswerIndex }
}

interface QuestionSettings {
	difficulty?: number
	questionCount?: number
}

type GetNextQuestion = () => Promise<{
	question: string
	allAnswers: string[]
	correctAnswerIndex: number
}>

function useQuestions(settings?: QuestionSettings): [GetNextQuestion, () => void, number] {
	const [difficulty, setDifficulty] = useState<number>(settings?.difficulty || 1)
	const [remainingQuestions, setRemainingQuestions] = useState<number>(settings?.questionCount || 1)

	function raiseDifficulty() {
		setDifficulty((prev) => prev + 1)
	}
	const getNextQuestion = async () => {
		setRemainingQuestions((remaining) => remaining--)
		return fetchNewQuestion()
	}

	return [getNextQuestion, raiseDifficulty, remainingQuestions]
}

export default useQuestions
