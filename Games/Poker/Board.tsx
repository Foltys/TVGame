type Player = {
	id: number
}
type Card = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K' | 'A'
type PokerPlayer =
	| Player
	| {
			hand: Card[]
	  }

type BoardProps = { player1: Player; player2: Player }

export default function Board({ player1, player2 }: BoardProps) {}
