const dToons = [
    {
        id: 0,
        character: 'Elsa',
        color: 'Blue',
        points: 9,
        abilities: [
            // {
            //     ability: '+2 if any White card in play',
            //     target: ['Elsa'],
            //     targetCategory: 'character',
            //     condition: 'White',
            //     conditionCategory: 'color',
            //     conditionLocation: 'INPLAY',
            //     bonus: 2,
            // },
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
                ability: '+1 for each Blue card in play',
                target: ['Anna'],
                targetCategory: 'character',
                condition: 'Blue',
                conditionCategory: 'color',
                conditionLocation: 'INPLAY',
                oneShot: false,
                bonus: 1,
            },
        ],
        displayImage: 'displayImage simpleImage gameImage',
    },
    {
        id: 2,
        character: 'Olaf',
        color: 'Blue',
        points: 3,
        abilities: [
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