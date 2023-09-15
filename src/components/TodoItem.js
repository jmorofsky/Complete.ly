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

    let tagElements = []
    let key = 0
    for (const tag in props.tagArray[0]) {
        if (props.tags.includes(tag)) {
            tagElements.push(
                <div key={key} className="tag" style={{
                    display: "inline",
                    backgroundColor: props.tagArray[0][tag],
                    cursor: "auto",
                    margin: "0 15px 0 0"
                }}>
                    {tag}
                </div>
            )
            key++
        }
    }

    let listElement = ""
    for (const list in props.listArray[0]) {
        if (list === props.lists) {
            listElement = <div style={tagElements.length !== 0 ? {
                marginRight: "15px",
                display: "inline",
                borderRight: "2px solid #EBEBEB",
                paddingRight: "18px"
            } : {
                marginRight: "15px",
                display: "inline",
                paddingRight: "18px"
            }}>
                <span style={{
                    backgroundColor: props.listArray[0][list],
                    borderRadius: "5px",
                    fontSize: "15px",
                    verticalAlign: "1.5px",
                    marginRight: "10px"
                }}>
                    &emsp;&nbsp;
                </span>
                {props.lists}
            </div>
        }
    }

    let subtaskElement = null
    let numberOfSubtasks = Object.keys(props.subtasks).length
    if (numberOfSubtasks !== 0) {
        if (numberOfSubtasks === 1) {
            subtaskElement = <div
                className="todo-item-subtask"
                style={listElement !== "" || tagElements.length !== 0 ?
                    { borderRight: "2px solid #EBEBEB" } : null}>
                <span className="badge">
                    {numberOfSubtasks}
                </span>
                Subtask
            </div>
        } else {
            subtaskElement = <div
                className="todo-item-subtask"
                style={listElement !== "" || tagElements.length !== 0 ?
                    { borderRight: "2px solid #EBEBEB" } : null}>
                <span className="badge">
                    {numberOfSubtasks}
                </span>
                Subtasks
            </div>
        }
    }

    function handleClick() {
        if (props.newTask === true) {
            if (window.confirm("Are you sure you want to discard this task?")) {
                props.setTaskSelected(true)
                props.setSelectedTodo(props.id)
                props.setNewTask(false)
            }
        } else {
            props.setTaskSelected(true)
            props.setSelectedTodo(props.id)
            props.setNewTask(false)
        }
    }

    return (
        <>
            <div className="todo-text" style={props.completed ? activeStyle : null}>
                {props.text}
            </div>
            <span className="todo-item-arrow" onClick={handleClick}>{'>'}</span>

            {listElement !== "" || tagElements.length !== 0 || subtaskElement !== null ?
                <div className="todoItem-tags" style={
                    props.completed ?
                        { opacity: "50%", transition: "all 0.2s" }
                        :
                        null
                }>
                    {subtaskElement} {listElement} {tagElements}
                </div>
                :
                null
            }

            {isLastTodo ? null : <Separator />}
        </>
    )
}
