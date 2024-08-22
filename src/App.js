import React, { useState } from 'react'
import './App.css'
import dToons from './characters.js'

const animalBucket = ['Bug', 'Dog', 'Lion', 'Bear', 'Gorilla', 'Meerekat', 'Warthog', 'Monkey']
const royaltyBucket = ['King', 'Queen', 'Prince', 'Princess']
const bucketTree = {
  'Animal': animalBucket,
  'Royalty': royaltyBucket,
}

// this is your game board
const locationTree = {
  'INPLAY': { 0: [0, 1, 2, 3], 1: [0, 1, 2, 3], 2: [0, 1, 2, 3], 3: [0, 1, 2, 3] },
  'NEIGHBOR': { 0: [1], 1: [0, 2], 2: [1, 3], 3: [2] },
  // OPPONENT
  // OPPOSITE
}





function App() {

  const [boardSlots, setBoardSlots] = useState([])
  const [deckSlots, setDeckSlots] = useState(dToons)
  const [boardScore, setBoardScore] = useState(0)



  function movedToon(dToon, location) {
    if (location === 'board') {
      setBoardSlots((prevSlots) => [...prevSlots, dToon])
      setDeckSlots(deckSlots.filter((toon) => toon.id !== dToon.id))
    } else {
      setDeckSlots((prevSlots) => [...prevSlots, dToon])
      setBoardSlots(boardSlots.filter((toon) => toon.id !== dToon.id))
    }
  }

  function scoreTheBoard(boardSlots) {
    console.log('scoring Board')




    const boardTotal = boardSlots.reduce((totalScore, dToon, index) => {
      console.log(`SCORING dToon... ${dToon.character}`, dToon)
      const dToonIndex = index

      // find all abilities...
      const allBoardAbilities = boardSlots.map((toon) => toon.abilities).flat()
      console.log('allBoardAbilities', allBoardAbilities)


      // find abilities that target this card? 
      const additionalPoints = allBoardAbilities.reduce((abilityTotal, ability) => {

        const { target, targetCategory, condition, conditionCategory, conditionLocation, oneShot, bonus } = ability
        console.log(target, targetCategory, condition, conditionCategory, conditionLocation, oneShot, bonus)


        // ! Designate location ability is assessing
        const targetLocations = locationTree[conditionLocation]?.[index]
        console.log('targetLocations', targetLocations)
        const targetCards = boardSlots.map((toon) => toon.color)
        console.log('colorCardsInPlay', targetCards)


        const countMatches = targetCards.filter((color) => color === condition)
        console.log('count Matches ', countMatches)
        
        const isColorMatchSatisfied = countMatches.length > 0
        console.log('isLocationSatisfied', isColorMatchSatisfied)
        
        // ! what is the target of the ability?
        const isTargetSatisfied = target.includes(dToon[targetCategory])
        console.log('isTargetSatisfied', isTargetSatisfied)

        // apply bonus
        if (isTargetSatisfied && isColorMatchSatisfied) {
          return (ability.oneShot ? bonus : bonus * countMatches.length) + abilityTotal
        }
        return abilityTotal
      }, 0)
      console.log(`${dToon.character} addtionalPoints`, additionalPoints)






      console.log(`${dToonIndex}-${dToon.character} pointValue: ${dToon.points} extra: ${additionalPoints}`)
      return totalScore + dToon.points + additionalPoints
    }, 0)


    setBoardScore(boardTotal)
  }






  return (
    <div className="App">


      <div className='gameside'>
        {boardSlots.map((dtoon, i) => (
          <div onClick={() => movedToon(dtoon, 'deck')} className='dToonCard' key={i}>
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
        {deckSlots.map((dtoon, i) => (
          <div onClick={() => movedToon(dtoon, 'board')} className='dToonCard' key={i}>
            <p>{dtoon.character}</p>
            <p>{dtoon.color} {dtoon.points} {dtoon.kind}</p>
            <p>{dtoon.groups}</p>
            {dtoon.abilities.map((ability, i) => (
              <p key={i}>{ability.ability}</p>
            ))}
          </div>
        ))}
      </div>

      <button onClick={() => scoreTheBoard(boardSlots)}>Score</button>
      <h1>{boardScore}</h1>

    </div>
  );
}

export default App;

