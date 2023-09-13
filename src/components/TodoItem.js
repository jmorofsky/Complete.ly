import React from "react"
import { Separator } from "./Separator"

export default function TodoItem(props) {
    let isLastTodo = false
    if (props.numberOfTodos === props.id) {
        isLastTodo = true
    }

    let listElements = []
    // props.lists.forEach(list => {
        // listElements.push({props.listArray[list]: props.listArray[list]})
    // })

    const activeStyle = {
        opacity: "50%",
        textDecoration: "line-through",
        transition: "all 0.2s"
    }

    return (
        <>
            <div className="todo-text" style={props.completed ? activeStyle : null}>
                {props.text}
            </div>

            <div>{props.lists} {props.tags}</div>

            {isLastTodo ? null : <Separator />}
        </>
    )
}
