import React, { useState, useEffect } from "react"
import NewTag from "./NewTag"

export default function TaskDetails(props) {
    const [todoItems] = useState(props.todos.todoItems)
    const selectedTodo = todoItems[props.id - 1]
    const [lists, setLists] = useState(Object.keys(props.todos.lists[0]))
    const [tags, setTags] = useState(props.todos.tags[0])
    const [subtasks, setSubtasks] = useState(Object.keys(selectedTodo.subtasks))

    useEffect(() => {
        setLists(Object.keys(props.todos.lists[0]))
        setTags(props.todos.tags[0])
    }, [props.todos.lists, props.todos.tags])

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
            if (selectedTodo.tags.includes(tagNames[i])) {
                tagElements[i] =
                    <input className="tag" key={i} type="button" value={tagNames[i]} style={{ backgroundColor: tagColors[i], opacity: "100%" }} selected={true} onClick={handleTag} />
            } else {
                tagElements[i] =
                    <input className="tag" key={i} type="button" value={tagNames[i]} style={{ backgroundColor: tagColors[i], opacity: "50%" }} selected={false} onClick={handleTag} />
            }
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
                    <label className="checkbox-container" style={selectedTodo.subtasks[subtasks[i]] ?
                        { opacity: "50%", textDecoration: "line-through", transition: "all 0.2s" }
                        :
                        { transition: "all 0.2s" }
                    } >
                        <input type="checkbox" onChange={handleCheck} defaultChecked={selectedTodo.subtasks[subtasks[i]]} />
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
            document.getElementById("name").value !== selectedTodo.text
            || document.getElementById("desc").value !== selectedTodo.description
            || subtasks.length !== Object.keys(selectedTodo.subtasks).length
        ) {
            if (window.confirm("Are you sure you want to discard your changes?")) {
                props.setTaskSelected(false)
            }
        } else {
            props.setTaskSelected(false)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (e.target[0].value.replace(/\s/g, '').length && e.keyCode !== 13) {
            // name is not empty
            let newTodos = todoItems
            let formattedTags = []
            let list = ""
            let finalSubtasks = {}

            for (let i = 0; i < subtasks.length; i++) {
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

            newTodos[selectedTodo.id - 1] = {
                id: selectedTodo.id,
                text: e.target[0].value,
                description: e.target[1].value,
                completed: selectedTodo.completed,
                date: e.target[3].value,
                tags: formattedTags,
                lists: list,
                subtasks: finalSubtasks
            }

            let finalTodos = { ...props.todos }
            finalTodos["todoItems"] = newTodos
            props.setTodos(finalTodos)

            props.setTaskSelected(false)
        }
    }

    return (
        <div className="new-task-container">
            <h1>Task:</h1>

            <form id="new-task" onSubmit={handleSubmit}>
                <input id="name" type="text" defaultValue={selectedTodo.text} placeholder="Name" required maxLength={30} onKeyDown={(e) => {
                    if (e.code === "Enter") {
                        e.preventDefault()
                    }
                }} />
                <br />
                <textarea id="desc" className="new-task-description" placeholder="Description" defaultValue={selectedTodo.description} maxLength={200} />
                <br />

                <p style={{ marginRight: "76px" }}>List</p>
                <select name="list" defaultValue={selectedTodo.lists} >
                    <option value="" />
                    {listMenu(lists)}
                </select>
                <br />

                <p>Due Date</p>
                <input type="date" min={selectedTodo.date} max={"2099-12-31"} defaultValue={selectedTodo.date} onKeyDown={(e) => {
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
                    <input type="button" value="Discard Changes" className="new-task-submit" onClick={handleDiscard} style={{
                        background: "transparent",
                        border: "2px solid #EBEBEB",
                        marginRight: "10%"
                    }} />
                    <input type="submit" value="Save" className="new-task-submit" />
                </div>
            </form>
        </div>
    )
}
