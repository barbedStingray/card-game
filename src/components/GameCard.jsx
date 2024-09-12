import React, { useState, useEffect } from 'react'


const GameCard = ({ slot }) => {

    const [valueChange, setValueChange] = useState(false)
    const toonPoints = slot?.points + slot?.bonusPoints
    const toonColor = slot?.color ? `var(--toon-color-${slot.color})` : 'transparent'

    function displayValueChange() {
        // console.log('VALUE CHANGE for', slot?.character)
        setValueChange(true)
        setTimeout(() => {
            setValueChange(false)
        }, 1000)
    }
    useEffect(() => {
        displayValueChange()
    }, [toonPoints])



    return (
        <div className="gameCard-container">
            {slot ? (
                <>
                    <div className='gameCard'>
                        <div className={`${slot.cardStatus.isSilenced ? 'silence' : 'not-silence'}`}></div>
                        <div className={`${slot.cardStatus.isProtected ? 'protect' : 'not-protect'}`}></div>
                        <div className={`${slot.isActive ? 'active' : 'inactive'}`}></div>
                        <div className='gameCard-imageMask' style={{ backgroundImage: `url(${slot.noToonImage})` }}></div>
                        <div className='gameCard-colorRing' style={{ background: toonColor }}></div>
                        <div className='gameCard-pointCircle'>
                            <p className={`toonScore ${valueChange ? 'pointBonus' : 'no-pointBonus'}`}>
                                {toonPoints}
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <p>No current Card</p>
            )}
        </div>
    )
}

export default GameCard
