
import locationTree from './locationTree.js'


function swapCardAbility(boardSlots, ability, abilityOriginIndex) {
    console.log('ability is swap', abilityOriginIndex)

    const swapSlotsChange = [...boardSlots]

    // ! identify indexes
    const firstSwapToonIndex = locationTree[ability.targetLocation][abilityOriginIndex][0]
    const secondSwapToonIndex = locationTree[ability.swapTargetLocation][abilityOriginIndex][0]
    const [toonOne, toonTwo] = [swapSlotsChange[firstSwapToonIndex], swapSlotsChange[secondSwapToonIndex]]
    console.log('toonOne, toonTwo', toonOne, toonTwo)

    // ! check for null toons (inactive has already been filtered)
    if (!toonOne || !toonTwo) {
        console.log('null value for toon!')
        return swapSlotsChange
    }
    // ! ALL CLEAR make the swap
    // Perform the swap
    [swapSlotsChange[firstSwapToonIndex], swapSlotsChange[secondSwapToonIndex]] = [toonTwo, toonOne];
    console.log('after swap change', swapSlotsChange)

    // ! mark ability as used
    ability.beenUsed = true

    return swapSlotsChange
}

function cloneCardAbility(boardSlots, ability, abilityOriginIndex) {
    console.log('ability is CLONE', abilityOriginIndex)
    // identify target / location
    
    const cloneSlotsChange = [...boardSlots]

    const pasteLocationIndex = locationTree[ability.targetLocation][abilityOriginIndex]
    // console.log('pasteLocationIndex', pasteLocationIndex)
    const copyCardLocation = locationTree[ability.copyTargetLocation][abilityOriginIndex]
    // console.log('copyCardLocation', copyCardLocation)

    const cardToCopy = cloneSlotsChange[copyCardLocation]
    if (!cardToCopy) {
        console.log('no card to copy - null')
        return cloneSlotsChange
    }

    const newCloneCard = {
        ...cloneSlotsChange[pasteLocationIndex],
        // character: cardToCopy.character, do I want to copy the character?
        color: cardToCopy.color,
        points: cardToCopy.points,
        groups: cardToCopy.groups,
        abilities: cardToCopy.abilities,
    }

    // replace card
    cloneSlotsChange[pasteLocationIndex] = newCloneCard
    console.log('CLONE - board slots', cloneSlotsChange)

    // todo do I need to set the ability to false if the toon is morphed?? 
    return cloneSlotsChange
}

function negateCardAbility(boardSlots, ability, abilityOriginIndex) {
    console.log('negating a card ability', abilityOriginIndex)

    const negateAbilityChange = [...boardSlots]
    // find target of ability
    console.log('targetLocation', ability.negateTargetLocation)
    const negateLocation = locationTree[ability.negateTargetLocation][abilityOriginIndex]
    // negate the abilities
    const negateToon = negateAbilityChange[negateLocation]
    console.log('negateToon', negateToon)

    // still need to negate abilities...
    // but even negated... the swap toon ability is already in line to activate...
    // thinking i'm going to need to run through them one at a time somehow? 
    // if some abilities trigger others or some stop others, they cant be queued... 

    return negateAbilityChange
}


const boardChangingTree = {
    'SWAP': swapCardAbility,
    'CLONE': cloneCardAbility,
    'NEGATE': negateCardAbility,
    // more abilities here
}



export default function swapTheBoard(boardSlots) {
    // console.log('affecting the board', boardSlots)


    const activeToons = boardSlots.filter((toon) => toon?.active === true ?? false)
    // console.log('activeToons', activeToons)
    const toonAbilities = activeToons.map((toon) => toon.abilities).flat()
    // console.log('toonAbilities', toonAbilities)
    const allBoardAbilities = toonAbilities.filter((ability) => ability.abilityType === 'BOARD').reverse() // include used/unused abilities here? 
    console.log('allBoardAbilities', allBoardAbilities) // reversed so order is from most recent

    let newBoardSlots = [...boardSlots]

    allBoardAbilities.forEach((ability) => {
        console.log('FOR EACH', ability.ability)

        if (ability.beenUsed) return

        const abilityOriginIndex = newBoardSlots.map((toon) => toon?.character ?? []).indexOf(ability.abilityOrigin)
        const abilityFunction = boardChangingTree[ability.boardSet]

        if (abilityFunction) {
            const adjustedBoardSlots = abilityFunction(newBoardSlots, ability, abilityOriginIndex)
            console.log('setting new board slots-', adjustedBoardSlots)
            newBoardSlots = adjustedBoardSlots
        } 
        else {
            console.log('no ability function identified')
        }
    })

    // needs to return the array of board slots for scoring
    return newBoardSlots
}
