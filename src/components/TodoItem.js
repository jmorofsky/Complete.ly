import React from 'react'

export default function TodoItem(props) {
    const text = props.item.text
    const completed = props.item.completed
    const id = props.item.id
    const date = ""
    const tags = {}
    const parent = null
    const lists = {}

    const completedStyle = {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }

    return (
        <div className="todo-item">
            <input type="checkbox" checked={completed} onChange={() => props.handleChange(id)} />
            <p style={completed ? completedStyle : null}>{text}</p>
        </div>
    )
}
