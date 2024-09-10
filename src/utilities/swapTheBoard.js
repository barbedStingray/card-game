
import locationTree from './locationTree.js'
import assessTargetLocation from './checkpoints/assessTargetLocation.js'
import assessTargetConditions from './checkpoints/assessTargetConditions.js'
import assessAbilityConditions from './checkpoints/assessAbilityConditions.js'

function swapCardAbility(boardSlots, ability, abilityOriginIndex) {
    console.log('ability is swap', abilityOriginIndex)

    const swapSlotsChange = [...boardSlots]

    // ! check to see if ability is active
    if (!ability.abilityInPlay) {
        console.log('ability is not active')
        return swapSlotsChange
    }

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

function silenceCardAbility(boardSlots, ability) {
    console.log('silencing a card ability ability-', ability.ability)


    // map over each toon and see if the abilitie applies to that toon, exactly like in scoring...
    const silencedBoardSlots = boardSlots.map((toon, index) => {
        // console.log('index', index)

        if (!toon) {
            // console.log('no Toon here')
            return null
        }

        // ! check if dToon is in target Location
        const isTargetInLocation = assessTargetLocation(ability, boardSlots, index)
        // console.log('isTargetInLocation', isTargetInLocation)
        if (!isTargetInLocation) {
            // console.log('Potential Target is NOT in Location', ability.ability)
            return toon
        }

        // ! check if dToon meets target satisfaction (target conditions)
        const isTargetSatisfied = assessTargetConditions(ability, toon)
        // console.log('isTargetSatisfied?', isTargetSatisfied)
        if (!isTargetSatisfied) {
            // console.log(toon.character, 'is not a target of', ability.ability)
            return toon
        }

        // ! check if the ability conditions are met
        const countSatisfaction = assessAbilityConditions(ability, boardSlots)
        // console.log('countSatisfaction', countSatisfaction)
        if (countSatisfaction === 0) {
            // console.log(ability.ability, 'condition not met')
            return toon
        }

        // apply whatever to toon based on something? 

        // silence
        const updatedAbilities = toon.abilities.map((ability) => {
            return {
                ...ability,
                abilityInPlay: false
            }
        })
        // console.log('updatedAbilities', updatedAbilities)

        const silencedToon = {
            ...toon,
            abilities: updatedAbilities
        }
        // console.log('silencedToon', silencedToon)

        return silencedToon
    })
    // console.log('silencedBoardSlots', silencedBoardSlots)

    return silencedBoardSlots
}



const boardChangingTree = { // hierarchy

    'SILENCE': silenceCardAbility,

    'SWAP': swapCardAbility,
    'CLONE': cloneCardAbility,
    // more abilities here
}



export default function swapTheBoard(boardSlots) {
    console.log('swapTheBoard-', boardSlots)

    const activeToons = boardSlots.filter((toon) => toon?.active === true ?? false)
    // console.log('activeToons', activeToons)
    const toonAbilities = activeToons.map((toon) => toon.abilities).flat()
    // console.log('toonAbilities', toonAbilities)

    // ! This is the initial list of active toon BOARD abilities...
    const allActiveBoardAbilities = toonAbilities.filter((ability) => ability.abilityType !== 'SCORE').reverse() // include used/unused abilities here? 
    // console.log('allActiveBoardAbilities', allActiveBoardAbilities) // reversed so order is from most recent

    // update protect...

    // update silence...
    // filter abilities for those that are silencing...
    const allActiveSilenceAbilities = allActiveBoardAbilities.filter((ability) => ability.abilityType === 'SILENCE')
    // console.log('allActiveSilenceAbilities', allActiveSilenceAbilities)


    let silencedCardsBoardSlots = [...boardSlots]
    allActiveSilenceAbilities.forEach((ability) => {
        // console.log('silenceAbility', ability)
        silencedCardsBoardSlots = silenceCardAbility(silencedCardsBoardSlots, ability)
    })
    console.log('silencedCards OLD n BUSTED', silencedCardsBoardSlots)




    // others...


    let finalSwapBoardSlots = [...silencedCardsBoardSlots]


    // evaluate one at a time. Then Re-evaluate the board? 


    // this has to change so that each ability is played, then a new set of abilities is generated...
    allActiveBoardAbilities.forEach((ability) => {
        // console.log('FOR EACH', ability.ability)

        if (ability.beenUsed) return

        const abilityOriginIndex = finalSwapBoardSlots.map((toon) => toon?.character ?? []).indexOf(ability.abilityOrigin)
        const abilityFunction = boardChangingTree[ability.abilityType]

        if (abilityFunction) {
            finalSwapBoardSlots = abilityFunction(finalSwapBoardSlots, ability, abilityOriginIndex)
            // console.log('setting new board slots-', finalSwapBoardSlots)
        }
        else {
            // console.log('no ability function identified')
        }
    })

    // needs to return the array of board slots for scoring
    return finalSwapBoardSlots
}
