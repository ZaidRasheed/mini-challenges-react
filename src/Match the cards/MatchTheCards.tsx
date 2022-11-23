import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import { v4 as uuidV4 } from 'uuid'
import { Link } from 'react-router-dom'


type CardProps = {
    card: {
        value: number
        pair: number
    }
    solved: number[]
    checkPair: (card: CardObject) => void
    popCard: () => void
    finished: boolean
}

type CardObject = {
    value: number
    pair: number
}
type list = [
    CardObject[]
    ,
    CardObject[]
]

function Card({ card, solved, checkPair, popCard, finished }: CardProps) {

    const [flipped, setFlipped] = useState<boolean>(false)
    const [clicked, setClicked] = useState<number>(-1)

    const show = solved.includes(card.value)

    useEffect(() => {
        if (clicked >= 0) {
            setFlipped(true)
            let timer = setTimeout(() => {
                setFlipped(false)
                popCard()
            }, 700)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [clicked])

    return (
        <div className={styles.card} onClick={() => {
            if (!show) {
                setClicked(prev => prev + 1)
                checkPair(card)
            }

        }}>
            <h1 className={styles.content} style={{ opacity: ` ${finished ? '100%' : show ? '100%' : (flipped ? '100%' : '0')}` }}>{card.value}</h1>
        </div >
    )
}

function create2DGrid(n: number) {
    let temp = []
    for (let i = 1; i <= n; i++) {
        temp.push({ value: i, pair: 1 }, { value: i, pair: 2 });
    }
    temp.sort(() => 0.5 - Math.random())

    let list: list = [[], []]

    for (let i = 0; i < n; i++) {
        list[0].push(temp[i])
    }

    for (let i = n; i < 2 * n; i++) {
        list[1].push(temp[i])
    }
    return list
}

export default function MatchTheCards() {

    const clickedArrayRef = useRef<CardObject[]>([])
    const solvedArray = useRef<number[]>([])

    const [restart, setRestart] = useState<boolean>(true)

    const [finished, setFinished] = useState<boolean>(false)

    const numbers: list = useMemo(() => {
        return (create2DGrid(4))
    }, [restart])

    function checkPair(card: CardObject) {
        if (clickedArrayRef.current.length === 2)
            clickedArrayRef.current.pop()
            
        clickedArrayRef.current.unshift(card)

        if (clickedArrayRef.current.length == 2) {
            if ((clickedArrayRef.current[0].value === clickedArrayRef.current[1].value) && (clickedArrayRef.current[0].pair !== clickedArrayRef.current[1].pair)) {
                solvedArray.current.push(card.value)
                if (solvedArray.current.length === 4) {
                    setFinished(true)
                }
            }
        }
    }
    function popCard() {
        if (clickedArrayRef.current.length > 0)
            clickedArrayRef.current.pop()
    }

    function newGame() {
        setRestart(prev => !prev)
        solvedArray.current = []
        clickedArrayRef.current = []
        setFinished(false)
    }


    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <Link to='..'><button className={styles.button} style={{ position: 'absolute', top: '20px', left: '20px' }}>Back</button></Link>
                <h1 className={styles.title} style={{ color: `${finished ? 'rgb(20, 175, 20)' : ''}` }}>{finished ? 'You Won!' : 'Start Playing'}</h1>
                {finished && <button className={styles.button} onClick={newGame}>Play Again</button>}
                {numbers.map((list, i) => {
                    return (
                        <div key={i} className={styles.row}>
                            {list.map(card => {
                                return (
                                    <Card
                                        solved={solvedArray.current}
                                        checkPair={checkPair}
                                        popCard={popCard}
                                        key={uuidV4()}
                                        card={card}
                                        finished={finished}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
