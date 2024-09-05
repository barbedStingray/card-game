// RULE - A card may not have an ability that immediately rewards itself upon playing...
// ex: Elsa, Blue - +3 to each Blue card in play...

// ? cant write an ability that targets the same attribute twice ?
// two groups that equate to EVERY might be tough...? 

const dToons = [
    {
        id: 0,
        active: true,
        cardTitle: 'Scuttles Dinglehopper',
        character: 'Scuttle',
        color: 'Orange',
        points: 3,
        bonusPoints: 0,
        kind: 'Bird',
        gender: 'Male',
        role: 'Sidekick',
        groups: [],
        rarity: 'Mythic',
        movie: 'The Little Mermaid',
        displayImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725469394/dToons/theLittleMermaid/Scuttle/scuttle_simpleImage.png',
        abilities: [
            {
                ability: '+2 for each Black card in play',
                abilityType: 'SCORE',
                abilityOrigin: 'Scuttle', // origin position of the ability - determines neighbors / locations... 
                
                targets: { // not every target needs a condition. Targets are free.
                    character: ['Scuttle'],
                },
                targetMatch: 'every',
                targetLocation: 'SELF',
                
                conditions: { // represents both conditionCategories and conditions // Every card HAS to have a condition. no free points.
                    color: ['Black'], // bucket keyword matches the characteristic of the dToon... Royalty => Group : Animal => Kind
                },
                conditionMatch: 'every', // or every // this means it can match some of the conditionCategories, or ALL
                conditionLocation: 'INPLAY', // location check for conditions - Does this need to be an array?

                oneShot: false, // how many times the bonus should be applied
                bonus: '3', // 1x doubles... 2x triples... 
            },
        ],
    },
    {
        id: 1,
        active: true,
        cardTitle: 'Hooks Revenge',
        character: 'Captain Hook',
        color: 'Black',
        points: 10,
        bonusPoints: 0,
        kind: 'Human',
        gender: 'Male',
        role: 'Villain',
        groups: ['Pirate'],
        rarity: 'Rare',
        movie: 'Peter Pan',
        displayImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725467792/dToons/PeterPan/CaptainHook/captainHook_simpleImage.png',
        abilities: [],
    },
    {
        id: 2,
        active: true,
        cardTitle: 'Whistle While You Work',
        character: 'Snow White',
        color: 'Pink',
        points: 9,
        bonusPoints: 0,
        kind: 'Human',
        gender: 'Female',
        role: null,
        groups: ['Princess'],
        rarity: 'Rare',
        movie: 'Snow White',
        displayImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725469443/dToons/SnowWhite/SnowWhite/snowWhite_simpleImage.png',
        abilities: [],
    },
    {
        id: 3,
        active: true,
        cardTitle: 'Ultimate Cosmic Power',
        character: 'Jafar',
        color: 'Black',
        points: 4,
        bonusPoints: 0,
        kind: 'Geenie',
        gender: 'Male',
        role: 'Villain',
        groups: [],
        rarity: 'Rare',
        movie: 'Aladdin',
        displayImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725468189/dToons/Aladdin/Jafar/jafar_simpleImage.png',
        abilities: [
            {
                ability: '-5 to the Opposing card if Princess',
                abilityType: 'SCORE',
                abilityOrigin: 'Jafar', // origin position of the ability - determines neighbors / locations... 
                
                targets: { // not every target needs a condition. Targets are free.
                    // groups: ['Royalty'],
                },
                targetMatch: 'every',
                targetLocation: 'OPPOSITE',
                
                conditions: { // represents both conditionCategories and conditions // Every card HAS to have a condition. no free points.
                    groups: ['Princess'], // bucket keyword matches the characteristic of the dToon... Royalty => Group : Animal => Kind
                },
                conditionMatch: 'every', // or every // this means it can match some of the conditionCategories, or ALL
                conditionLocation: 'OPPOSITE', // location check for conditions - Does this need to be an array?

                oneShot: true, // how many times the bonus should be applied
                bonus: '-5', // 1x doubles... 2x triples... 
            },
        ],
    },
    {
        id: 4,
        active: true,
        cardTitle: 'Quick Escape',
        character: 'Magic Carpet',
        color: 'Yellow',
        points: 6,
        bonusPoints: 0,
        kind: 'Item',
        gender: 'Neutral',
        role: 'Sidekick',
        groups: [],
        rarity: 'Epic',
        movie: 'Aladdin',
        displayImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725469612/dToons/Aladdin/MagicCarpet/magicCarpet_simpleImage.png',
        abilities: [
            {
                ability: 'Swap Places with the opposing card',
                abilityType: 'BOARD',
                abilityOrigin: 'Magic Carpet', 
                
                boardSet: 'SWAP',
                beenUsed: false,

                targets: {
                    character: ['Magic Carpet'],
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
    },
    {
        id: 5,
        active: true,
        cardTitle: 'Poor Souls',
        character: 'Ursula',
        color: 'Black',
        points: 9,
        bonusPoints: 0,
        kind: 'Mermaid',
        gender: 'Female',
        role: 'Villain',
        groups: ['Witch'],
        rarity: 'Rare',
        movie: 'The Little Mermaid',
        displayImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725468189/dToons/theLittleMermaid/Ursula/ursula_simpleImage.png',
        abilities: [],
    },
    {
        id: 6,
        active: true,
        cardTitle: 'What about the Monkeys?',
        character: 'Jane Porter',
        color: 'White',
        points: 3,
        bonusPoints: 0,
        kind: 'Human',
        gender: 'Female',
        role: null,
        groups: ['Explorer', 'Scientist'],
        rarity: 'Common',
        movie: 'Tarzan',
        displayImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725469887/dToons/Tarzan/JanePorter/janePorter_simpleImage.png',
        abilities: [],
    },
    {
        id: 7,
        active: true,
        cardTitle: 'Saving a Spot',
        character: 'Yzma',
        color: 'Black',
        points: 7,
        bonusPoints: 0,
        kind: 'Human',
        gender: 'Female',
        role: 'Villain',
        groups: ['Scientist'],
        rarity: 'Rare',
        movie: 'The Emperors New Groove',
        displayImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725467968/dToons/theEmperorsNewGroove/Yzma/yzma_simpleImage.png',
        abilities: [
            {
                ability: '+5 if this card is played last',
                abilityType: 'SCORE',
                abilityOrigin: 'Yzma', // origin position of the ability - determines neighbors / locations... 
                
                targets: { // not every target needs a condition. Targets are free.
                    character: ['Yzma'],
                },
                targetMatch: 'every',
                targetLocation: 'SELF',
                
                conditions: { // represents both conditionCategories and conditions // Every card HAS to have a condition. no free points.
                    character: ['Yzma'], // bucket keyword matches the characteristic of the dToon... Royalty => Group : Animal => Kind
                },
                conditionMatch: 'every', // or every // this means it can match some of the conditionCategories, or ALL
                conditionLocation: 'LAST', // location check for conditions - Does this need to be an array?

                oneShot: true, // how many times the bonus should be applied
                bonus: '5', // 1x doubles... 2x triples... 
            },
        ],
    },
    
]


module.exports = dToons