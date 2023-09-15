import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import upcomingIcon from "../images/upcomingIcon.png"
import todayIcon from "../images/todayIcon.png"
import calendarIcon from "../images/calendarIcon.png"
import archiveIcon from "../images/archiveIcon.png"
import trashIcon from "../images/trashIcon.png"
import { Separator } from './Separator'
import NewTag from './NewTag'
import MenuNavItem from './ManuNavItem'
import ListItem from './ListItem'

export default function MainLayout(props) {
    const [lists, setLists] = useState(props.todos.lists[0])
    const [tags, setTags] = useState(props.todos.tags[0])

    useEffect(() => {
        setTags(props.todos.tags[0])
    }, [props.todos.tags])

    function listMenu(lists) {
        let listArray = []
        let key = 0
        for (const list in lists) {
            let listName = "/lists/" + list
            let bgColor = lists[list]
            listArray.push(
                <ListItem list={list} listName={listName} bgColor={bgColor} key={key} todos={props.todos} setTodos={props.setTodos} />
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
                <div key={i} className='tag' id='menu-tag' onClick={removeTag} style={{
                    backgroundColor: tagColors[i],
                    width: "fit-content"
                }} >
                    {tagNames[i]}
                </div>
        }

        return tagElements
    }

    function removeTag(e) {
        if (window.confirm("Delete this tag?")) {
            let tagName = e.target.textContent
            let newTodos = { ...props.todos }

            delete newTodos.tags[0][tagName]
            newTodos.todoItems.forEach(todo => {
                if (todo.tags.includes(tagName)) {
                    let index = todo.tags.indexOf(tagName)
                    todo.tags = todo.tags.splice(index, 1)
                }
            })

            props.setTodos(newTodos)
        }
    }

    return (
        <div className='background'>
            <div className='app-container'>
                <div className='menu-container'>
                    <h1 className='menu-title'>Menu</h1>

                    <p>TASKS</p>
                    <MenuNavItem name="Upcoming" img={upcomingIcon} />
                    <MenuNavItem name="Today" img={todayIcon} todos={props.todos} />
                    <MenuNavItem name="Calendar" img={calendarIcon} />
                    <MenuNavItem name="Archive" img={archiveIcon} />
                    <MenuNavItem name="Trash" img={trashIcon} />

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

// todo click on tasks, add animations, change today to only show todos from today, add badges, change how number of todos is calculated to be only for today
