import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"

export default function ListItem(props) {
    const [isHovering, setIsHovering] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [todos, setTodos] = useState(props.todos.todoItems)

    useEffect(() => {
        setTodos(props.todos.todoItems)
    }, [props.todos.todoItems])

    const activeStyle = {
        fontWeight: "700",
        color: "#555555",
        backgroundColor: "#EBEBEB",
        margin: "5px 0",
        height: "20px"
    }

    let listNumber = 0
    todos.forEach(todo => {
        if (todo.lists === props.list) {
            listNumber++
        }
    })

    function removeList(e) {
        e.preventDefault()

        if (window.confirm("Delete this list?")) {
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
    }

    return (
        <NavLink
            to={props.listName}
            style={(e) => e.isActive ? activeStyle : { margin: "5px 0", height: "20px" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={(e) => e.isActive ? setIsActive(true) : setIsActive(false)}
        >
            <span style={{
                backgroundColor: props.bgColor,
                borderRadius: "5px",
                fontSize: "15px",
                verticalAlign: "1.5px",
                marginRight: "10px"
            }}>&emsp;&nbsp;</span>
            {props.list}

            {isHovering ?
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
                isActive ?
                    <span className="badge" id="list-badge" style={{
                        float: "right",
                        opacity: "100%",
                        transition: "all 0.25s",
                        backgroundColor: "#FAFAFA",
                        fontWeight: "500",
                        marginRight: "3px"
                    }}>{listNumber}</span>
                    :
                    <span className="badge" id="list-badge" style={{
                        float: "right",
                        opacity: "100%",
                        transition: "all 0.25s",
                        marginRight: "3px"
                    }}>{listNumber}</span>
            }
        </NavLink>
    )
}
