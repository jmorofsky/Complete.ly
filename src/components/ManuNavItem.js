import React, { useState } from "react"
import { NavLink } from "react-router-dom"

export default function MenuNavItem(props) {
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

        props.todos.todoItems.forEach(todo => {
            if (todo.date === currentDate) {
                todayTodos++
            }
        })
    } else {
        link = "/" + props.name.toLowerCase()
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
            {props.name === "Today" ?
                isActive ?
                    <span className="badge" style={{
                        float: "right",
                        backgroundColor: "#FAFAFA",
                        transition: "all 0.25s",
                        fontWeight: "500"
                    }}>
                        {todayTodos}
                    </span>
                    :
                    <span className="badge" style={{
                        float: "right",
                        transition: "all 0.25s"
                    }}>
                        {todayTodos}
                    </span>
                :
                null
            }
        </NavLink>
    )
}
