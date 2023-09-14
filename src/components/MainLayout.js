import React, { useEffect, useState } from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import upcomingIcon from "../images/upcomingIcon.png"
import todayIcon from "../images/todayIcon.png"
import calendarIcon from "../images/calendarIcon.png"
import archiveIcon from "../images/archiveIcon.png"
import trashIcon from "../images/trashIcon.png"
import { Separator } from './Separator'
import NewTag from './NewTag'

export default function MainLayout(props) {
    const [lists, setLists] = useState(props.todos.lists[0])
    const [tags, setTags] = useState(props.todos.tags[0])

    useEffect(() => {
        setTags(props.todos.tags[0])
    }, [props.todos.tags[0]])

    const activeStyle = {
        fontWeight: "700",
        color: "#555555",
        backgroundColor: "#EBEBEB"
    }

    function listMenu(lists) {
        let listArray = []
        let key = 0
        for (const list in lists) {
            let listName = "/lists/" + list
            listArray.push(
                <NavLink to={listName} key={key} style={{ margin: "10px 0" }}>
                    <span style={{
                        backgroundColor: lists[list],
                        borderRadius: "5px",
                        fontSize: "15px",
                        verticalAlign: "1.5px",
                        marginRight: "10px"
                    }}>&emsp;&nbsp;</span>
                    {list}
                </NavLink>
            )
            key++
        }

        return listArray
    }

    function handleList(e) {
        e.preventDefault()

        if (e.target[1].value.replace(/\s/g, '').length && !(e.target[1].value in lists)) {
            const R = Math.floor(Math.random() * 210 + 46)
            const G = Math.floor(Math.random() * 210 + 46)
            const B = Math.floor(Math.random() * 210 + 46)

            const redHex = R.toString(16).padStart(2, '0')
            const greenHex = G.toString(16).padStart(2, '0')
            const blueHex = B.toString(16).padStart(2, '0')

            const rgb = `#${redHex}${greenHex}${blueHex}`

            let listName = e.target[1].value
            let newLists = { ...lists }
            newLists[listName] = rgb
            setLists(newLists)
            e.target[1].value = ""

            let newTodos = { ...props.todos }
            newTodos.lists = [newLists]
            props.setTodos(newTodos)
        }
    }

    function tagsMenu(tags) {
        let tagNames = Object.keys(tags)
        let tagColors = Object.values(tags)
        let tagElements = []

        for (let i = 0; i < tagNames.length; i++) {
            tagElements[i] =
                <div key={i} type="button" className='tag' style={{
                    backgroundColor: tagColors[i],
                    width: "fit-content"
                }} >
                    {tagNames[i]}
                </div>
        }

        return tagElements
    }

    return (
        <div className='background'>
            <div className='app-container'>
                <div className='menu-container'>
                    <h1 className='menu-title'>Menu</h1>

                    <p>TASKS</p>
                    <NavLink to="/upcoming" style={(e) => e.isActive ? activeStyle : null}>
                        <img src={upcomingIcon} style={{ width: "13px" }} alt='' />
                        &emsp;Upcoming
                    </NavLink>

                    <NavLink to="/" style={(e) => e.isActive ? activeStyle : null}>
                        <img src={todayIcon} style={{ width: "15px" }} alt='' />
                        &emsp;Today
                    </NavLink>

                    <NavLink to="/calendar" style={(e) => e.isActive ? activeStyle : null}>
                        <img src={calendarIcon} style={{ width: "15px" }} alt='' />
                        &emsp;Calendar
                    </NavLink>

                    <NavLink to="/archive" style={(e) => e.isActive ? activeStyle : null}>
                        <img src={archiveIcon} style={{ width: "15px" }} alt='' />
                        &emsp;Archive
                    </NavLink>

                    <NavLink to="/trash" style={(e) => e.isActive ? activeStyle : null}>
                        <img src={trashIcon} style={{ width: "15px" }} alt='' />
                        &emsp;Trash
                    </NavLink>

                    <Separator />

                    <p>LISTS</p>
                    {listMenu(lists)}
                    <form className='new-list' onSubmit={handleList}>
                        <input type='submit' value="+" style={{ marginRight: "10px" }} />
                        <input type='text' placeholder='Add New List' maxLength={20} />
                    </form>

                    <Separator />

                    <p>TAGS</p>
                    <div className='menu-tags-container'>
                        {tagsMenu(tags)}
                        <NewTag tags={tags} setTags={setTags} todos={props.todos} setTodos={props.setTodos} />
                    </div>
                </div>

                <Outlet />
            </div>
        </div>
    )
}

    // todo delete tags, delete list
