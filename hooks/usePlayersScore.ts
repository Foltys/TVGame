import { useState } from 'react'
import { Player } from '../components/PlayerCard'

export type ScoreBoard = Map<Player[0], number>

function usePlayersScore(players: string[]): [ScoreBoard, (points: ScoreBoard) => void] {
	const [scoreboard, setScoreboard] = useState<ScoreBoard>(new Map([...players].map((player) => [player, 0])))

	function addPoints(points: ScoreBoard) {
		setScoreboard((currentScore) => {
			points.forEach((playerScore, key) => {
				currentScore.set(key, playerScore + (currentScore.get(key) || 0))
			})
			return currentScore
		})
	}
	return [scoreboard, addPoints]
}

export default usePlayersScore
