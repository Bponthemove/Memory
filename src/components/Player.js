import React from 'react'

const Player = ( {player, player1Turn, player2Turn, winner, draw, counterPlayer1, counterPlayer2, point} ) => {
    
    return (
        <div className={(player === 1 && player1Turn) || (player === 2 && player2Turn) ? 'player-turn player' : 'player'}>
            {player === 1 ? 'PLAYER 1' : 'PLAYER 2'}
            {player === 1 ?
                <p className={point && player1Turn ? 'score score-grow' : 'score'}>
                    {winner && player1Turn ? 'Winner' : 
                                                        draw ? 'Draw!!' : counterPlayer1}
                </p>
                :
                <p className={point && player2Turn ? 'score score-grow' : 'score'}>
                    {winner && player2Turn ? 'Winner' : 
                                                        draw ? 'Draw!!' : counterPlayer2}
                </p>
            }
        </div>
    )
}

export default Player
