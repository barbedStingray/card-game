// RULE - A card may not have an ability that immediately rewards itself upon playing...
// ex: Elsa, Blue - +3 to each Blue card in play...

// ? cant write an ability that targets the same attribute twice ?
// two groups that equate to EVERY might be tough...? 

const dToons = [
    {
        id: 10,
        isActive: true,
        cardStatus: {},
        //     isProtected: false,
        //     // other status effects here
        // },
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
        noToonImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725469394/dToons/theLittleMermaid/Scuttle/scuttle_simpleImage.png',
        abilities: [
            {
                ability: '+3 for each Black card in play',
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
            },
        ],
    },
    {
        id: 11,
        isActive: true,
        cardStatus: {},
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
        noToonImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725467792/dToons/PeterPan/CaptainHook/captainHook_simpleImage.png',
        abilities: [
            {
                ability: 'Silences opposing Card from Hook',
                abilityType: 'SILENCE', // boardSet could be combined into this... abilityType !== 'SCORE'
                abilityOrigin: 'Captain Hook', 

                // beenUsed: false, // this is not a one shot ability...
                targets: { // not every target needs a condition. Targets are free.
                    // color: 'Orange'
                },
                targetMatch: 'every',
                targetLocation: 'OPPOSITE',

                // condition can be SELF if it triggers by being played...
                conditions: { // represents both conditionCategories and conditions // Every card HAS to have a condition. no free points.
                    character: ['Captain Hook'], // bucket keyword matches the characteristic of the dToon... Royalty => Group : Animal => Kind
                },
                conditionMatch: 'every', // or every // this means it can match some of the conditionCategories, or ALL
                conditionLocation: 'SELF', // location check for conditions - Does this need to be an array?
            },
        ],
    },
    {
        id: 4,
        isActive: true,
        cardStatus: {},
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
        noToonImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725469612/dToons/Aladdin/MagicCarpet/magicCarpet_simpleImage.png',
        abilities: [
            {
                ability: 'Protects neighboring cards',
                abilityOrigin: 'Magic Carpet',
                abilityType: 'PROTECT', // boardSet could be combined into this... abilityType !== 'SCORE'
                // abilityUsed: false,

                targets: { // not every target needs a condition. Targets are free.
                    // color: 'Pink'
                },
                targetMatch: 'every',
                targetLocation: 'NEIGHBOR',

                // self triggered by being played...
                conditions: { // represents both conditionCategories and conditions // Every card HAS to have a condition. no free points.
                    character: ['Magic Carpet'], // bucket keyword matches the characteristic of the dToon... Royalty => Group : Animal => Kind
                },
                conditionMatch: 'every', // or every // this means it can match some of the conditionCategories, or ALL
                conditionLocation: 'SELF', // location check for conditions - Does this need to be an array?
            },
        ],
    },
    {
        id: 5,
        isActive: true,
        cardStatus: {},
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
        noToonImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725468189/dToons/theLittleMermaid/Ursula/ursula_simpleImage.png',
        abilities: [
            {
                ability: 'Silences opposing Card from Ursula',
                abilityType: 'SILENCE', // boardSet could be combined into this... abilityType !== 'SCORE'
                abilityOrigin: 'Ursula', 

                // beenUsed: false, // this is not a one shot ability...
                targets: { // not every target needs a condition. Targets are free.
                    // color: 'Orange'
                },
                targetMatch: 'every',
                targetLocation: 'OPPOSITE',

                // condition can be SELF if it triggers by being played...
                conditions: { // represents both conditionCategories and conditions // Every card HAS to have a condition. no free points.
                    character: ['Ursula'], // bucket keyword matches the characteristic of the dToon... Royalty => Group : Animal => Kind
                },
                conditionMatch: 'every', // or every // this means it can match some of the conditionCategories, or ALL
                conditionLocation: 'SELF', // location check for conditions - Does this need to be an array?
            },
        ],
    },
    {
        id: 12,
        isActive: true,
        cardStatus: {},
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
        noToonImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725469443/dToons/SnowWhite/SnowWhite/snowWhite_simpleImage.png',
        abilities: [],
    },
    {
        id: 3,
        isActive: true,
        cardStatus: {},
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
        noToonImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725468189/dToons/Aladdin/Jafar/jafar_simpleImage.png',
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
        id: 6,
        isActive: true,
        cardStatus: {},
        cardTitle: 'What about the Monkeys?',
        character: 'Jane Porter',
        color: 'White',
        points: 6,
        bonusPoints: 0,
        kind: 'Human',
        gender: 'Female',
        role: null,
        groups: ['Explorer', 'Scientist'],
        rarity: 'Common',
        movie: 'Tarzan',
        noToonImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725469887/dToons/Tarzan/JanePorter/janePorter_simpleImage.png',
        abilities: [],
    },
    {
        id: 7,
        isActive: true,
        cardStatus: {},
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
        noToonImage: 'https://res.cloudinary.com/dzh1qe1zp/image/upload/v1725467968/dToons/theEmperorsNewGroove/Yzma/yzma_simpleImage.png',
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