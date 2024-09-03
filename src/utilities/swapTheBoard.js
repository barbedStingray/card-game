
import locationTree from './locationTree.js'


export default function swapTheBoard(boardSlots) {
    console.log('affecting the board', boardSlots)

    const activeToons = boardSlots.filter((toon) => toon?.active === true ?? false)
    console.log('activeToons', activeToons)
    const toonAbilities = activeToons.map((toon) => toon.abilities).flat()
    console.log('toonAbilities', toonAbilities)
    const allBoardAbilities = toonAbilities.filter((ability) => ability.abilityType === 'BOARD') // include used/unused abilities here? 
    console.log('allBoardAbilities', allBoardAbilities)

    // board slots to change
    let newBoardSlots = [...boardSlots]


    allBoardAbilities.forEach((ability) => {
      console.log('FOR EACH', ability.ability)

      // check if ability has been used
      if (ability.beenUsed) return

      // ! in swap ability
      if (ability.boardSet === 'SWAP') { // ! Swap the Card ability
        console.log('ability is swap')

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
        return newBoardSlots
      }
      
    })



    return newBoardSlots

    // in the end... what does this have to return? 
    // new array of shuffled board slots... where abilities only trigger if the card is inplay...

    // setBoardSlots(afterSwapSpots)
    // setMyToons(afterSwapSpots.filter((_, i) => i % 2 === 0))
    // setOpponentToons(afterSwapSpots.filter((_, i) => i % 2 !== 0))
  }
