import locationTree from "../locationTree"


// own imports for buckets and lists...
const animalBucket = ['Bug', 'Dog', 'Lion', 'Bear', 'Gorilla', 'Meerekat', 'Warthog', 'Monkey']
const royaltyBucket = ['King', 'Queen', 'Prince', 'Princess']
const bucketTree = {
    'Animal': animalBucket,
    'Royalty': royaltyBucket,
}


export default function assessAbilityConditions(ability, boardSlots) {
    // console.log('assessing ability conditions', ability.ability)

    const { conditions, conditionLocation, conditionMatch, abilityOrigin } = ability
    const abilityOriginIndex = boardSlots.map((toon) => toon?.character ?? null).indexOf(abilityOrigin)

    const identifyConditionIndices = locationTree[conditionLocation]?.[abilityOriginIndex]
    // console.log('identifyConditionIndices', identifyConditionIndices)

    const isConditionSatisfiedBySameCard = identifyConditionIndices.map((position) => {
        const categories = Object.keys(conditions)
        // console.log('position', position, 'total categories:', categories)

        // ! if position is null ??? Will you need to return that? 
        return categories[conditionMatch]((conditionCategory) => {
            const conditionValues = bucketTree[conditions[conditionCategory]] || conditions[conditionCategory]
            const characterAtt = boardSlots[position]?.[conditionCategory]
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

    const countSatisfaction = isConditionSatisfiedBySameCard.filter(Boolean).length
    // const isConditionSatisfied = countSatisfaction > 0
    // console.log('isConditionSatisfied', isConditionSatisfied)
    return countSatisfaction

}