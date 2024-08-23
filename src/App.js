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
  'INPLAY': { 0: [1, 2, 3], 1: [0, 2, 3], 2: [0, 1, 3], 3: [0, 1, 2] },
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

      // identify all abilities...
      const allBoardAbilities = boardSlots.map((toon) => toon.abilities).flat()


      // check abilities and apply bonus
      const additionalPoints = allBoardAbilities.reduce((abilityTotal, ability) => {
        const { target, targetCategory, condition, conditionCategory, locationCondition, abilityOrigin, oneShot, bonus } = ability

        //! Need to account for two conditionCategories
        //! Maybe adjust logic so that not every ability gets checked by every card? 
        // ! filter abilities, filter abilites that are successful, go over dToons and match by target?
        const abilityOriginIndex = boardSlots.map((toon) => toon.character).indexOf(abilityOrigin)

        const identifyConditionIndices = locationTree[locationCondition]?.[abilityOriginIndex]
        const identifyConditionAttributes = identifyConditionIndices.map((x) => boardSlots[x][conditionCategory])
        console.log('identifyConditionAttributes', identifyConditionAttributes)

        const countMatches = identifyConditionAttributes.filter((potentialMatch) => condition.includes(potentialMatch))
        console.log('countMatches', countMatches)
        const isConditionSatisfied = countMatches.length > 0
        console.log('isConditionSatisfied', isConditionSatisfied)

        console.log(`Checking For ${target} in ${targetCategory} with dToon ${dToon[targetCategory]}`)
        const isTargetSatisfied = target.includes(dToon[targetCategory])

        if (isTargetSatisfied && isConditionSatisfied) {
          return (oneShot ? bonus : bonus * countMatches.length) + abilityTotal
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

