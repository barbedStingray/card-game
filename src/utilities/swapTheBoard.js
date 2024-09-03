
import locationTree from './locationTree.js'


function swapCardAbility(boardSlots, ability, abilityOriginIndex) {
    console.log('new swapping card ability')
    console.log('ability is swap', abilityOriginIndex)

    const adjustBoardSlots = [...boardSlots]

    // ! identify indexes
    const firstSwapToonIndex = locationTree[ability.targetLocation][abilityOriginIndex][0]
    const secondSwapToonIndex = locationTree[ability.swapTargetLocation][abilityOriginIndex][0]
    const [toonOne, toonTwo] = [adjustBoardSlots[firstSwapToonIndex], adjustBoardSlots[secondSwapToonIndex]]
    console.log('toonOne, toonTwo', toonOne, toonTwo)

    // ! check for null toons (inactive has already been filtered)
    if (!toonOne || !toonTwo) {
        console.log('null value for toon!')
        return adjustBoardSlots
    }

    // ! ALL CLEAR make the swap
    // Perform the swap
    [adjustBoardSlots[firstSwapToonIndex], adjustBoardSlots[secondSwapToonIndex]] = [toonTwo, toonOne];
    console.log('NEW BOARD', adjustBoardSlots)

    // ! mark ability as used
    ability.beenUsed = true

    // ! set the UI
    return adjustBoardSlots
}


function cloneCardAbility(boardSlots, ability, abilityOriginIndex) {
    console.log('new clone card ability')
    console.log('ability is CLONE', abilityOriginIndex)
    // identify target / location
    const adjustboardSlots = [...boardSlots]
    console.log('ability CLONE', ability)

    console.log('targetLocation', ability.targetLocation)
    console.log('abilityOriginIndex', abilityOriginIndex)

    const copyLocationIndex = locationTree[ability.targetLocation][abilityOriginIndex]
    console.log('copyLocationIndex', copyLocationIndex)

    // identify clone card
    const copyCardLocation = locationTree[ability.copyTargetLocation][abilityOriginIndex]
    console.log('copyCardLocation', copyCardLocation)

    const cardToCopy = adjustboardSlots[copyCardLocation]
    console.log('cardToCopy', cardToCopy)

    // apply clone card
    const newCloneCard = {
        ...adjustboardSlots[copyLocationIndex],
        color: cardToCopy.color,
        points: cardToCopy.points,
        groups: cardToCopy.groups,
        abilities: cardToCopy.abilities,
    }
    console.log('newCloneCard', newCloneCard)

    // reset ability
    
    console.log('THIS', adjustboardSlots[copyLocationIndex] = newCloneCard)
    console.log('ADJUSTED?', adjustboardSlots)
    return adjustboardSlots

}




export default function swapTheBoard(boardSlots) {
    // console.log('affecting the board', boardSlots)

    const activeToons = boardSlots.filter((toon) => toon?.active === true ?? false)
    // console.log('activeToons', activeToons)
    const toonAbilities = activeToons.map((toon) => toon.abilities).flat()
    // console.log('toonAbilities', toonAbilities)
    const allBoardAbilities = toonAbilities.filter((ability) => ability.abilityType === 'BOARD') // include used/unused abilities here? 
    console.log('allBoardAbilities', allBoardAbilities)

    // board slots to change
    let newBoardSlots = [...boardSlots]

    // ! lookup for your Ability...

    const abilityTree = {
        'SWAP': swapCardAbility,
        'CLONE': cloneCardAbility,
        // more abilities here
    }

    allBoardAbilities.forEach((ability) => {
        console.log('FOR EACH', ability.ability)

        // check if ability has been used
        if (ability.beenUsed) return

        const abilityOriginIndex = newBoardSlots.map((toon) => toon?.character ?? []).indexOf(ability.abilityOrigin)
        const abilityFunction = abilityTree[ability.boardSet]
        console.log('abilityFunction', abilityFunction)

        if (abilityFunction) {
            console.log('ABILITY IN', ability)
            const adjustedBoardSlots = abilityFunction(newBoardSlots, ability, abilityOriginIndex)
            console.log('adjustedBoardSlots', adjustedBoardSlots)
            newBoardSlots = adjustedBoardSlots
            console.log('setting new board slots', newBoardSlots)
        } 
        else {
            console.log('no ability function identified')
        }
    })

    return newBoardSlots
    // in the end... what does this have to return? 
    // new array of shuffled board slots... where abilities only trigger if the card is inplay...
}
