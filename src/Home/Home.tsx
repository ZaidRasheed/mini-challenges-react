import { Link } from 'react-router-dom'
import styles from './styles.module.css'
export default function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.container}>
                <h1 className={styles.title}>Home</h1>
                <ul>
                    <li><Link to='/Circle-The-Click'>→ Circle the Click 🔴</Link></li>
                    <li><Link to='/Component-Tree'>→ Component Tree 🌴</Link></li>
                    <li><Link to='/Guess-The-Color'>→ Guess The Color 🎨</Link></li>
                    <li><Link to='/Match-The-Cards'>→ Match The Cards 🃏</Link></li>
                    <li><Link to='/DropDown-Select'>→ DropDown Select 🔽</Link></li>
                </ul>
            </div>
        </div>
    )
}
