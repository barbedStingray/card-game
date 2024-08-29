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
    // ? This will likely need to be the array of scores...
    const entireBoardScore = scoreTheBoard(boardSlots) // evaluates to an array of scores
    const myToonScore = 0 // This has to be the sum of all the even positions
    const opponentScore = 0 // This has to be the sum of all the odd positions

    setBoardScore(entireBoardScore)
  }



  function shuffleBoardRound(boardSlots) {
    console.log('shuffling board', boardSlots)
    // ! settle board adjustments

    const allBoardAbilities = boardSlots.map((toon) => toon.abilities).flat().filter((ability) => ability.abilityType === 'BOARD')
    console.log('allBoardAbilities', allBoardAbilities)
    
    // what do I want? To swap places... take an array, return a different array.
    // I need the index of the two items to be swapped... two index numbers

    // lets generate an array of the index pairs that need to swap.
    const swapIndexPairs = allBoardAbilities.map((ability) => {
      const abilityOriginIndex = locationTree
      console.log(ability.ability)
      console.log('ability.targetLocation', ability.targetLocation)
    })
    console.log('swapIndexPairs', swapIndexPairs)


    function swapPlaces(boardSlots, swapOne, swapTwo) {
      // function to swap two places in board slots... 
    }





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
        <button onClick={() => shuffleBoardRound(boardSlots)}>Shuffle</button>
        <button onClick={() => beginScoringRound(boardSlots)}>Score</button>
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

