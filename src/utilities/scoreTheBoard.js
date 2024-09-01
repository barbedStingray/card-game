
import locationTree from './locationTree.js'



const animalBucket = ['Bug', 'Dog', 'Lion', 'Bear', 'Gorilla', 'Meerekat', 'Warthog', 'Monkey']
const royaltyBucket = ['King', 'Queen', 'Prince', 'Princess']
const bucketTree = {
    'Animal': animalBucket,
    'Royalty': royaltyBucket,
}

export default function scoreTheBoard(boardSlots) {
    console.log('scoring Board', boardSlots)
    const activeInPlayBoardSlots = boardSlots.map((slot) => (slot?.active ?? false) ? slot : null)
    console.log('activeInPlayBoardSlots', activeInPlayBoardSlots)

    
    const allScoringAbilities = activeInPlayBoardSlots.map((toon) => toon?.abilities ?? []).flat()
        .filter((ability) => ability.abilityType === 'SCORE')
    console.log('allScoringAbilities', allScoringAbilities)

    // ! INITIAL go over each dToon one by one // I want an array of points
    const boardTotal = activeInPlayBoardSlots.map((dToon, index) => {
        // console.log(`SCORING dToon... ${dToon.character}`, dToon)
        const dToonIndex = index

        // ! loop through each ability in play (this is inside each dToon)
        const additionalPoints = allScoringAbilities.reduce((abilityTotal, ability) => {
            // console.log('looping through Abilities:', ability.ability)

            // ! Check if dToon is inside target location
            const { targetLocation, abilityOrigin } = ability
            const abilityOriginIndex = activeInPlayBoardSlots.map((toon) => toon?.character ?? null).indexOf(abilityOrigin)
            const isTargetInLocation = locationTree[targetLocation][abilityOriginIndex].includes(dToonIndex)

            if (!isTargetInLocation) {
                // console.log(dToon.character, 'is not in Target Location', ability.ability)
                return abilityTotal
            }

            // ! check if dToon meets target satisfaction (target conditions)
            const { targets, targetMatch } = ability
            const targetCategories = Object.keys(targets)

            const isTargetSatisfied = targetCategories.length === 0 || targetCategories[targetMatch]((category) => {

                if (!dToon) return false
                const targetValues = bucketTree[targets[category]] || targets[category]
                const dToonCategoryValues = Array.isArray(dToon[category]) ? dToon[category] : [dToon[category]]
                // console.log('targetValues', targetValues)
                // console.log('dToonCategory', dToonCategoryValues)
                return dToonCategoryValues.some((toonValue) => targetValues.includes(toonValue))
            })
            // console.log('isTarget satisfied?', isTargetSatisfied)

            if (!isTargetSatisfied) {
                // console.log(dToon.character, 'is not a target of', ability.ability)
                return abilityTotal
            }

            // ! check if the ability conditions are met
            const { conditions, conditionLocation, conditionMatch } = ability

            const identifyConditionIndices = locationTree[conditionLocation]?.[abilityOriginIndex]
            // console.log('identifyConditionIndices', identifyConditionIndices)

            const isConditionSatisfiedBySameCard = identifyConditionIndices.map((position) => {
                const categories = Object.keys(conditions)
                // console.log('position', position, 'total categories:', categories)

                // ! if position is null ??? Will you need to return that? 
                return categories[conditionMatch]((conditionCategory) => {
                    const conditionValues = bucketTree[conditions[conditionCategory]] || conditions[conditionCategory]
                    const characterAtt = activeInPlayBoardSlots[position]?.[conditionCategory]
                    const characterAttributes = Array.isArray(characterAtt) ? characterAtt : [characterAtt]
                    // console.log('conditionValues', conditionValues)
                    // console.log('characterAttributes', characterAttributes)
                    const isConditionTrue = characterAttributes.some((attribute) => {
                        return conditionValues.includes(attribute)
                    })
                    // console.log('isConditionTrue', isConditionTrue)
                    return isConditionTrue
                })
            })

            // console.log('isConditionSatisfiedBySameCard', isConditionSatisfiedBySameCard)
            const countSatisfaction = isConditionSatisfiedBySameCard.filter(Boolean).length
            // console.log('countSatisfaction', countSatisfaction)
            const isConditionSatisfied = countSatisfaction > 0
            // console.log('isConditionSatisfied', isConditionSatisfied)

            if (!isConditionSatisfied) {
                // console.log(ability.ability, 'condition not met')
                return abilityTotal
            }

            // ! Checks all passed, apply bonus
            const { oneShot, bonus } = ability
            const isMultiplier = bonus.split('').some((letter) => letter === 'x')
            const newBonus = isMultiplier ? dToon.points * Number(bonus[0]) : Number(bonus)
            return (oneShot ? newBonus : newBonus * countSatisfaction) + abilityTotal
        }, 0)

        // console.log(`${dToon.character} addtionalPoints`, additionalPoints)
        console.log(`${dToonIndex}-${dToon?.character ?? null} pointValue: ${dToon?.points ?? null} extra: ${additionalPoints}`)
        return (dToon?.points ?? 0) + additionalPoints
    })
    return boardTotal
}


