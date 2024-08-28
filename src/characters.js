// RULE - A card may not have an ability that immediately rewards itself upon playing...
// ex: Elsa, Blue - +3 to each Blue card in play...

// ? cant write an ability that targets the same attribute twice ?
// two groups that equate to EVERY might be tough...? 

const dToons = [
    {
        id: 0,
        character: 'Elsa',
        color: 'Silver',
        points: 3,
        groups: [],
        abilities: [
            {
                ability: '-5 to opposing black card',
                // todo will probably need a type to split board scoring vs board rearranging...
                abilityOrigin: 'Elsa', // origin position of the ability - determines neighbors / locations... 
                
                targets: { // not every target needs a condition. Targets are free.
                    color: ['Black'],
                },
                targetMatch: 'every',
                targetLocation: 'OPPOSITE',
                
                conditions: { // represents both conditionCategories and conditions // Every card HAS to have a condition. no free points.
                    color: ['Black'], // bucket keyword matches the characteristic of the dToon... Royalty => Group : Animal => Kind
                },
                conditionMatch: 'every', // or every // this means it can match some of the conditionCategories, or ALL
                conditionLocation: 'OPPOSITE', // location check for conditions - Does this need to be an array?

                oneShot: true, // how many times the bonus should be applied
                bonus: '-5', // 1x doubles... 2x triples... 
            },
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 1,
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
        character: 'Anna',
        color: 'Blue',
        points: 8,
        groups: ['Pirate', 'Animal', 'Queen'],
        abilities: [
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 3,
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
        character: 'Olaf',
        color: 'Silver',
        points: 4,
        groups: [],
        abilities: [
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 5,
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
        character: 'Gaston',
        color: 'Black',
        points: 10,
        groups: [],
        abilities: [
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
]


module.exports = dToons