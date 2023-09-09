import React from "react"
import { Separator } from "./Separator"

export default function TodoItem(props) {
    let isLastTodo = false
    if (props.numberOfTodos === props.id) {
        isLastTodo = true
    }

    const activeStyle = {
        opacity: "50%",
        textDecoration: "line-through",
        transition: "all 0.2s"
    }

    return (
        <>
            <div className="todo-text" style={props.completed ? activeStyle : null}>
                {props.text} {props.tags}
            </div>

            <div>{props.lists}</div>

            {isLastTodo ? null : <Separator />}
        </>
    )
}
