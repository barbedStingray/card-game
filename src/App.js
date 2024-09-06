import React, { useState, useRef } from 'react'
import './App.css'
import dToons from './characters.js'

import scoreTheBoard from './utilities/scoreTheBoard.js'
import swapTheBoard from './utilities/swapTheBoard.js'
import identifyInactiveCards from './utilities/identifyInactiveCards.js'

function App() {

  const [gameCount, setGameCount] = useState(0)
  const [toonOrderArray, setToonOrderArray] = useState(dToons)

  const [boardSlots, setBoardSlots] = useState(Array(8).fill(null))
  const [boardScore, setBoardScore] = useState(0)
  const [myToonScore, setMyToonScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)


  const [pointValueStates, setPointValueStates] = useState({})
  const [previousRoundScore, setPreviousRoundScore] = useState([])
  const previousToons = useRef(boardSlots)
  console.log('USEREF', previousToons.current)




  function valueChange(toonID) {
    console.log('the value is changing at', toonID)
    setPointValueStates((prevState) => ({
      ...prevState, [toonID]: true,
    }))
    setTimeout(() => {
      setPointValueStates((prevState) => ({
        ...prevState, [toonID]: false,
      }))
    }, 1000)
  }



  function introduceAnotherCard(boardSlots) {
    console.log(`begin ${gameCount} Round`, boardSlots)
  


    // ! Play a card...
    const playCardSlots = [...boardSlots]
    playCardSlots[gameCount] = toonOrderArray[gameCount]
    setBoardSlots(playCardSlots)
    setGameCount(gameCount + 1)
    console.log('newCardSlots', playCardSlots)


    // ! Identify active cards
    const activeBoardSlots = identifyInactiveCards(playCardSlots)
    console.log('activeBoardSlots', activeBoardSlots)
    setBoardSlots(activeBoardSlots)


    // ! swap the board
    const newPositionBoardSlots = swapTheBoard(activeBoardSlots)
    console.log('newPositionBoardSlots', newPositionBoardSlots)
    setTimeout(() => {
      setBoardSlots(newPositionBoardSlots)
    }, 1000)


    // ! Score the board...
      const newScoringSlots = scoreTheBoard(newPositionBoardSlots)
      console.log('newScoringSlots', newScoringSlots)

      // handle active point changes
      newScoringSlots.forEach((toon, index) => {
        if (!toon) {
          console.log('no toon in spot')
          return
        }
        console.log('BONUS toon', toon)
        const currentToonScore = toon.points + toon.bonusPoints
        const previousScore = (previousRoundScore[index]?.points + previousRoundScore[index]?.bonusPoints) || 0
        const previousREF = (previousToons.current[index]?.points + previousToons.current[index]?.bonusPoints) || 0
        console.log('currentToonScore', currentToonScore)
        console.log('previousScore', previousScore)
        console.log('previousREF', previousREF)
        const hasToonChangedValue = currentToonScore !== previousScore
        console.log('hasToonChangedValue', hasToonChangedValue)
        if (hasToonChangedValue) {
          console.log('toon has changed in point value')
          valueChange(toon.id)
        }
      })

      // ! set scoring
      const opponentPointsScore = newScoringSlots.map((toon) => toon?.points || 0).reduce((sum, x, i) => (i % 2 === 0 ? sum + x : sum), 0)
      const opponentBonusScore = newScoringSlots.map((toon) => toon?.bonusPoints || 0).reduce((sum, x, i) => (i % 2 === 0 ? sum + x : sum), 0)
      const myToonScore = newScoringSlots.map((toon) => toon?.points || 0).reduce((sum, x, i) => (i % 2 !== 0 ? sum + x : sum), 0)
      const myToonBonusScore = newScoringSlots.map((toon) => toon?.bonusPoints || 0).reduce((sum, x, i) => (i % 2 !== 0 ? sum + x : sum), 0)
      setMyToonScore(myToonScore + myToonBonusScore)
      setOpponentScore(opponentPointsScore + opponentBonusScore)
      setBoardScore(myToonScore + myToonBonusScore + opponentPointsScore + opponentBonusScore)

      setPreviousRoundScore(newScoringSlots)
      previousToons.current = newScoringSlots

  }



  return (
    <div className="App">


      <div className='gameBoard'>

        <div className='cardLayout opponentLayout'>
          {boardSlots.filter((_, i) => i % 2 === 0).map((slot, index) => (
            <div className="spot" key={index}>
              {slot ? (
                <>
                  <p className={`toonScore ${pointValueStates[slot.id] ? 'active' : 'inactive'}`}>
                    {slot.points + slot.bonusPoints}
                  </p>
                  <img className='boardImage' src={slot.displayImage} alt={`Card ${index}`} />
                </>
              ) : (
                <p>No current Card</p>
              )}
            </div>
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
            <div className="spot" key={index}>
              {slot ? (
                <>
                  <p className={`toonScore ${pointValueStates[slot.id] ? 'active' : 'inactive'}`}>
                    {slot.points + slot.bonusPoints}
                  </p>
                  <img className='boardImage' src={slot.displayImage} alt={`Card ${index}`} />
                </>
              ) : (
                <p>No current Card</p>
              )}
            </div>
          ))}
        </div>

      </div>



    </div>
  );
}

export default App;

