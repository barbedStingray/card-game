import React, { useState } from 'react'
import './App.css'
import dToons from './characters.js'

import scoreTheBoard from './utilities/scoreTheBoard.js'
import locationTree from './utilities/locationTree.js'

function App() {

  const [boardSlots, setBoardSlots] = useState(dToons)
  const [boardScore, setBoardScore] = useState(0)
  const [myToonScore, setMyToonScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)

  const [myToons, setMyToons] = useState(dToons.filter((_, i) => i % 2 === 0))
  const [opponentToons, setOpponentToons] = useState(dToons.filter((_, i) => i % 2 !== 0))


  // function movedToon(dToon, location) {
  //   if (location === 'board') {
  //     setBoardSlots((prevSlots) => [...prevSlots, dToon])
  //     setDeckSlots(deckSlots.filter((toon) => toon.id !== dToon.id))
  //   } else {
  //     setDeckSlots((prevSlots) => [...prevSlots, dToon])
  //     setBoardSlots(boardSlots.filter((toon) => toon.id !== dToon.id))
  //   }
  // }



  function beginScoringRound(boardSlots) {
    console.log('begin Scoring Round')

    // ! settle Score of the board
    // todo This will likely need to be the array of scores...
    const entireBoardScore = scoreTheBoard(boardSlots)

    // const newMyToonScore = entireBoardScore.reduce((sum, x, i) => { return i % 2 === 0 ? sum + x : sum }, 0) // This has to be the sum of all the even positions
    // const newOpponentScore = entireBoardScore.reduce((sum, x, i) => i % 2 !== 0 ? sum + x : sum, 0) // This has to be the sum of all the odd positions
    // setMyToonScore(newMyToonScore)
    // setOpponentScore(newOpponentScore)
    setBoardScore(entireBoardScore)
  }



  function shuffleBoardRound(boardSlots) {
    console.log('shuffling board', boardSlots)

    // abilities that have yet to be used
    const allBoardAbilities = boardSlots.map((toon) => toon.abilities).flat().filter((ability) => ability.abilityType === 'BOARD' && ability.beenUsed === false)
    console.log('allBoardAbilities', allBoardAbilities)
    
    const swapIndexPairs = allBoardAbilities.map((ability) => {
      const abilityOriginIndex = boardSlots.map((toon) => toon.character).indexOf(ability.abilityOrigin)
      const targetIndex = locationTree[ability.targetLocation][abilityOriginIndex]
      const swapTargetIndex = locationTree[ability.swapTargetLocation][abilityOriginIndex]
      const swapIndexes = [targetIndex, swapTargetIndex].flat()
      console.log(ability.ability)
      console.log('ability.targetLocation', ability.targetLocation)

      // mark ability as used
      ability.beenUsed = true

      return swapIndexes
    })
    console.log('swapIndexPairs', swapIndexPairs)

    function swapPlaces(boardSlots, swapTargets) {
      console.log('swappingPlaces', boardSlots, swapTargets)
      const newBoardSlots = [...boardSlots]
      swapTargets.forEach((targetPair) => {
        const [firstIndex, secondIndex] = targetPair
        const firstToon = newBoardSlots[firstIndex]
        const secondToon = newBoardSlots[secondIndex]
        console.log('firstToon', firstToon)
        console.log('secondToon', secondToon)
        newBoardSlots[targetPair[0]] = secondToon
        newBoardSlots[targetPair[1]] = firstToon
        console.log(newBoardSlots)
      })
      return newBoardSlots
    }

    const afterSwapSpots = swapPlaces(boardSlots, swapIndexPairs)
    console.log('afterSwapSpots', afterSwapSpots)


    setBoardSlots(afterSwapSpots)
    setMyToons(afterSwapSpots.filter((_, i) => i % 2 === 0))
    setOpponentToons(afterSwapSpots.filter((_, i) => i % 2 !== 0))
  }





  return (
    <div className="App">

      <div className='gameBoard'>
        <div className='gameside'>
          {myToons.map((dtoon, i) => (
            <div className='dToonCard' key={i}>
              <p>{dtoon.character}</p>
              <p>{dtoon.color} {dtoon.points} {dtoon.kind}</p>
              <p>{dtoon.groups}</p>
              {dtoon.abilities.map((ability, i) => (
                <p key={i}>{ability.ability}</p>
              ))}
            </div>
          ))}
        </div>

        <div className='deckside'>
          {opponentToons.map((dtoon, i) => (
            <div className='dToonCard' key={i}>
              <p>{dtoon.character}</p>
              <p>{dtoon.color} {dtoon.points} {dtoon.kind}</p>
              <p>{dtoon.groups}</p>
              {dtoon.abilities.map((ability, i) => (
                <p key={i}>{ability.ability}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className='logistics'>
        <button onClick={() => shuffleBoardRound(boardSlots)}>BOARD</button>
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

