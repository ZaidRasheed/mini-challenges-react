import { useState } from "react"
import Select, { SelectOption } from "./Components/Select"
import styles from './Components/styles.module.css'
import { Link } from "react-router-dom"
const options = [
    { label: "First", value: 1 },
    { label: "Second", value: 2 },
    { label: "Third", value: 3 },
    { label: "Fourth", value: 4 },
    { label: "Fifth", value: 5 },
]

function DropDownSelect() {
    const [value1, setValue1] = useState<SelectOption[]>([options[0]])

    const [value2, setValue2] = useState<SelectOption | undefined>(options[0])
    return (
        <div className={styles.app}>
            <Link to='..'><button className={styles.back}>Back</button></Link>
            <h1 className={styles.header}>Multiple Select</h1>
            <Select
                multiple
                value={value1}
                options={options}
                onchange={o => {
                    setValue1(o);
                }} />
            <h1 className={styles.header}>Single Select</h1>
            <Select
                value={value2}
                options={options}
                onchange={o => {
                    setValue2(o);
                }} />
        </div>
    )
}

export default DropDownSelect
