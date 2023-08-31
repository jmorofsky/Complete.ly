import React, { useState } from "react"
import { Separator } from "./Separator"
import sampleData from '../sampleData.json'

export default function TodoItem(props) {
    const [completed, setCompleted] = useState(props.completed)
    let isLastTodo = false
    if (sampleData.todoItems.length == props.id) {
        isLastTodo = true
    }

    const activeStyle = {
        opacity: "50%",
        textDecoration: "line-through",
        transition: "all 0.2s"
    }

    function handleChange() {
        setCompleted(!completed)
        props.completed = !props.completed

        //update database
    }

    if (isLastTodo) {
        return (
            <div className="todo-item" key={props.id}>
                <label className="checkbox-container" >
                    <div style={completed ? activeStyle : null}>{props.text} {props.tags}</div>
                    <input type="checkbox" defaultChecked={completed} onChange={handleChange} />
                    <span className="checkmark" />
                </label>

                <div>{props.lists}</div>
            </div>
        )
    } else {
        return (
            <>
                <div className="todo-item" key={props.id}>
                    <label className="checkbox-container" >
                        <div style={completed ? activeStyle : null}>{props.text} {props.tags}</div>
                        <input type="checkbox" defaultChecked={completed} onChange={handleChange} />
                        <span className="checkmark" />
                    </label>

                    <div>{props.lists}</div>
                </div>

                <Separator />
            </>
        )
    }
}
