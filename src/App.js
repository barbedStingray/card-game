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
  'SELF': { 0: [0], 1: [1], 2: [2], 3: [3] },
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

    // ! INITIAL Reduce, each dToon one by one
    const boardTotal = boardSlots.reduce((totalScore, dToon, index) => {
      console.log(`SCORING dToon... ${dToon.character}`, dToon)
      const dToonIndex = index

      // ! loop through each ability in play (this is inside each dToon)
      const additionalPoints = allBoardAbilities.reduce((abilityTotal, ability) => {

        const { targets, targetMatch, targetLocation, abilityOrigin } = ability
        console.log('ABILITY', ability.ability)
        const abilityOriginIndex = boardSlots.map((toon) => toon.character).indexOf(abilityOrigin)

        // ! Check if dToon is inside target location
        const isTargetInLocation = locationTree[targetLocation][abilityOriginIndex].includes(dToonIndex)
        if (!isTargetInLocation) {
          console.log(dToon.character, 'is not in Target Location', ability.ability)
          return abilityTotal
        }

        // ! check if dToon meets target satisfaction (target conditions)
        const targetCategories = Object.keys(targets)
        console.log('targetCategories', targetCategories)

        const isTargetSatisfied = targetCategories.length === 0 || targetCategories[targetMatch]((category) => {
          console.log(dToon[category]) // todo groups will be an array...
          // you're comparing an array to an array... XxX
          console.log('return', targets[category].includes(dToon[category])) // todo possible many : many for groups
          return targets[category].includes(dToon[category])
        })
        console.log('isTarget satisfied?', isTargetSatisfied)

        if (!isTargetSatisfied) {
          console.log(dToon.character, 'is not a target of', ability.ability)
          return abilityTotal
        }
        
        // ! check if the ability conditions are met
        const { conditions, conditionLocation, conditionMatch } = ability

        const identifyConditionIndices = locationTree[conditionLocation]?.[abilityOriginIndex]
        console.log('identifyConditionIndices', identifyConditionIndices)

        const isConditionSatisfiedBySameCard = identifyConditionIndices.map((position) => {
          console.log('position', position)

          const categories = Object.keys(conditions)
          console.log('categories', categories)

          return categories[conditionMatch]((conditionCategory) => {
            console.log('conditionCategory', conditionCategory)

            const conditionValues = Array.isArray(conditions[conditionCategory]) ? conditions[conditionCategory] : [conditions[conditionCategory]]; // todo is this actually needed? This will always be an array?? 
            console.log('conditionValues', conditionValues)

            console.log('Character Att:', boardSlots[position][conditionCategory])
            console.log('return', conditionValues.includes(boardSlots[position][conditionCategory]))
            return conditionValues.includes(boardSlots[position][conditionCategory])
          })
        })
        console.log('isConditionSatisfiedBySameCard', isConditionSatisfiedBySameCard)
        const countSatisfaction = isConditionSatisfiedBySameCard.filter(Boolean).length
        console.log('countSatisfaction', countSatisfaction)
        const isConditionSatisfied = countSatisfaction > 0
        console.log('isConditionSatisfied', isConditionSatisfied)

        if (!isConditionSatisfied) {
          console.log(ability.ability, 'condition not met')
          return abilityTotal
        }

        const { oneShot, bonus } = ability
        return (oneShot ? bonus : bonus * countSatisfaction) + abilityTotal
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

