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

    let listElement = ""

    for (const list in props.listArray[0]) {
        if (list === props.lists) {
            listElement = <div style={{
                marginRight: "15px",
                display: "inline",
                borderRight: "2px solid #EBEBEB",
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

    return (
        <>
            <div className="todo-text" style={props.completed ? activeStyle : null}>
                {props.text}
            </div>

            {listElement !== "" || tagElements.length !== 0 ? <div className="todoItem-tags" style={
                props.completed ? { opacity: "50%", transition: "all 0.2s" } : null}>
                {listElement} {tagElements}
            </div> : null}
            

            {isLastTodo ? null : <Separator />}
        </>
    )
}
