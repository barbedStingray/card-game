import React, { useState } from 'react'
import './App.css'
import dToons from './characters.js'

import scoreTheBoard from './utilities/scoreTheBoard.js'
import locationTree from './utilities/locationTree.js'

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

  function identifyInactiveCards(boardSlots) {
    console.log('identifying inactive cards', boardSlots)
    const newBoardSlots = [...boardSlots]    
    const duplicateCharacters = newBoardSlots.map((slot) => slot?.character ?? []).filter((character, i, arr) => arr.indexOf(character) !== i)
    newBoardSlots.forEach((slot) => {
      if(duplicateCharacters.includes(slot?.character ?? null)) {
        slot.active = false
      }
    })

    console.log('The New Board Slots', newBoardSlots)
    setBoardSlots(newBoardSlots)
    setMyToons(newBoardSlots.filter((_, i) => i % 2 === 0))
    setOpponentToons(newBoardSlots.filter((_, i) => i % 2 !== 0))
  }


  function beginScoringRound(boardSlots) {
    console.log('begin Scoring Round')

    // todo This will likely need to be the array of scores...
    const entireBoardScore = scoreTheBoard(boardSlots)
    console.log('ENTIRE BOARD SCORE ARRAY', entireBoardScore)

    const newMyToonScore = entireBoardScore.reduce((sum, x, i) => { return i % 2 === 0 ? sum + x : sum }, 0) // This has to be the sum of all the even positions
    const newOpponentScore = entireBoardScore.reduce((sum, x, i) => i % 2 !== 0 ? sum + x : sum, 0) // This has to be the sum of all the odd positions
    setMyToonScore(newMyToonScore)
    setOpponentScore(newOpponentScore)
    setBoardScore(entireBoardScore.reduce((sum, x) => sum + x, 0))
  }



  function boardAffectsRound(boardSlots) {
    console.log('affecting the board', boardSlots)

    // abilities that have yet to be used // ?? OPTIONAL CHAINING
    const allBoardAbilities = boardSlots.map((toon) => toon?.abilities ?? []).flat().filter((ability) => ability.abilityType === 'BOARD')
    console.log('allBoardAbilities', allBoardAbilities)

    // for each toon ability ?? 
    allBoardAbilities.forEach((ability) => {
      console.log('FOR EACH', ability)

      // check if ability has been used
      if (ability.beenUsed) return

      if (ability.boardSet === 'SWAP') {
        console.log('ability is swap')

        // I need the position of the first swap
        // I need the position of the second swap



      }



    })




    // setBoardSlots(afterSwapSpots)
    // setMyToons(afterSwapSpots.filter((_, i) => i % 2 === 0))
    // setOpponentToons(afterSwapSpots.filter((_, i) => i % 2 !== 0))
  }





  return (
    <div className="App">

      <div className='gameBoard'>
        <div className='gameside'>
          {myToons.map((dtoon, i) => (
            <div className='dToonCard' key={i}>
              {dtoon ? (
                <div style={{ color: dtoon.active ? '' : 'red'}}>
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
                <div style={{ color: dtoon.active ? '' : 'red'}}>
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
        <button onClick={() => identifyInactiveCards(boardSlots)}>ACTIVE</button>
        <button onClick={() => boardAffectsRound(boardSlots)}>BOARD</button>
        <button onClick={() => beginScoringRound(boardSlots)}>SCORE</button>
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

