import React from "react"
import { NavLink } from "react-router-dom"

export default function MenuNavItem(props) {
    const activeStyle = {
        fontWeight: "700",
        color: "#555555",
        backgroundColor: "#EBEBEB"
    }

    let link
    if(props.name === "Today") {
        link = "/"
    } else {
        link = "/" + props.name.toLowerCase()
    }

    return (
        <NavLink to={link} style={(e) => e.isActive ? activeStyle : null}>
            <img src={props.img} style={{ width: "15px" }} alt='' />
            &emsp;{props.name}
        </NavLink>
    )
}
