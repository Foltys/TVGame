/**
 *
 * this should let all clients know what adapter to go to
 * it should also setup listeners for the answers
 * broadcasts correct answer
 * broadcasts next question
 *
 * during init, let all clients know which adapter will be used
 *
 * QuizAdapter
 * - have a method to listen to incoming answers from all clients
 * - the method resolved if all clients responded or if timeout for the answer is reached
 * - the method resolves with the answers collected
 */

import { useEffect, useState } from 'react'
import { Player } from '../components/PlayerCard'
import { JsonMessage, SocketModuleServer } from '../modules/SocketModule'
export type Answers = Map<Player[0], string>

export const useQuizAdapter = function () {
	const ssInstance = SocketModuleServer.getInstance()
	ssInstance.broadcastMessage({ adapter: 'QuizAdapter' })

	const waitForAnswers = (timeoutSeconds: number) => {
		return new Promise<Answers>((resolve) => {
			const answers: Answers = new Map()
			const answersListener = ssInstance.addJsonListener(incomingAnswerHandler)

			const timeoutFc = setTimeout(() => {
				return resolve(answers)
			}, timeoutSeconds * 1000)

			function incomingAnswerHandler(id: string, data: JsonMessage) {
				if (data.input) {
					answers.set(id, data.input)
				}
				if (answers.size == ssInstance.connectedClients.size) {
					clearTimeout(timeoutFc)
					answersListener.remove()
					return resolve(answers)
				}
			}
			ssInstance.broadcastMessage('unlock')
		})
	}

	return waitForAnswers
}
