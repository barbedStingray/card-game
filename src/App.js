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
      if (duplicateCharacters.includes(slot?.character ?? null)) {
        slot.active = false
      }
    })

    // console.log('The New Board Slots', newBoardSlots)
    setBoardSlots(newBoardSlots)
    setMyToons(newBoardSlots.filter((_, i) => i % 2 === 0))
    setOpponentToons(newBoardSlots.filter((_, i) => i % 2 !== 0))
  }


  function beginScoringRound(boardSlots) {
    console.log('begin Scoring Round')

    const entireBoardScore = scoreTheBoard(boardSlots)
    console.log('ENTIRE BOARD SCORE ARRAY', entireBoardScore)

    const newMyToonScore = entireBoardScore.reduce((sum, x, i) => { return i % 2 === 0 ? sum + x : sum }, 0)
    const newOpponentScore = entireBoardScore.reduce((sum, x, i) => i % 2 !== 0 ? sum + x : sum, 0)
    setMyToonScore(newMyToonScore)
    setOpponentScore(newOpponentScore)
    setBoardScore(entireBoardScore.reduce((sum, x) => sum + x, 0))
  }

  // ! BOARD Powers... 
  // todo opposing card loses it's adjacency affects...
  // todo changing card kinds... groups... colors... heroes... 
  // todo protecting / locking cards... prevent opponents from affecting you
  // todo clone a card in play... opposing... neighboring... your choice... all stats except character
  // todo copy / steal an ability, copy the last ability played...
  // todo move a target card to the right/left/up/down/across...

  // ! Advanced BOARD Powers...
  // todo advanced colors... change color to the most represented color... to the game match color...
  // todo STATUS EFFECTS poison... stun... freeze... blind... 
  // todo Card sacrifice - buff another card by one becomming inactive...
  // todo ? Time based effects / +1 for each card played?

  // ? Cool Ideas to think about...
  // territory control - fighting over kingdoms? +10 to whomever has more knights for a castle?
  // Weather control variables? Environment / Gameboard Bonuses? 
  // time manipulation... change flow of game? - ability to manipulate what a round is or play order...
  // Countdown effects - big boom after a certain number of turns...
  // vision/information - reveal opponents hand... 
  // capture an opponent card? 
  // Multi-phase abilities... +2 in the first round, but +5 if in the second round
  // cards that alter win conditions? 
  // Bouncing/eliminating cards back?
  // reversing effects, redirecting points...
  
  
  // ? Outside mechanics
  // resource generation mechanic?? build up dust and apply it to powers...
  // resource drain...
  // summoning - summon barriers or tokens to do smaller things... 
  // trap cards? playing on the opponents side?
  // phasing - cards that can phase out of the game and then come back in... ghosts?
  // retaliation cards - returns an attack when affected...
  // mirror match (mirror) - copy the opponents board layout and abilities for a turn...
  // rewind
  // Hidden Effects... only revealed when a certain card is played...








  function boardAffectsRound(boardSlots) {
    console.log('affecting the board', boardSlots)

    const activeToons = boardSlots.filter((toon) => toon?.active === true ?? false)
    console.log('activeToons', activeToons)
    const toonAbilities = activeToons.map((toon) => toon.abilities).flat()
    console.log('toonAbilities', toonAbilities)
    const allBoardAbilities = toonAbilities.filter((ability) => ability.abilityType === 'BOARD') // include used/unused abilities here? 
    console.log('allBoardAbilities', allBoardAbilities)


    allBoardAbilities.forEach((ability) => {
      console.log('FOR EACH', ability.ability)

      // check if ability has been used
      if (ability.beenUsed) return

      // ! in swap ability
      if (ability.boardSet === 'SWAP') { // ! Swap the Card ability
        console.log('ability is swap')

        const newBoardSlots = [...boardSlots]

        // ! identify indexes
        const abilityOriginIndex = boardSlots.map((toon) => toon?.character ?? []).indexOf(ability.abilityOrigin)
        const firstSwapToonIndex = locationTree[ability.targetLocation][abilityOriginIndex][0]
        const secondSwapToonIndex = locationTree[ability.swapTargetLocation][abilityOriginIndex][0]
        const [toonOne, toonTwo] = [newBoardSlots[firstSwapToonIndex], newBoardSlots[secondSwapToonIndex]]
        console.log('toonOne, toonTwo', toonOne, toonTwo)

        // ! check for null toons (inactive has already been filtered)
        if (!toonOne || !toonTwo) {
          console.log('null value for toon!')
          return
        }

        // ! ALL CLEAR make the swap
        // Perform the swap
        [newBoardSlots[firstSwapToonIndex], newBoardSlots[secondSwapToonIndex]] = [toonTwo, toonOne];
        console.log('NEW BOARD', newBoardSlots)

        // ! mark ability as used
        ability.beenUsed = true

        // ! set the UI
        setBoardSlots(newBoardSlots)
        setMyToons(newBoardSlots.filter((_, i) => i % 2 === 0))
        setOpponentToons(newBoardSlots.filter((_, i) => i % 2 !== 0))
      }
    })





    // in the end... what does this have to return? 
    // new array of shuffled board slots... where abilities only trigger if the card is inplay...

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

