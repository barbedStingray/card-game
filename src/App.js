import React, { useState } from 'react'
import './App.css'
import dToons from './characters.js'

import scoreTheBoard from './utilities/scoreTheBoard.js'
import swapTheBoard from './utilities/swapTheBoard.js'
import identifyInactiveCards from './utilities/identifyInactiveCards.js'

function App() {

  const [gameCount, setGameCount] = useState(0)
  const [toonOrderArray, setToonOrderArray] = useState(dToons)

  const [boardSlots, setBoardSlots] = useState(Array(8).fill(null))
  const [boardScore, setBoardScore] = useState(0)
  const [myToonScore, setMyToonScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)

  const [myToons, setMyToons] = useState(boardSlots.filter((_, i) => i % 2 === 0))
  const [opponentToons, setOpponentToons] = useState(boardSlots.filter((_, i) => i % 2 !== 0))



  function placeCardIntoPlay() {
    console.log('placing card into play', gameCount)

    const newBoardSlots = [...boardSlots]
    newBoardSlots[gameCount] = toonOrderArray[gameCount]

    setBoardSlots(newBoardSlots)
    setMyToons(newBoardSlots.filter((_, i) => i % 2 === 0))
    setOpponentToons(newBoardSlots.filter((_, i) => i % 2 !== 0))
    setGameCount(gameCount + 1)
  }



  function beginScoringRound(boardSlots) {
    console.log('begin Scoring Round', boardSlots)

    // ! Identify active cards
    const activeBoardSlots = identifyInactiveCards(boardSlots)
    console.log('activeBoardSlots', activeBoardSlots)
    setBoardSlots(activeBoardSlots)
    setMyToons(activeBoardSlots.filter((_, i) => i % 2 === 0))
    setOpponentToons(activeBoardSlots.filter((_, i) => i % 2 !== 0))


    // ! swap the board
    const newPositionBoardSlots = swapTheBoard(activeBoardSlots)
    console.log('newPositionBoardSlots', newPositionBoardSlots)
    setBoardSlots(newPositionBoardSlots)
    setMyToons(newPositionBoardSlots.filter((_, i) => i % 2 === 0))
    setOpponentToons(newPositionBoardSlots.filter((_, i) => i % 2 !== 0))


    // ! Score the board...
    const entireBoardScore = scoreTheBoard(newPositionBoardSlots)
    console.log('ENTIRE BOARD SCORE ARRAY', entireBoardScore)
    const newMyToonScore = entireBoardScore.reduce((sum, x, i) => { return i % 2 === 0 ? sum + x : sum }, 0)
    const newOpponentScore = entireBoardScore.reduce((sum, x, i) => i % 2 !== 0 ? sum + x : sum, 0)
    setMyToonScore(newMyToonScore)
    setOpponentScore(newOpponentScore)
    setBoardScore(entireBoardScore.reduce((sum, x) => sum + x, 0))
  }







  return (
    <div className="App">

      <div className='gameBoard'>
        <div className='gameside'>
          {myToons.map((dtoon, i) => (
            <div className='dToonCard' key={i}>
              {dtoon ? (
                <div style={{ color: dtoon.active ? '' : 'red' }}>
                  <p>{dtoon.character}</p>
                  <p>{dtoon.color} {dtoon.points} {dtoon.kind}</p>
                  <p>{dtoon.groups}</p>
                  {dtoon.abilities.map((ability, i) => (
                    <p key={i}>{ability.ability}</p>
                  ))}
                </div>
              ) : (
                <p>EMPTY SLOT</p>
              )}
            </div>
          ))}
        </div>

        <div className='deckside'>
          {opponentToons.map((dtoon, i) => (
            <div className='dToonCard' key={i}>
              {dtoon ? (
                <div style={{ color: dtoon.active ? '' : 'red' }}>
                  <p>{dtoon.character}</p>
                  <p>{dtoon.color} {dtoon.points} {dtoon.kind}</p>
                  <p>{dtoon.groups}</p>
                  {dtoon.abilities.map((ability, i) => (
                    <p key={i}>{ability.ability}</p>
                  ))}
                </div>
              ) : (
                <p>EMPTY SLOT</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='logistics'>
        <button onClick={() => placeCardIntoPlay(boardSlots)}>PLACE</button>
        <button onClick={() => beginScoringRound(boardSlots)}>PLAY</button>
        <p>Total</p>
        <h1>{boardScore}</h1>
        <p>My Score</p>
        <h1>{myToonScore}</h1>
        <p>Opponent</p>
        <h1>{opponentScore}</h1>
      </div>

    </div>
  );
}

export default App;

