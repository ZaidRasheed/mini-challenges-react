import { FormEvent, useRef, useState } from 'react'
import styles from './styles.module.css'
import { v4 as uuidV4 } from 'uuid'
import { Link } from 'react-router-dom'

type EntryProps = {
    name: string
    children?: EntryProps[]
    path: number[]
}

function Entry({ entry, depth, addFile }: { entry: EntryProps; depth: number; addFile: (parentNode: Files, name: string) => void }) {
    const [opened, setOpened] = useState<boolean>(false)
    const [showAdd, setShowAdd] = useState<boolean>(false)
    const nameRef = useRef<HTMLInputElement>(null)
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!nameRef.current?.value)
            return
        if (nameRef.current.value.length == 0)
            return
        addFile(entry, nameRef.current?.value)
        setShowAdd(false)
    }
    return (
        <div style={{ marginLeft: `${depth * 15}px`, fontSize: `${depth < 10 ? (20 - 2 * depth) : 2}px`, borderLeft: `white solid ${depth > 1 ? `${depth < 8 ? (8 - depth) : 1}px` : '0px'}`, borderBottom: `white solid ${depth == 1 ? `2px` : '0px'}`, paddingBottom: `${depth == 1 ? `5px` : '0px'}` }}>
            <h1 className={styles.name} style={{ padding: `${!entry.children && '5px 0'}` }}>
                {(entry.children && entry.children.length > 0) ?
                    <button className={styles.open} style={{ color: `${opened ? 'rgb(193, 65, 65)' : 'rgb(85, 169, 85)'}` }} onClick={() => setOpened(prev => !prev)}>{opened ? '⌄ ' : '> '}</button>
                    : <button disabled={true} className={styles.open} >-</button>}

                {entry.name}
                <button className={styles.add} onClick={() => setShowAdd(prev => !prev)}>{showAdd ? 'Close' : 'Add'}</button></h1>

            {opened && entry.children?.map(entry => {
                return (
                    <Entry
                        key={uuidV4()}
                        entry={entry}
                        depth={depth + 1}
                        addFile={addFile}
                    />
                )
            })}
            {showAdd &&
                <form className={styles.from} onSubmit={handleSubmit}>
                    <div style={{ marginLeft: '20px' }}>
                        <label>Name: </label>
                        <input type='text' ref={nameRef} />
                        <button type='submit'> Add</button>
                    </div>
                </form>}
        </div>
    )
}
type Files = {
    name: string
    children?: Files[]
    path: number[]
}
export default function Tree() {
    const nameRef = useRef<HTMLInputElement>(null)

    const [files, setFiles] = useState<Files[]>([
        {
            name: 'First Nested Tree',
            path: [0],
            children: [
                {
                    name: 'first child',
                    path: [0, 0],
                    children: [
                        {
                            name: 'grand child 1',
                            path: [0, 0, 0],
                        },
                        {
                            name: 'grand child 2',
                            path: [0, 0, 1],
                        },
                        {
                            name: 'grand child 3',
                            path: [0, 0, 2],
                        }
                    ]
                },
                {
                    name: 'second child',
                    path: [0, 1],
                    children: [
                        {
                            name: 'grand child 4',
                            path: [0, 1, 0],
                        },
                        {
                            name: 'grand child 5',
                            path: [0, 1, 1],
                        },
                        {
                            name: 'grand child 6',
                            path: [0, 1, 2],
                        }
                    ]
                }
            ]
        },
        {
            name: 'Second Nested Tree',
            path: [1],
            children: [
                {
                    name: 'cousin',
                    path: [1, 0],
                }
            ]
        }
    ])

    function addFile(parentNode: Files, name: string) {
        if (parentNode?.path[0] === -1) {
            let newTemp = [...files]
            newTemp.push({
                name: name,
                children: [],
                path: [parentNode.path[1]]
            })
            setFiles(newTemp)
            if (nameRef.current)
                nameRef.current.value = ''
            return
        }
        let temp = files
        let pointer = { ...files[parentNode.path[0]] }
        let tail = pointer
        let count = 1
        while (count < parentNode.path.length) {
            tail = pointer
            if (pointer.children) {
                pointer = pointer?.children[parentNode.path[count]]
                count++
            }
        }
        if (pointer.children) {
            pointer = {
                ...pointer,
                children: [...pointer?.children, { name: name, path: [...pointer.path, (pointer.children.length)] }]
            }
        }
        else {
            pointer = {
                ...pointer,
                children: [{ name: name, path: [...pointer.path, (0)] }]
            }
        }
        if (parentNode.path.length === 1) {
            console.log('first')
            if (pointer.children) {
                tail.children?.push(pointer.children[pointer.children?.length - 1])
            }
        }
        else {
            console.log('second')
            if (tail.children) {
                tail.children[parentNode.path[count - 1]] = pointer
            }
        }
        setFiles([...temp])

        // console.log('Tail:', tail, '\n', 'Pointer:', pointer, '\n', 'Temp:', temp, '\n')

    }

    return (
        <div className={styles.app}>
            <Link to='..'><button className={styles.back}>Back</button></Link>
            {files.map((entry: Files, i: number) => {
                return (
                    <Entry key={i} entry={entry} depth={1} addFile={addFile} />
                )
            })}
            <form className={styles.from} style={{ marginTop: '25px' }} onSubmit={(e: FormEvent) => {
                e.preventDefault()
                if (!nameRef.current?.value)
                    return
                if (nameRef.current.value.length == 0)
                    return
                addFile({ name: '', path: [-1, files.length] }, nameRef.current.value)
            }}>
                <div style={{ marginLeft: '20px' }}>
                    <label>Label: </label>
                    <input type='text' ref={nameRef} />
                    <button type='submit' style={{ fontSize: '1.3rem' }}> Add</button>
                </div>
            </form>
        </div>
    )
}
