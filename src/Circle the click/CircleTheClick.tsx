import { useState, MouseEvent } from 'react'
import styles from './styles.module.css'
import {Link} from 'react-router-dom'

type Point = {
    x: number
    y: number
}

export default function CircleTheClick() {

    const [points, setPoints] = useState<Point[]>([])
    const [deletedPoints, setDeletedPoints] = useState<Point[]>([])

    function addCircle(e: MouseEvent<HTMLDivElement>) {
        const { pageX: x, pageY: y } = e
        //! space for the buttons
        if (x > 240 || y > 55) {
            setPoints(prev => [...prev, { x: x, y: y }])
        }
    }

    function undo() {
        let temp = [...points];
        let popped = temp.pop();
        if (!popped) return;
        setPoints(temp);
        setDeletedPoints([...deletedPoints, popped]);
    }

    function redo() {
        let temp = [...deletedPoints];
        let popped = temp.pop();
        if (!popped) return;
        setDeletedPoints(temp);
        setPoints([...points, popped]);
    }

    return (
        <div className={styles.app}
            onClick={addCircle}
        >
            <button className={styles.button} disabled={points.length > 0 ? false : true} onClick={undo}>Undo</button>
            <button className={styles.button} disabled={deletedPoints.length > 0 ? false : true} onClick={redo}>Redo</button>
            <Link to='..'><button className={styles.button}>Back</button></Link>
            {(points.length == 0 && deletedPoints.length == 0) && <h2 className={styles.title}></h2>}
            {points.map((point, i) => {
                return (
                    <div className={styles.point} key={i} style={{ left: point.x - 13, top: point.y - 13 }}>
                    </div>
                )
            })}
        </div>
    )
}
