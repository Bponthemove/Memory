// export const shuffleHandle = (setWinner, setDraw, setCounterPlayer1, setCounterPlayer2, setShowCard, setAllCardsHidden, setPlayer1Turn, setPlayer2Turn, allCards, setAllCards) => {
//     setWinner(false)
//     setDraw(false)
//     setCounterPlayer1(0)
//     setCounterPlayer2(0)
//     setShowCard([])
//     setAllCardsHidden(true)
//     setPlayer1Turn(false)
//     setPlayer2Turn(false)
//     shuffleGrid(allCards, setAllCards)
// }

// const shuffleGrid = (allCards, setAllCards) => {
//     let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
//     let tempArr = []
//     while (numbers.length > 0) {
//         const randomIndex = Math.floor(Math.random() * numbers.length)
//         const randomNumber = numbers[randomIndex]    
//         tempArr = [...tempArr, allCards[randomNumber]]
//         numbers.splice(randomIndex, 1)
//     }        
//     setAllCards(tempArr)
// }

// export const whoIsFirst = (setPlayer1Turn, setPlayer2Turn) => {                             // decides who goes first and start
//     let playerFirst = Math.round(Math.random())
//     playerFirst === 0 ? setPlayer1Turn(true) : setPlayer2Turn(true)
// }

// export const firstTurn = (id, turnedCards, setTurnedCards, setShowCard) => {
//     if (turnedCards < 2) {
//         setTurnedCards(prev => prev + 1)
//         //the first two images are added to showcard
//         setShowCard(prev => [...prev, id])
//     }
// }

// export const compare = () => {
//     //after image 2 is added we compare
//     const card1 = showCard[showCard.length - 2].slice(0, 3)
//     const card2 = showCard[showCard.length - 1].slice(0, 3)
//     //if images are the same return true
//     if (card1 === card2) {
//         return true
//     } else {
//         //not the same, return false
//         return false
//     }
// }
