const dToons = [
    {
        id: 0,
        character: 'Elsa',
        color: 'Blue',
        points: 3,
        groups: ['Queen'],
        abilities: [
            {
                ability: '+2 for each Pink or White card in play',
                target: ['Elsa'], // card receiving the bonus
                targetCategory: ['character'], // category matching how the bonus is received

                condition: [['Pink', 'White']], // conditions met to activate the bonus
                conditionCategory: ['color'], // category for the condition - do I need this? 
                locationCondition: ['INPLAY'], // location to check for conditions
                // NEW NEW NEW 
                matchType: 'some', // or every // this means it can match some of the conditionCategories, or ALL

                abilityOrigin: 'Elsa', // location of the ability - determines neighbors / locations... 
                oneShot: false, // how many times the bonus should be applied
                bonus: 2,
            },
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 1,
        character: 'Anna',
        color: 'Pink',
        points: 7,
        groups: [],
        abilities: [
            // {
            //     ability: '+1 if next to any Kristoff',
            //     target: ['Anna'], // card receiving the bonus
            //     targetCategory: ['character'], // category matching how the bonus is received

            //     condition: ['Kristoff'], // conditions met to activate the bonus
            //     conditionCategory: ['character'], // category for the condition - do I need this? 
            //     locationCondition: ['NEIGHBOR'], // location to check for conditions

            //     abilityOrigin: 'Anna', // location of the ability - determines neighbors / locations... 
            //     oneShot: true, // how many times the bonus should be applied
            //     bonus: 1,
            // },
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 2,
        character: 'Olaf',
        color: 'Blue',
        points: 3,
        groups: [],
        abilities: [
            // {
            //     ability: '+5 if any Black card is in play',
            //     target: ['Olaf'], // card receiving the bonus
            //     targetCategory: ['character'], // category matching how the bonus is received

            //     condition: ['Black'], // conditions met to activate the bonus
            //     conditionCategory: ['color'], // category for the condition - do I need this? 
            //     locationCondition: ['INPLAY'], // location to check for conditions

            //     abilityOrigin: 'Olaf', // location of the ability - determines neighbors / locations... 
            //     oneShot: true, // how many times the bonus should be applied
            //     bonus: 5,
            // },
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 3,
        character: 'Kristoff',
        color: 'White',
        points: 5,
        groups: [],
        abilities: [
            {
                ability: '+3 if any Blue 3 is in play',
                target: ['Kristoff'], // card receiving the bonus
                targetCategory: ['character'], // category matching how the bonus is received

                condition: ['Blue', 3], // conditions met to activate the bonus
                conditionCategory: ['color', 'points'], // category for the condition - do I need this? 
                locationCondition: ['INPLAY'], // location to check for conditions

                abilityOrigin: 'Kristoff', // location of the ability - determines neighbors / locations... 
                oneShot: false, // how many times the bonus should be applied
                bonus: 3,
            },
            // {
            //     ability: 'No Ability',
            //     target: null,
            //     targetCategory: null,
            //     condition: null,
            //     conditionCategory: null,
            //     conditionLocation: null,
            //     bonus: null,
            // },
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
]


module.exports = dToons