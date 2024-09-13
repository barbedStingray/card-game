

const abilityOne =
{
    ability: '+X for each COLOR card in play',
    abilityType: 'SCORE',
    abilityOrigin: 'Scuttle', // origin position of the ability - determines neighbors / locations... 

    targets: { // not every target needs a condition. Targets are free.
        character: ['Scuttle'],
    },
    targetMatch: 'every', // every and some
    targetLocation: 'SELF',

    conditions: { // represents both conditionCategories and conditions // Every card HAS to have a condition. no free points.
        color: ['Black'], // bucket keyword matches the characteristic of the dToon... Royalty => Group : Animal => Kind
    },
    conditionMatch: 'every', // or some // this means it can match some of the conditionCategories, or ALL
    conditionLocation: 'INPLAY', // location check for conditions - Does this need to be an array?

    oneShot: false, // how many times the bonus should be applied
    bonus: '3', // 1x doubles... 2x triples... 
}

const abilityTwo =
{
    ability: 'Silences opposing Card',
    abilityType: 'SILENCE',
    abilityOrigin: 'Captain Hook',

    targets: {
        // no conditional target, just the opposite card
    },
    targetMatch: 'every',
    targetLocation: 'OPPOSITE',

    // self triggered...
    conditions: {
        character: ['Captain Hook'],
    },
    conditionMatch: 'every',
    conditionLocation: 'SELF',

    // oneShot: false,  ????
    // bonus: '3',

}

const abilityThree =
{
    ability: 'Protects neighboring cards',
    abilityOrigin: 'Magic Carpet',
    abilityType: 'PROTECT', // boardSet could be combined into this... abilityType !== 'SCORE'

    targets: {
        // no condition for target, just neighbors
    },
    targetMatch: 'every',
    targetLocation: 'NEIGHBOR',

    // self triggered by being played...
    conditions: { 
        character: ['Magic Carpet'], 
    },
    conditionMatch: 'every', 
    conditionLocation: 'SELF', 

    // oneShot: false,  ????
    // bonus: '3',
}



