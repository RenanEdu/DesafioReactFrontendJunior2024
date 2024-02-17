import React from "react"
import styles from './styles.module.css'

type Props = {
    onSubmit: (value: string) => void;
    onChange: (value: string) => void;
    initialValue: string;
    listLength: number;
}

function InputComponent(props: Props) {
    const {
        initialValue,
        listLength,
        onChange,
        onSubmit
    } = props 
     
    const inputRef = React.createRef<React.ElementRef<"input">>();

    const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return
        if (inputRef.current)  {
            const value = inputRef.current.value
            onSubmit(value);
            
        }
    }
    return (
        <div className={styles['container']}>
              {listLength > 0 && (
                <div className={styles['toggle-all__container']}>
                    <input id="toggle-all" className={styles['toggle-all__input']} type="checkbox" />
                    <label htmlFor="toggle-all" className={styles['toggle-all__label']} />
                </div>
            )}
            <input
                ref={inputRef}
                value={initialValue}
                id="task-input"
                type="text"
                className={styles['task__input']}
                placeholder="Whats need to be done?"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleSubmit(e)}
                onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor="task-input" />
        </div>
    )
}

export default InputComponent

