import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'

export type SelectOption = {
    label: string
    value: string | number
}

type SingleSelectProps = {
    multiple?: false
    value?: SelectOption
    onchange: (value: SelectOption | undefined) => void
}
type MultipleSelectProps = {
    multiple: true
    value: SelectOption[]
    onchange: (value: SelectOption[]) => void
}

// ! depends on whether its a single or a multiple select
type SelectProps = {
    options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)



export default function Select({ multiple, value, onchange, options }: SelectProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)


    function clearOptions() {
        multiple ? onchange([]) : onchange(undefined);
    }

    function selectOption(option: SelectOption) {
        if (multiple) {
            if (value.includes(option)) {
                onchange(value.filter(o => o !== option))
            }
            else {
                onchange([...value, option])
            }
        }
        else {
            if (option !== value) onchange(option)
        };
    }

    function isOptionSelected(option: SelectOption) {
        return multiple ? value.includes(option) : option === value
    }

    useEffect(() => {
        if (isOpen) {
            setHighlightedIndex(-1);
        }
    }, [isOpen])

    
    useEffect(() => {
        const handler = (e:any) => {
            if (e.target !== containerRef.current) return
            switch (e.code) {
                case "Enter":
                case "Space":
                    setIsOpen(prev => !prev)
                    if (isOpen) selectOption(options[highlightedIndex])
                    break;
                case "ArrowUp":
                case "ArrowDown": {
                    if (!isOpen) {
                        setIsOpen(true);
                        break;
                    }
                    const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1)
                    if (newValue >= 0 && newValue < options.length) {
                        setHighlightedIndex(newValue);
                    }
                    break;
                }
                case "Escape":
                    setIsOpen(false)
                    break;
            }
        }
        containerRef.current?.addEventListener('keydown', handler)

        return () => {
            containerRef.current?.removeEventListener('keydown', handler)
        }
    }, [isOpen, highlightedIndex, options])

    return (
        <div
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onClick={() => { setIsOpen(prev => !prev) }}
            tabIndex={0} className={styles.container}
        >
            <span className={styles.value}>{multiple ? (value.map(v => (
                <button
                    key={v.value}
                    onClick={e => {
                        e.stopPropagation()
                        selectOption(v);
                    }}
                    className={styles['option-badge']}
                >
                    {v.label}
                    <span className={styles['remove-btn']}>&times;</span>

                </button>
            ))) : value?.label}</span>
            <button
                onClick={e => {
                    e.stopPropagation();
                    clearOptions()
                }}
                className={styles['clear-btn']}
            >&times;
            </button>
            <div className={styles.divider}></div>
            <div className={styles.caret}></div>
            <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option, index) => {
                    return (
                        <li
                            onClick={e => {
                                e.stopPropagation();
                                selectOption(option);
                                setIsOpen(false);
                            }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            key={option.label}
                            className={`
                            ${styles.option} 
                            ${isOptionSelected(option) ? styles.selected : ""} 
                            ${index === highlightedIndex ? styles.highlighted : ""}`}
                        >{option.label}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
