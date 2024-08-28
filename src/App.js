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
  'SELF': { 0: [0], 1: [1], 2: [2], 3: [3], 4: [4], 5: [5], 6: [6], 7: [7], 8: [8], 9: [9], 10: [10], 11: [11], 12: [12], 13: [13], },
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

    // ! INITIAL Reduce, each dToon one by one // do I want to reduce? or do I want an array of points? 
    const boardTotal = boardSlots.reduce((totalScore, dToon, index) => {
      console.log(`SCORING dToon... ${dToon.character}`, dToon)
      const dToonIndex = index

      // ! loop through each ability in play (this is inside each dToon)
      const additionalPoints = allBoardAbilities.reduce((abilityTotal, ability) => {
        console.log('looping through Abilities:', ability.ability)
        
        // ! Check if dToon is inside target location
        const { targetLocation, abilityOrigin } = ability
        const abilityOriginIndex = boardSlots.map((toon) => toon.character).indexOf(abilityOrigin)
        const isTargetInLocation = locationTree[targetLocation][abilityOriginIndex].includes(dToonIndex)

        if (!isTargetInLocation) {
          console.log(dToon.character, 'is not in Target Location', ability.ability)
          return abilityTotal
        }

        // ! check if dToon meets target satisfaction (target conditions)
        const { targets, targetMatch } = ability
        const targetCategories = Object.keys(targets)

        const isTargetSatisfied = targetCategories.length === 0 || targetCategories[targetMatch]((category) => {
          const targetValues = bucketTree[targets[category]] || targets[category]
          const dToonCategoryValues = Array.isArray(dToon[category]) ? dToon[category] : [dToon[category]]
          console.log('targetValues', targetValues)
          console.log('dToonCategory', dToonCategoryValues)
          return dToonCategoryValues.some((toonValue) => targetValues.includes(toonValue))
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
          const categories = Object.keys(conditions)
          console.log('position', position, 'total categories:', categories)

          return categories[conditionMatch]((conditionCategory) => {
            const conditionValues = bucketTree[conditions[conditionCategory]] || conditions[conditionCategory]
            const characterAtt = boardSlots[position][conditionCategory]
            const characterAttributes = Array.isArray(characterAtt) ? characterAtt : [characterAtt]
            console.log('conditionValues', conditionValues)
            console.log('characterAttributes', characterAttributes)
            const isConditionTrue = characterAttributes.some((attribute) => {
              return conditionValues.includes(attribute)
            })
            console.log('isConditionTrue', isConditionTrue)
            return isConditionTrue
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

        // ! Checks all passed, apply bonus
        const { oneShot, bonus } = ability
        const isMultiplier = bonus.split('').some((letter) => letter === 'x')
        const newBonus = isMultiplier ? dToon.points * bonus[0] : Number(bonus)
        return (oneShot ? newBonus : newBonus * countSatisfaction) + abilityTotal
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

