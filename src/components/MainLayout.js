import React from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import upcomingIcon from "../images/upcomingIcon.png"
import todayIcon from "../images/todayIcon.png"
import calendarIcon from "../images/calendarIcon.png"
import archiveIcon from "../images/archiveIcon.png"
import trashIcon from "../images/trashIcon.png"

export default function MainLayout() {
    const activeStyle = {
        fontWeight: "700",
        color: "#555555",
        backgroundColor: "#EBEBEB"
    }

    const Separator = () => (
        <hr style={{
            color: "#EBEBEB",
            backgroundColor: "#EBEBEB",
            height: "2px",
            width: "100%",
            border: "none"
        }} />
    )

    return (
        <div className='app-container'>
            <div className='menu-container'>
                <h1 className='menu-title'>Menu</h1>

                <p>TASKS</p>
                <NavLink to="/upcoming" style={(e) => e.isActive ? activeStyle : null}>
                    <img src={upcomingIcon} style={{ width: "13px" }} alt='' />
                    &nbsp;&nbsp;&nbsp;Upcoming
                </NavLink>

                <NavLink to="/" style={(e) => e.isActive ? activeStyle : null}>
                    <img src={todayIcon} style={{ width: "15px" }} alt='' />
                    &nbsp;&nbsp;&nbsp;Today
                </NavLink>

                <NavLink to="/calendar" style={(e) => e.isActive ? activeStyle : null}>
                    <img src={calendarIcon} style={{ width: "15px" }} alt='' />
                    &nbsp;&nbsp;&nbsp;Calendar
                </NavLink>

                <NavLink to="/archive" style={(e) => e.isActive ? activeStyle : null}>
                    <img src={archiveIcon} style={{ width: "15px" }} alt='' />
                    &nbsp;&nbsp;&nbsp;Archive
                </NavLink>

                <NavLink to="/trash" style={(e) => e.isActive ? activeStyle : null}>
                    <img src={trashIcon} style={{ width: "15px" }} alt='' />
                    &nbsp;&nbsp;&nbsp;Trash
                </NavLink>

                <Separator />

                <p>LISTS</p>
                <NavLink to="/lists/important" style={(e) => e.isActive ? activeStyle : null} >
                    <div style={{
                        color: "#FE6C68",
                        display: "inline-block",
                        fontSize: "22px",
                        verticalAlign: "-1px",
                        fontWeight: "normal"
                    }} >
                        &nbsp;!
                    </div>
                    &nbsp;&nbsp;&nbsp;Important
                </NavLink>

                <Link to="/lists" id='no-hover'>
                    <div style={{
                        display: "inline-block",
                        fontSize: "22px",
                        fontWeight: "700"
                    }} >
                        +
                    </div>
                    &nbsp;&nbsp;Add New List
                </Link>

                <Separator />

                <p>TAGS</p>
            </div>

            <Outlet />
        </div>
    )
}

// style for list boxes, need random bgcolor
// style={{
//     width: "15px",
//     height: "15px",
//     backgroundColor: "#FE6C68",
//     display: "inline-block",
//     borderRadius: "3px",
//     verticalAlign: "-1px"
// }}
