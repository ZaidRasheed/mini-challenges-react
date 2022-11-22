import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

function generateHexColor(prev: string) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    //! make sure its a new string each time
    while (randomColor === prev) {
        randomColor = Math.floor(Math.random() * 16777215).toString(16);
    }
    return '#' + randomColor
}

export default function GuessTheColor() {

    const [rightColor, setRightColor] = useState<string>('')
    const [otherColors, setOtherColors] = useState<string[]>([])
    const [guess, setGuess] = useState<string>('')
    const [generate, setGenerate] = useState<boolean>(true)

    useEffect(() => {
        const rightOne = generateHexColor(rightColor)
        setRightColor(rightOne)

        //! shuffle the colors in the list
        let listOfColors = [rightOne, generateHexColor(''), generateHexColor('')].sort(() => 0.5 - Math.random())

        setOtherColors(listOfColors)
    }, [generate])

    const check = (color: string) => {
        if (color === rightColor)
            setGuess('Correct!')
        else
            setGuess('Wrong :(')
        setGenerate(prev => !prev)
    }

    return (
        <div className={styles.app}>
            <Link to='..'><button className={styles.back}>Back</button></Link>
            <h1>Guess The Color</h1>
            <div className={styles.color} style={{ backgroundColor: rightColor }}></div>
            <div className={styles.container}>
                {otherColors.map(color => {
                    return (
                        <button key={color} className={styles.option} onClick={() => check(color)}>{color}</button>
                    )
                })}
            </div>
            <h1 style={{ color: `${guess === 'Correct!' ? 'green' : 'red'}`, height: '50px' }}>{guess}</h1>
        </div>
    )
}
