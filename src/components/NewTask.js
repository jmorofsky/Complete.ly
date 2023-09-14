import React, { useState, useEffect } from "react"
import NewTag from "./NewTag"

export default function NewTask(props) {
    const [lists, setLists] = useState(Object.keys(props.todos.lists[0]))
    const [tags, setTags] = useState(props.todos.tags[0])
    const [subtasks, setSubtasks] = useState([])
    const [todoItems] = useState(props.todos.todoItems)

    useEffect(() => {
        setLists(Object.keys(props.todos.lists[0]))
        setTags(props.todos.tags[0])
    }, [props.todos.lists, props.todos.tags])

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

    function listMenu(lists) {
        let listElements = []

        for (let i = 0; i < lists.length; i++) {
            listElements[i] = <option key={i} value={lists[i]}>{lists[i]}</option>
        }

        return listElements
    }

    function tagsMenu(tags) {
        let tagNames = Object.keys(tags)
        let tagColors = Object.values(tags)
        let tagElements = []

        for (let i = 0; i < tagNames.length; i++) {
            tagElements[i] =
                <input className="tag" key={i} type="button" value={tagNames[i]} style={{ backgroundColor: tagColors[i], opacity: "50%" }} selected={false} onClick={handleTag} />
        }

        return tagElements
    }

    function handleTag(e) {
        if (e.target.selected) {
            e.target.selected = false
            e.target.style.opacity = "50%"
        } else {
            e.target.selected = true
            e.target.style.opacity = "100%"
        }
    }

    function newSubtask(subtask) {
        if (subtask.replace(/\s/g, '').length) {
            // if not empty
            let currentSubtasks = subtasks.slice()
            currentSubtasks.push(subtask)
            setSubtasks(currentSubtasks)
            document.getElementById("new-subtask").value = ""
        }
    }

    function handleButtonClick() {
        let subtask = document.getElementById("new-subtask").value
        newSubtask(subtask)
    }

    function subtaskElements(subtasks) {
        let subtaskElements = []
        for (let i = 0; i < subtasks.length; i++) {
            subtaskElements[i] =
                <div key={i} style={{ padding: "5px" }}>
                    <label className="checkbox-container" style={{ transition: "all 0.2s" }} >
                        <input type="checkbox" onChange={handleCheck} />
                        <span className="checkmark-true" />
                        {subtasks[i]}
                    </label>
                </div>
        }

        return subtaskElements
    }

    function handleCheck(e) {
        if (e.target.checked) {
            e.target.labels[0].style.opacity = "50%"
            e.target.labels[0].style.textDecoration = "line-through"
        } else {
            e.target.labels[0].style.opacity = "100%"
            e.target.labels[0].style.textDecoration = "none"
        }
    }

    function handleDiscard() {
        if (
            document.getElementById("name").value !== ""
            || document.getElementById("desc").value !== ""
            || subtasks.length !== 0
        ) {
            if (window.confirm("Are you sure you want to discard this task?")) {
                props.setNewTask(false)
            }
        } else {
            props.setNewTask(false)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (e.target[0].value.replace(/\s/g, '').length && e.keyCode !== 13) {
            // name is not empty
            let id = todoItems.length + 1
            let newTodos = todoItems
            let formattedTags = []
            let list = ""
            let finalSubtasks = {}

            for(let i = 0; i < subtasks.length; i++) {
                finalSubtasks[subtasks[i]] = e.target[i + 11].checked
            }

            if (e.target[2].selectedIndex !== 0) {
                let index = e.target[2].selectedIndex
                list = e.target[2].options[index].innerText
            }

            for (let i = 4; i < Object.keys(tags).length + 4; i++) {
                if (e.target[i].selected) {
                    formattedTags.push(e.target[i].value)
                }
            }

            newTodos.push({
                id: id,
                text: e.target[0].value,
                description: e.target[1].value,
                completed: null,
                date: e.target[3].value,
                tags: formattedTags,
                lists: list,
                subtasks: finalSubtasks
            })

            let finalTodos = props.todos
            finalTodos["todoItems"] = newTodos
            props.setTodos(finalTodos)

            props.setNewTask(false)
        }
    }

    return (
        <div className="new-task-container">
            <h1>Task:</h1>

            <form id="new-task" onSubmit={handleSubmit}>
                <input id="name" type="text" placeholder="Name" required maxLength={30} onKeyDown={(e) => {
                    if (e.code === "Enter") {
                        e.preventDefault()
                    }
                }} />
                <br />
                <textarea id="desc" className="new-task-description" placeholder="Description" maxLength={200} />
                <br />

                <p style={{ marginRight: "76px" }}>List</p>
                <select name="list" >
                    <option value="" />
                    {listMenu(lists)}
                </select>
                <br />

                <p>Due Date</p>
                <input type="date" min={currentDate} max={"2099-12-31"} defaultValue={currentDate} onKeyDown={(e) => {
                    if (e.code === "Enter") {
                        e.preventDefault()
                    }
                }} />
                <br />

                <div className="tags-container" >
                    <p>Tags</p>
                    <div className="tags-menu" >
                        {tagsMenu(tags)}
                        <NewTag tags={tags} setTags={setTags} todos={props.todos} setTodos={props.setTodos} />
                        <br />
                    </div>
                </div>

                <h1>Subtasks:</h1>
                <div className="new-subtask-container">
                    <input type="button" value={"+"} onClick={handleButtonClick} /><input id="new-subtask" type="text" placeholder="Add New Subtask" onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            e.preventDefault()
                            newSubtask(e.target.value)
                        }
                    }} />
                </div>
                <div style={{ marginTop: "10px" }}>
                    {subtaskElements(subtasks)}
                </div>

                <div className="submit-container">
                    <input type="button" value="Discard Task" className="new-task-submit" onClick={handleDiscard} style={{
                        background: "transparent",
                        border: "2px solid #EBEBEB",
                        marginRight: "10%"
                    }} />
                    <input type="submit" className="new-task-submit" />
                </div>
            </form>
        </div>
    )
}
