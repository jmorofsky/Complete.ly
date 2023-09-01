import React, { useState, useEffect } from "react"
import { Separator } from "./Separator"
import sampleData from '../sampleData.json'

export default function TodoItem(props) {
    const [completed, setCompleted] = useState(props.completed)
    const [checked, setChecked] = useState("")
    const [checkmarkClass, setCheckmarkClass] = useState("")

    useEffect(() => {
        if (completed === true) {
            setChecked(true)
            setCheckmarkClass("checkmarkCompleted")
        } else if (completed === false) {
            setChecked(true)
            setCheckmarkClass("checkmarkFailed")
        } else {
            setChecked(false)
            setCheckmarkClass("checkmarkFailed")
        }
    }, [completed])

    let isLastTodo = false
    if (sampleData.todoItems.length === props.id) {
        isLastTodo = true
    }

    const activeStyle = {
        opacity: "50%",
        textDecoration: "line-through",
        transition: "all 0.2s"
    }

    function handleChange() {
        if (completed) {
            setCompleted(false)
            setChecked(true)
            setCheckmarkClass("checkmarkCompleted")
        } else if (completed == null) {
            setCompleted(true)
            setChecked(false)
        } else {
            setCompleted(null)
            setChecked(true)
            setCheckmarkClass("checkmarkFailed")
        }

        props.completed = completed

        //update database
    }

    return (
        <div key={props.id}>
            <div className="todo-item" >
                <label className="checkbox-container" >
                    <input type="checkbox" checked={checked} onChange={handleChange} />
                    <span className={checkmarkClass} />
                </label>
                <div className="todo-text" style={completed ? activeStyle : null}>
                    {props.text} {props.tags}
                </div>

                <div>{props.lists}</div>
            </div>

            {isLastTodo ? null : <Separator />}
        </div>
    )
}
