
export default function identifyInactiveCards(boardSlots) {
    console.log('identifying inactive cards', boardSlots)
    const newBoardSlots = [...boardSlots]
    const duplicateCharacters = newBoardSlots.map((slot) => slot?.character ?? []).filter((character, i, arr) => arr.indexOf(character) !== i)
    newBoardSlots.forEach((slot) => {
      if (duplicateCharacters.includes(slot?.character ?? null)) {
        slot.active = false
      }
    })

    // console.log('The New Board Slots', newBoardSlots)
    return newBoardSlots
  }
