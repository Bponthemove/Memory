import React from 'react'
import data from '../data'

const Tile = ( {allCards, allCardsHidden, showCard, turn, winner, draw, openCards} ) => {
    return allCards.map((card, index) => {
        return (
            <div className='card-container' key={index}> 
                <div className={allCardsHidden && !showCard.find(x => x === card) ? 'card' : 'card flip'}>
                    <div    id={card} 
                            className={openCards.find(x => x === card) ? "card-face-front card-face point" : "card-face-front card-face"}
                            style={{backgroundImage: data[card]}}
                            ></div>
                    <div    id={card} 
                            onClick={winner || draw ? null : e => turn(e.target.id)}    
                            className={openCards.find(x => x === card) ? "card-face-back card-face point" : "card-face-back card-face"}
                    ></div>
                </div>
            </div>
        )
    })    
}

export default Tile
