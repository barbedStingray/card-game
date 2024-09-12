
import locationTree from './locationTree.js'
import assessTargetLocation from './checkpoints/assessTargetLocation.js'
import assessTargetConditions from './checkpoints/assessTargetConditions.js'
import assessAbilityConditions from './checkpoints/assessAbilityConditions.js'



export default function swapTheBoard(boardSlots) {
    // console.log('swapTheBoard-', boardSlots)

    const activeToons = boardSlots.filter((toon) => toon?.active === true ?? false)
    // console.log('activeToons', activeToons)
    const toonAbilities = activeToons.map((toon) => toon.abilities).flat()
    // console.log('toonAbilities', toonAbilities)

    // ! This is the initial list of active toon non score abilities...
    const allActiveBoardAbilities = toonAbilities.filter((ability) => ability.abilityType !== 'SCORE') 
    // console.log('allActiveBoardAbilities', allActiveBoardAbilities) 


    // ! introducing card status effects... 
    // todo apply protect to a card status
    // todo when toon is removed, take protect off toons
    const allProtectAbilities = allActiveBoardAbilities.filter((ability) => ability.abilityType === 'PROTECT')
    // console.log('allProtectAbilities', allProtectAbilities) 




    // others...



    return boardSlots
}
