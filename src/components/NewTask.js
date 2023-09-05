import React, { useState } from "react"
import sampleData from "../sampleData.json"

export default function NewTask() {
    const [lists] = useState(Object.keys(sampleData.lists[0]))
    const [tags] = useState(sampleData.tags[0])
    const [subtasks, setSubtasks] = useState([])

    const date = new Date();

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
                <input className="tag" key={i} type="button" value={tagNames[i]} style={{ backgroundColor: tagColors[i] }} />
        }

        return tagElements
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
        if (!e.target[0].value.replace(/\s/g, '').length) {
            e.preventDefault()
        } else {
            // name is not empty
            console.log(e)
        }

        e.preventDefault() //delete this
    }

    return (
        <div className="new-task-container">
            <h1>Task:</h1>

            <form id="new-task" onSubmit={handleSubmit}>
                <input spellCheck="false" type="text" placeholder="Name" required /><br />
                <input spellCheck="false" className="new-task-description" type="text" placeholder="Description" />
                <br />

                <p style={{ marginRight: "76px" }}>List</p>
                <select name="list" >
                    <option value="" />
                    {listMenu(lists)}
                </select><br />

                <p>Due Date</p>
                <input type="date" name="date" min={currentDate} max={"2099-12-31"} defaultValue={currentDate} /><br />

                <div className="tags-container" >
                    <p>Tags</p>
                    <div className="tags-menu" >
                        {tagsMenu(tags)}
                        <input className="tag" type="button" value="+ Add Tag" /><br />
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
