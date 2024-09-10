import locationTree from "../locationTree"


export default function assessTargetLocation(ability, boardSlots, dToonIndex) {
    // console.log('assessing for Target Location Match', ability.ability)
    // console.log('dToonIndex', dToonIndex)
    const { targetLocation, abilityOrigin } = ability
    
    const abilityOriginIndex = boardSlots.map((toon) => toon?.character ?? null).indexOf(abilityOrigin)
    // console.log('abilityOriginIndex', abilityOriginIndex)
    const isTargetInLocation = locationTree[targetLocation][abilityOriginIndex].includes(dToonIndex)
    
    return isTargetInLocation
}