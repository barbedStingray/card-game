// ! to include two locations in a card, just format the double location in the tree...

// todo one, two, three, and four player have different game boards? 

const locationTree = {
    'SELF': { 0: [0], 1: [1], 2: [2], 3: [3], 4: [4], 5: [5], 6: [6], 7: [7] },
    'INPLAY': {
        0: [1, 2, 3, 4, 5, 6, 7],
        1: [0, 2, 3, 4, 5, 6, 7],
        2: [0, 1, 3, 4, 5, 6, 7],
        3: [0, 1, 2, 4, 5, 6, 7],
        4: [0, 1, 2, 3, 5, 6, 7],
        5: [0, 1, 2, 3, 4, 6, 7],
        6: [0, 1, 2, 3, 4, 5, 7],
        7: [0, 1, 2, 3, 4, 5, 6]
    },
    'NEIGHBOR': { 0: [2], 1: [3], 2: [0, 4], 3: [1, 5], 4: [2, 6], 5: [3, 7], 6: [4], 7: [5] },
    'OPPOSITE': { 0: [1], 1: [0], 2: [3], 3: [2], 4: [5], 5: [4], 6: [7], 7: [6] },
    'OPPONENT' : {0: [1, 3, 5, 7], 1: [0, 2, 4, 6], 2: [1, 3, 5, 7], 3: [0, 2, 4, 6], 4: [1, 3, 5, 7], 5: [0, 2, 4, 6], 6: [1, 3, 5, 7], 7: [0, 2, 4, 6] },
    'LAST': { 0: [6], 1: [7], 2: [6], 3: [7], 4: [6], 5: [7], 6: [6], 7: [7],} // can also have first 
}

module.exports = locationTree