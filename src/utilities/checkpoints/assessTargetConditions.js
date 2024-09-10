import locationTree from "../locationTree"

// own imports for buckets and lists...
const animalBucket = ['Bug', 'Dog', 'Lion', 'Bear', 'Gorilla', 'Meerekat', 'Warthog', 'Monkey']
const royaltyBucket = ['King', 'Queen', 'Prince', 'Princess']
const bucketTree = {
    'Animal': animalBucket,
    'Royalty': royaltyBucket,
}


export default function assessTargetConditions(ability, dToon) {
    console.log('assessing target conditions', dToon.character, ability.ability)
    const { targets, targetMatch } = ability
    const targetCategories = Object.keys(targets)

    const isTargetSatisfied = targetCategories.length === 0 || targetCategories[targetMatch]((category) => {

        if (!dToon) {
            console.log('no dToon in conditions')
            return false
        }
        const targetValues = bucketTree[targets[category]] || targets[category]
        const dToonCategoryValues = Array.isArray(dToon[category]) ? dToon[category] : [dToon[category]]
        // console.log('targetValues', targetValues)
        // console.log('dToonCategory', dToonCategoryValues)
        return dToonCategoryValues.some((toonValue) => targetValues.includes(toonValue))
    })


    return isTargetSatisfied
}