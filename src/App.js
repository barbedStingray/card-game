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


    // identify all abilities... only need to do it once...
    const allBoardAbilities = boardSlots.map((toon) => toon.abilities).flat()

    // todo INITIAL Reduce, each dToon one by one
    const boardTotal = boardSlots.reduce((totalScore, dToon, index) => {
      console.log(`SCORING dToon... ${dToon.character}`, dToon)
      const dToonIndex = index

      // check abilities and apply bonus
      // todo loop through each ability in play (this is inside each dToon)
      const additionalPoints = allBoardAbilities.reduce((abilityTotal, ability) => {
        const { target, targetCategory, condition, conditionCategory, locationCondition, abilityOrigin, oneShot, bonus } = ability
        console.log('ABILITY', ability.ability)

        // check if this card is a valid target of the ability
        console.log(`Checking For ${target} in ${targetCategory} with dToon ${dToon[targetCategory]}`)
        const isTargetSatisfied = target.includes(dToon[targetCategory])
        console.log('isTarget satisfied?', isTargetSatisfied)

        if (!isTargetSatisfied) {
          console.log(dToon.character, 'is not a target of', ability.ability)
          return abilityTotal
        }

        // check if the ability conditions are met
        const abilityOriginIndex = boardSlots.map((toon) => toon.character).indexOf(abilityOrigin)
        // console.log('abilityOriginIndex', abilityOriginIndex)
        const identifyConditionIndices = locationTree[locationCondition]?.[abilityOriginIndex]

        // ! ---------- CONSTRUCTION -------------- THIS IS BEFORE

        const isConditionSatisfiedBySameCard = identifyConditionIndices.map((position) => {
          console.log('position', position)

          return conditionCategory.every((condCat, i) => { // todo every conditionCategory must be true, or only some? I will need both... 
            console.log('condCat', condCat, i)

            // const theCondition = condition[i]
            const conditionValues = Array.isArray(condition[i]) ? condition[i] : [condition[i]]; // todo is this actually needed?

            console.log('conditionValues', conditionValues)
            console.log('Character Att:', boardSlots[position][condCat])
            console.log('return', conditionValues.includes(boardSlots[position][condCat]))
            // return boardSlots[position][condCat] === conditionValues
            return conditionValues.includes(boardSlots[position][condCat])
          })
        })
        console.log('isConditionSatisfiedBySameCard', isConditionSatisfiedBySameCard)
        const countSatisfaction = isConditionSatisfiedBySameCard.filter(Boolean).length
        console.log('countSatisfaction', countSatisfaction)

        // ! ---------- CONSTRUCTION --------------

        const identifyConditionAttributes = identifyConditionIndices.map((x) => boardSlots[x][conditionCategory])
        // console.log('identifyConditionAttributes', identifyConditionAttributes)
        const countMatches = identifyConditionAttributes.filter((potentialMatch) => condition.includes(potentialMatch))
        // console.log('countMatches', countMatches)
        const isConditionSatisfied = countMatches.length > 0
        // console.log('isConditionSatisfied', isConditionSatisfied)


        if (!isConditionSatisfied) {
          console.log(ability.ability, 'condition not met')
          return abilityTotal
        }

        // console.log('oneShot, length', oneShot, countMatches.length)
        return (oneShot ? bonus : bonus * countMatches.length) + abilityTotal
      }, 0)

      // console.log(`${dToon.character} addtionalPoints`, additionalPoints)

      // console.log(`${dToonIndex}-${dToon.character} pointValue: ${dToon.points} extra: ${additionalPoints}`)
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

