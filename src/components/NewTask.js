import React, { useState } from "react"

export default function NewTask(props) {
    const [lists] = useState(Object.keys(props.todos.lists[0]))
    const [tags, setTags] = useState(props.todos.tags[0])
    const [subtasks, setSubtasks] = useState([])
    const [todoItems, setTodoItems] = useState(props.todos.todoItems)

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

    function handleTagChange(e) {
        const hide = document.getElementById('hide')
        const txt = e.target

        txt.style.cursor = "initial"
        hide.textContent = txt.value
        let width = hide.offsetWidth + 10
        txt.style.width = width + "px"
    }

    function handleNewTag(tag) {
        if (!(tag in tags)) {
            let R = Math.floor((Math.random() * 127) + 127)
            let G = Math.floor((Math.random() * 127) + 127)
            let B = Math.floor((Math.random() * 127) + 127)

            let rgb = (R << 16) + (G << 8) + B
            rgb = `#${rgb.toString(16)}`

            let tagsList = { ...tags }
            tagsList[tag] = rgb

            setTags(tagsList)

            document.getElementById("new-tag").value = ""
            document.getElementById("new-tag").style.width = "61px"

            //add new tag to data
            let newTodos = props.todos
            newTodos.tags = tagsList
            props.setTodos(newTodos)
        }
    }

    function newSubtask(e) {
        e.preventDefault()

        if (e.target[1].value.replace(/\s/g, '').length) {
            let currentSubtasks = subtasks.slice()
            currentSubtasks.push(e.target[1].value)
            setSubtasks(currentSubtasks)
            e.target[1].value = ""
        }
    }

    function subtaskElements(subtasks) {
        let subtaskElements = []
        for (let i = 0; i < subtasks.length; i++) {
            subtaskElements[i] =
                <div key={i} style={{ padding: "5px" }}>
                    <label className="checkbox-container" style={{ transition: "all 0.2s" }} >
                        <input type="checkbox" onChange={handleCheck} />
                        <span className="checkmarkCompleted" />
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

    function handleSubmit(e) {
        e.preventDefault()

        if (e.target[0].value.replace(/\s/g, '').length && e.keyCode != 13) {
            // name is not empty
            let id = todoItems.length + 1
            let newTodos = todoItems
            let formattedTags = []
            let list = ""

            if (e.target[2].selectedIndex != 0) {
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
                lists: list
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
                <input type="text" placeholder="Name" required maxLength={30} onKeyDown={(e) => {
                    if (e.code === "Enter") {
                        e.preventDefault()
                    }
                }} />
                <br />
                <textarea className="new-task-description" placeholder="Description" maxLength={200} />
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
                        <span id="hide" /><input id="new-tag" className="tag" type="text" placeholder="Add Tag" onInput={handleTagChange} maxLength={30} onKeyDown={(e) => {
                            if (e.code === "Enter") {
                                e.preventDefault()
                                handleNewTag(e.target.value)
                            }
                        }} />
                        <br />
                    </div>
                </div>
                <input type="submit" />
            </form>

            <h1>Subtasks:</h1>

            <form onSubmit={newSubtask} className="new-subtask-container">
                <input type="submit" value={"+"} /><input type="text" placeholder="Add New Subtask" />
            </form>
            <div style={{ marginTop: "10px" }}>
                {subtaskElements(subtasks)}
            </div>
        </div>
    )
}
