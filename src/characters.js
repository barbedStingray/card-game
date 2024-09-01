// RULE - A card may not have an ability that immediately rewards itself upon playing...
// ex: Elsa, Blue - +3 to each Blue card in play...

// ? cant write an ability that targets the same attribute twice ?
// two groups that equate to EVERY might be tough...? 

const dToons = [
    {
        id: 0,
        active: true,
        character: 'Elsa',
        color: 'Silver',
        points: 3,
        groups: [],
        abilities: [
            {
                ability: '+3 for each Opponent Black Card',
                abilityType: 'SCORE',
                abilityOrigin: 'Elsa', // origin position of the ability - determines neighbors / locations... 
                
                targets: { // not every target needs a condition. Targets are free.
                    character: ['Elsa'],
                },
                targetMatch: 'every',
                targetLocation: 'SELF',
                
                conditions: { // represents both conditionCategories and conditions // Every card HAS to have a condition. no free points.
                    color: ['Black'], // bucket keyword matches the characteristic of the dToon... Royalty => Group : Animal => Kind
                },
                conditionMatch: 'every', // or every // this means it can match some of the conditionCategories, or ALL
                conditionLocation: 'OPPONENT', // location check for conditions - Does this need to be an array?

                oneShot: false, // how many times the bonus should be applied
                bonus: '3', // 1x doubles... 2x triples... 
            },
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 1,
        active: true,
        character: 'Maleficent',
        color: 'Black',
        points: 10,
        groups: [],
        abilities: [
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 2,
        active: true,
        character: 'Anna', // null
        color: 'Blue',
        points: 8,
        groups: ['Pirate', 'Animal', 'Queen'],
        abilities: [
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 3,
        active: true,
        character: 'Jafar',
        color: 'Black',
        points: 10,
        groups: [],
        abilities: [
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 4,
        active: true,
        character: 'Olaf',
        color: 'Silver',
        points: 4,
        groups: [],
        abilities: [
            {
                ability: 'Swap Places with the opposing card',
                abilityType: 'BOARD',
                abilityOrigin: 'Olaf', 
                
                boardSet: 'SWAP',
                beenUsed: false,

                targets: {
                    character: ['Olaf'],
                },
                // targetMatch: 'every',
                targetLocation: 'SELF',

                swapTarget: {
                    // if condition exists...
                },
                // swapTargetMatch: 'every',
                swapTargetLocation: 'OPPOSITE',

                // conditions: { 
                //     // character: ['Anna'], 
                // },
                // // conditionMatch: 'every',
                // conditionLocation: 'OPPOSITE',
            },
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 5,
        active: true,
        character: 'Ursula',
        color: 'Black',
        points: 10,
        groups: [],
        abilities: [
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 6,
        active: true,
        character: 'Kristoff',
        color: 'Blue',
        points: 5,
        groups: ['Music', 'Princess'],
        abilities: [
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 7,
        active: true,
        character: 'Gaston',
        color: 'Black',
        points: 10,
        groups: [],
        abilities: [
            {
                ability: '+10 if this card is played last',
                abilityType: 'SCORE',
                abilityOrigin: 'Gaston', // origin position of the ability - determines neighbors / locations... 
                
                targets: { // not every target needs a condition. Targets are free.
                    character: ['Gaston'],
                },
                targetMatch: 'every',
                targetLocation: 'SELF',
                
                conditions: { // represents both conditionCategories and conditions // Every card HAS to have a condition. no free points.
                    character: ['Gaston'], // bucket keyword matches the characteristic of the dToon... Royalty => Group : Animal => Kind
                },
                conditionMatch: 'every', // or every // this means it can match some of the conditionCategories, or ALL
                conditionLocation: 'LAST', // location check for conditions - Does this need to be an array?

                oneShot: true, // how many times the bonus should be applied
                bonus: '10', // 1x doubles... 2x triples... 
            },

        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
]


module.exports = dToons