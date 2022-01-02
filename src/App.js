import React, { useState, useEffect, useRef } from 'react'
import Player from './components/Player'
import Tile from './components/Tile'
import './App.css'

function App() {

    const [allCards, setAllCards] = useState(['cha1', 'chi2', 'dog3', 'fox4', 'pea5', 'rob6', 'sea7', 'sna8', 'cha9', 'chi10', 'dog11', 'fox12', 'pea13', 'rob14', 'sea15', 'sna16'])
    const [counterPlayer1, setCounterPlayer1] = useState(0)
    const [counterPlayer2, setCounterPlayer2] = useState(0)
    const [player1Turn, setPlayer1Turn] = useState(false)
    const [player2Turn, setPlayer2Turn] = useState(false)
    const [allCardsHidden, setAllCardsHidden] = useState(false)
    const [showCard, setShowCard] = useState([])
    const [openCards, setOpenCards] = useState([])
    const [turnedCards, setTurnedCards] = useState(0)
    const [winner, setWinner] = useState(false)
    const [draw, setDraw] = useState(false)
    const firstLoad = useRef(false)
    const [point, setPoint] = useState(false)

    useEffect(() => {
        const pointAdded = () => {
            setTimeout(() => {
                setPoint(prev => !prev)
            }, 2000)
        }
        if (firstLoad.current) {
            setPoint(prev => !prev)
            pointAdded()
        }
        return () => clearTimeout(pointAdded)
    }, [counterPlayer1, counterPlayer2])

    useEffect(() => {
        //see if there is match
        if (turnedCards === 2) {
            let match = compare()
            const delayFlipCards = () => {
                setTimeout(() => {
                    if (!match) {
                        setPlayer1Turn(prev => !prev)
                        setPlayer2Turn(prev => !prev)
                        setShowCard(prev => prev.slice(0, (prev.length - 2)))
                    }
                    setTurnedCards(0)
                }, 500)
            }
            if (match) {
                setOpenCards([...showCard])
                player1Turn ? setCounterPlayer1(prev => prev + 1) : setCounterPlayer2(prev => prev + 1)
                delayFlipCards()
            } else {
                delayFlipCards()
            }
            return () => clearTimeout(delayFlipCards)
        }
    }, [turnedCards === 2])

    useEffect(() => {
        //check for a winner
        let reset =  () => {
            setTimeout(() => {
                setPlayer1Turn(false)
                setPlayer2Turn(false)
                setAllCardsHidden(true)
                setShowCard([])
                setOpenCards([])
            }, 3000)
        }
        if (counterPlayer1 === 5 || counterPlayer2 === 5 || 
            (counterPlayer1 === 4 && counterPlayer2 === 3 && player1Turn) || 
            (counterPlayer2 === 4 && counterPlayer1 === 3 && player2Turn)) {
            setWinner(true)
            reset()
        }
        if (counterPlayer1 === 4 & counterPlayer1 === counterPlayer2) {
            setDraw(true)
            player1Turn ? setPlayer2Turn(true) : setPlayer1Turn(true)
            reset()
        }
        return () => clearTimeout(reset)
    }, [counterPlayer1, counterPlayer2])
    
    
    useEffect(() => {
        //decide who is who after shuffle
        if (firstLoad.current) {
            whoIsFirst()
        } else {
            firstLoad.current = true
        }
    }, [allCards])
    
    
    const shuffleHandle = () => {
        if (!allCardsHidden) setAllCardsHidden(true)
        setWinner(false)
        setDraw(false)
        setCounterPlayer1(0)
        setCounterPlayer2(0)
        shuffleGrid()
    }

    const shuffleGrid = () => {
        let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        let tempArr = []
        while (numbers.length > 0) {
            const randomIndex = Math.floor(Math.random() * numbers.length)
            const randomNumber = numbers[randomIndex]    
            tempArr = [...tempArr, allCards[randomNumber]]
            numbers.splice(randomIndex, 1)
        }        
        setAllCards(tempArr)
    }

    const whoIsFirst = () => {                             // decides who goes first and start
        let playerFirst = Math.round(Math.random())
        playerFirst === 0 ? setPlayer1Turn(true) : setPlayer2Turn(true)
    }

    const turn = id => {
        if (turnedCards < 2) {
            setTurnedCards(prev => prev + 1)
            //the first two images are added to showcard
            setShowCard(prev => [...prev, id])
        }
    }
    
    const compare = () => {
        //after image 2 is added we compare
        const card1 = showCard[showCard.length - 2].slice(0, 3)
        const card2 = showCard[showCard.length - 1].slice(0, 3)
        //if images are the same return true
        if (card1 === card2) {
            return true
        } else {
            //not the same, return false
            return false
        }
    }       

    return (
        <main>
            <div className='header'>
                <Player player={1} player1Turn={player1Turn} winner={winner} 
                        draw={draw} counterPlayer1={counterPlayer1} point={point}
                />
                <div id="shuffle">
                    <button className={player1Turn || player2Turn ? "shuffle-button shuffle-button-off" : "shuffle-button"} 
                            onClick={() => shuffleHandle()}
                            disabled={player1Turn || player2Turn}
                    >
                    PLAY!
                    </button>
                    <p className={!player2Turn & !player1Turn ? 'shuffle-para' : 'shuffle-para shuffle-para-off'}>
                        Press the button to play
                    </p>
                </div>
                <Player player={2} player2Turn={player2Turn} winner={winner} 
                        draw={draw} counterPlayer2={counterPlayer2} point={point}
                />
            </div>
            <div id="card-area">
                <Tile   allCards={allCards} allCardsHidden={allCardsHidden} showCard={showCard} turn={turn}
                        player1Turn={player1Turn} player2Turn={player2Turn} turnedCards={turnedCards} winner={winner}
                        draw={draw} point={point} openCards={openCards}
                />
            </div>
            <footer id="footer">Bambam 2021</footer>
        </main>
    )
}

export default App
