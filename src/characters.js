const dToons = [
    {
        id: 0,
        character: 'Elsa',
        color: 'Blue',
        points: 9,
        abilities: [
            {
                ability: '+2 for each White Kristoff in play',
                target: ['Elsa'], // card receiving the bonus
                targetCategory: ['character'], // category matching how the bonus is received

                condition: ['White'], // conditions met to activate the bonus
                conditionCategory: ['color'], // category for the condition - do I need this? 
                locationCondition: ['INPLAY'], // location to check for conditions

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
        abilities: [
            {
                ability: '+1 for any Kristoff in play',
                target: ['Anna'], // card receiving the bonus
                targetCategory: ['character'], // category matching how the bonus is received

                condition: ['Kristoff'], // conditions met to activate the bonus
                conditionCategory: ['character'], // category for the condition - do I need this? 
                locationCondition: ['INPLAY'], // location to check for conditions

                abilityOrigin: 'Anna', // location of the ability - determines neighbors / locations... 
                oneShot: true, // how many times the bonus should be applied
                bonus: 1,
            },
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 2,
        character: 'Olaf',
        color: 'Silver',
        points: 3,
        abilities: [
            // {
            //     ability: 'No Ability',
            //     target: null,
            //     targetCategory: null,
            //     condition: null,
            //     conditionCategory: null,
            //     conditionLocation: null,
            //     locationOrigin: null
            //     bonus: null,
            // },
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 3,
        character: 'Kristoff',
        color: 'White',
        points: 5,
        abilities: [
            // {
            //     ability: '+5 if next to any Pink card',
            //     target: 'Kristoff',
            //     targetCategory: 'Character',
            //     condition: 'Pink',
            //     conditionCategory: 'color',
            //     conditionLocation: 'NEIGHBOR',
            //     bonus: 5,
            // },
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