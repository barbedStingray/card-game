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
                ability: '+3 if any Queen is in play',
                // todo will probably need a type to split board scoring vs board rearranging...
                abilityOrigin: 'Elsa', // origin position of the ability - determines neighbors / locations... 
                
                targets: {
                    character: ['Elsa'], // irrelevant when target is self...
                },
                targetMatch: 'every', // some-  can match some of the keys in target, or ALL
                targetLocation: 'SELF',
                
                conditions: { // represents both conditionCategories and conditions
                    groups: ['Queen'],
                },
                conditionMatch: 'every', // or every // this means it can match some of the conditionCategories, or ALL
                conditionLocation: 'INPLAY', // location check for conditions - Does this need to be an array?

                oneShot: true, // how many times the bonus should be applied
                bonus: 3,
            },
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 1,
        character: 'Anna',
        color: 'White',
        points: 8,
        groups: 'Queen',
        abilities: [
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 2,
        character: 'Olaf',
        color: 'Blue',
        points: 7,
        groups: [],
        abilities: [
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 3,
        character: 'Kristoff',
        color: 'Blue',
        points: 6,
        groups: [],
        abilities: [
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
]


module.exports = dToons