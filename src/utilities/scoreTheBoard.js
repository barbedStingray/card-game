
import locationTree from './locationTree.js'
import assessTargetLocation from './checkpoints/assessTargetLocation.js'
import assessTargetConditions from './checkpoints/assessTargetConditions.js'
import assessAbilityConditions from './checkpoints/assessAbilityConditions.js'

// own imports for buckets and lists...
const animalBucket = ['Bug', 'Dog', 'Lion', 'Bear', 'Gorilla', 'Meerekat', 'Warthog', 'Monkey']
const royaltyBucket = ['King', 'Queen', 'Prince', 'Princess']
const bucketTree = {
    'Animal': animalBucket,
    'Royalty': royaltyBucket,
}


// Ideas for further scoring updates...
// todo gain points for having the most / least points? 


export default function scoreTheBoard(boardSlots) {
    // console.log('scoring Board', boardSlots)
    const activeInPlayBoardSlots = boardSlots.map((slot) => (slot?.isActive ?? false) ? slot : null)
    // console.log('activeInPlayBoardSlots', activeInPlayBoardSlots)


    const allScoringAbilities = activeInPlayBoardSlots.map((toon) => toon?.abilities ?? []).flat()
        .filter((ability) => ability.abilityType === 'SCORE' && ability.abilityInPlay === true) // make sure it hasent been silenced
    // console.log('allScoringAbilities', allScoringAbilities)

    // ! INITIAL go over each dToon one by one // I want an array of toons with adjusted points
    const adjustedBoardToons = activeInPlayBoardSlots.map((dToon, index) => {
        // console.log(`SCORING dToon... ${dToon.character}`, dToon)
        if (!dToon) return null
        const dToonIndex = index

        // ! loop through each ability in play (this is inside each dToon)
        const additionalPoints = allScoringAbilities.reduce((abilityTotal, ability) => {
            // console.log('looping through Abilities:', ability.ability)

            // ! Check if dToon is inside target location
            const isTargetInLocation = assessTargetLocation(ability, activeInPlayBoardSlots, dToonIndex)
            if (!isTargetInLocation) {
                // console.log(dToon.character, 'is not in Target Location', ability.ability)
                return abilityTotal
            }

            // ! check if dToon meets target satisfaction (target conditions)
            const isTargetSatisfied = assessTargetConditions(ability, dToon)
            // console.log('isTargetSatisfied?', isTargetSatisfied)
            if (!isTargetSatisfied) {
                // console.log(dToon.character, 'is not a target of', ability.ability)
                return abilityTotal
            }


            // ! check if the ability conditions are met
            const countSatisfaction = assessAbilityConditions(ability, activeInPlayBoardSlots)
            // console.log('countSatisfaction', countSatisfaction)

            if (countSatisfaction === 0) { // or less than??
                // console.log(ability.ability, 'condition not met')
                return abilityTotal
            }

            // ! Checks all passed, apply bonus
            const { oneShot, bonus } = ability
            const isMultiplier = bonus.split('').some((letter) => letter === 'x')
            const newBonus = isMultiplier ? dToon.points * Number(bonus[0]) : Number(bonus)
            return (oneShot ? newBonus : newBonus * countSatisfaction) + abilityTotal
        }, 0)

        dToon.bonusPoints = additionalPoints
        console.log(`${dToonIndex}-${dToon?.character ?? null} pointValue: ${dToon?.points ?? null} extra: ${dToon.bonusPoints}`)
        return dToon
    })

    console.log('adjustedBoardToons', adjustedBoardToons)
    return adjustedBoardToons
}
