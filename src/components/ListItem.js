import React, { useState } from "react"
import { NavLink } from "react-router-dom"

export default function ListItem(props) {
    const [isActive, setIsActive] = useState(false)

    function removeList(e) {
        e.preventDefault()

        let listName = e.target.previousSibling.data
        let newTodos = { ...props.todos }

        delete newTodos.lists[0][listName]
        newTodos.todoItems.forEach(todo => {
            if (todo.lists === listName) {
                todo.lists = ""
            }
        })

        props.setTodos(newTodos)
    }

    return (
        <NavLink
            to={props.listName}
            style={{ margin: "10px 0" }}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
        >
            <span style={{
                backgroundColor: props.bgColor,
                borderRadius: "5px",
                fontSize: "15px",
                verticalAlign: "1.5px",
                marginRight: "10px"
            }}>&emsp;&nbsp;</span>
            {props.list}

            {isActive ?
                <span onClick={removeList} style={{
                    float: "right",
                    fontSize: "14px",
                    paddingTop: "3px",
                    opacity: "65%",
                    transform: "scale(1.25, 1)",
                    marginRight: "3px",
                    transition: "all 0.25s"
                }}>X</span>
                :
                <span style={{
                    float: "right",
                    fontSize: "14px",
                    paddingTop: "3px",
                    opacity: "0%",
                    transform: "scale(1.25, 1)",
                    marginRight: "3px",
                    transition: "all 0.25s",
                }}>X</span>
            }
        </NavLink>
    )
}
