import React, { useState } from 'react'
import './App.css'
import dToons from './characters.js'

import scoreTheBoard from './utilities/scoreTheBoard.js'
import swapTheBoard from './utilities/swapTheBoard.js'
import identifyInactiveCards from './utilities/identifyInactiveCards.js'
import GameCard from './components/GameCard.jsx'

import assessTargetLocation from './utilities/checkpoints/assessTargetLocation.js'
import assessTargetConditions from './utilities/checkpoints/assessTargetConditions.js'
import assessAbilityConditions from './utilities/checkpoints/assessAbilityConditions.js'


function App() {

  const [gameCount, setGameCount] = useState(0)
  const [toonOrderArray, setToonOrderArray] = useState(dToons)

  const [boardSlots, setBoardSlots] = useState(Array(8).fill(null))
  const [boardScore, setBoardScore] = useState(0)
  const [myToonScore, setMyToonScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)


  function introduceAnotherCard(boardSlots) {
    // console.log(`begin ${gameCount} Round`, boardSlots)


    // ! Play a card...
    const playCardSlots = [...boardSlots]
    playCardSlots[gameCount] = toonOrderArray[gameCount]
    setBoardSlots(playCardSlots)
    setGameCount(gameCount + 1)
    // console.log('newCardSlots', playCardSlots)


    // ! Identify active cards
    const activeBoardSlots = identifyInactiveCards(playCardSlots)
    console.log('activeBoardSlots', activeBoardSlots)
    setBoardSlots(activeBoardSlots)




    // apply silence FIRST
    const activeSilenceAbilities = activeBoardSlots.filter((toon) => toon?.isActive === true)
      .map((slot) => slot?.abilities).flat().filter((ability) => ability?.abilityType === 'SILENCE')

    const silencedCards = activeBoardSlots.map((dToon, index) => {
      if (!dToon) return null
      if (activeSilenceAbilities.length === 0) return { ...dToon, cardStatus: { ...dToon.cardStatus, isSilenced: false } }

      const cardIsSilenced = activeSilenceAbilities.some((ability) => {
        const isTargetInLocation = assessTargetLocation(ability, activeBoardSlots, index)
        if (!isTargetInLocation) {
          return false
        }
        const isTargetSatisfied = assessTargetConditions(ability, dToon)
        if (!isTargetSatisfied) {
          return false
        }
        const countSatisfaction = assessAbilityConditions(ability, activeBoardSlots)
        if (countSatisfaction === 0) {
          return false
        }
        return true
      })
      return cardIsSilenced ?
        { ...dToon, cardStatus: { ...dToon.cardStatus, isSilenced: true } }
        : { ...dToon, cardStatus: { ...dToon.cardStatus, isSilenced: false } }
    })

    // apply protect SECOND, make exceptions...
    const activeProtectAbilities = silencedCards.filter((toon) => toon?.isActive === true && toon?.cardStatus.isSilenced === false)
      .map((slot) => slot?.abilities).flat().filter((ability) => ability?.abilityType === 'PROTECT')
    const protectedCards = silencedCards.map((dToon, index) => {
      if (!dToon) return null
      if (activeProtectAbilities.length === 0) return { ...dToon, cardStatus: { ...dToon.cardStatus, isProtected: false } }

      const cardIsProtected = activeProtectAbilities.some((ability) => {
        const isTargetInLocation = assessTargetLocation(ability, silencedCards, index)
        if (!isTargetInLocation) {
          return false
        }
        const isTargetSatisfied = assessTargetConditions(ability, dToon)
        if (!isTargetSatisfied) {
          return false
        }
        const countSatisfaction = assessAbilityConditions(ability, silencedCards)
        if (countSatisfaction === 0) { // or less than??
          return false
        }
        return true
      })
      // override if it should be protected
      return cardIsProtected ?
        { ...dToon, cardStatus: { ...dToon.cardStatus, isProtected: true, isSilenced: false } } // the exception
        : { ...dToon, cardStatus: { ...dToon.cardStatus, isProtected: false } }
    })
    setBoardSlots(protectedCards)


    // set other board manuvers here based on if a card is protected or not???
    // will protected cards change after this point? probably not...


    // copy an ability... abilities??

    // const copiedCards = protectedCards.map((dToon, index) => {
    //   // loop through all toons to see if they have a copy ability...
    //   if (!dToon) return null
    //   if (dToon.cardStatus.isSilenced) {
    //     console.log('copy - toon is silenced', dToon.character)
    //     return dToon
    //   }
    //   // check if toon has a copy ability...
    //   const toonCopyAbility = dToon.abilities.filter((ability) => ability.abilityType === 'COPY')
    //   console.log('toonCopyAbility', toonCopyAbility)
    //   if (toonCopyAbility.length === 0) return dToon // if it has no copy ability


    //   const targetCopyCard = toonCopyAbility.some((ability) => {
    //     console.log(ability.ability)
    //     const isTargetInLocation = assessTargetLocation(ability, protectedCards, index)
    //     console.log('isTargetInLocation', isTargetInLocation)
    //     if (!isTargetInLocation) {
    //       return false
    //     }
    //     const isTargetSatisfied = assessTargetConditions(ability, dToon)
    //     if (!isTargetSatisfied) {
    //       return false
    //     }
    //     const countSatisfaction = assessAbilityConditions(ability, protectedCards)
    //     if (countSatisfaction === 0) { // or less than??
    //       return false
    //     }
    //     return true
    //   })
    //   console.log('targetCopyCard', targetCopyCard)



    //   return dToon
    // })
    // console.log('copiedCards', copiedCards)












    // ! Score the board...
    setTimeout(() => {

      const newScoringSlots = scoreTheBoard(protectedCards)
      // console.log('newScoringSlots', newScoringSlots)

      // ! set scoring
      const opponentPointsScore = newScoringSlots.map((toon) => toon?.points || 0).reduce((sum, x, i) => (i % 2 === 0 ? sum + x : sum), 0)
      const opponentBonusScore = newScoringSlots.map((toon) => toon?.bonusPoints || 0).reduce((sum, x, i) => (i % 2 === 0 ? sum + x : sum), 0)
      const myToonScore = newScoringSlots.map((toon) => toon?.points || 0).reduce((sum, x, i) => (i % 2 !== 0 ? sum + x : sum), 0)
      const myToonBonusScore = newScoringSlots.map((toon) => toon?.bonusPoints || 0).reduce((sum, x, i) => (i % 2 !== 0 ? sum + x : sum), 0)
      setMyToonScore(myToonScore + myToonBonusScore)
      setOpponentScore(opponentPointsScore + opponentBonusScore)
      setBoardScore(myToonScore + myToonBonusScore + opponentPointsScore + opponentBonusScore)
    }, 1000)
  }



  return (
    <div className="App">

      <div className='gameBoard'>

        <div className='cardLayout opponentLayout'>
          {boardSlots.filter((_, i) => i % 2 === 0).map((slot, index) => (
            <GameCard slot={slot} key={index} />
          ))}
        </div>

        <div className='scoreBoard'>
          <button onClick={() => introduceAnotherCard(boardSlots)}>PLAY</button>
          <p>Total</p>
          <h1>{boardScore}</h1>
          <p>My Score</p>
          <h1>{myToonScore}</h1>
          <p>Opponent</p>
          <h1>{opponentScore}</h1>
        </div>

        <div className='cardLayout playerLayout'>
          {boardSlots.filter((_, i) => i % 2 !== 0).map((slot, index) => (
            <GameCard slot={slot} key={index} />
          ))}
        </div>

      </div>

    </div>
  );
}

export default App;

