import React, { useState, useContext } from "react"
import { NavLink } from "react-router-dom"
import { TodoContext } from ".."

export default function MenuNavItem(props) {
    const {
        todos
    } = useContext(TodoContext)

    const [isActive, setIsActive] = useState(false)

    const activeStyle = {
        fontWeight: "700",
        color: "#555555",
        backgroundColor: "#EBEBEB"
    }

    let todayTodos = 0
    let link
    if (props.name === "Today") {
        link = "/"

        const date = new Date()
        let day = date.getDate()
        if (day < 10) {
            day = "0" + day
        }
        let month = date.getMonth() + 1
        if (month < 10) {
            month = "0" + month
        }
        let year = date.getFullYear()
        let currentDate = `${year}-${month}-${day}`

        todos.todoItems.forEach(todo => {
            if (todo.date === currentDate && todo.deleted === false) {
                todayTodos++
            }
        })
    } else {
        link = "/" + props.name.toLowerCase()
    }

    let trashTodos = 0
    if(props.name === "Trash") {
        todos.todoItems.forEach(todo => {
            if(todo.deleted === true) {
                trashTodos++
            }
        })
    }

    return (
        <NavLink
            to={link}
            style={(e) => e.isActive ? activeStyle : null}
            className={(e) => e.isActive ? setIsActive(true) : setIsActive(false)}
            id="menu-badge"
        >
            <img src={props.img} style={{ width: "15px" }} alt='' />
            &emsp;{props.name}
            {props.name === "Today" || props.name === "Trash" ?
                isActive ?
                    <span className="badge" style={{
                        float: "right",
                        backgroundColor: "#FAFAFA",
                        transition: "all 0.25s",
                        fontWeight: "500"
                    }}>
                        {props.name === "Today" ? todayTodos : trashTodos}
                    </span>
                    :
                    <span className="badge" style={{
                        float: "right",
                        transition: "all 0.25s"
                    }}>
                        {props.name === "Today" ? todayTodos : trashTodos}
                    </span>
                :
                null
            }
        </NavLink>
    )
}
