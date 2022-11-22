import { Link } from 'react-router-dom'
import styles from './styles.module.css'
export default function Home() {
    return (
        <div className={styles.home}>
            <h1 className={styles.title}>Home</h1>
            <ul>
                <li><Link to='/Circle-The-Click'>1. Circle the Click</Link></li>
                <li><Link to='/Component-Tree'>2. Component Tree</Link></li>
            </ul>
        </div>
    )
}
