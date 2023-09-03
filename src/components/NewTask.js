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
                <input key={i} type="button" value={tagNames[i]} style={{ backgroundColor: tagColors[i] }} />
        }

        return tagElements
    }

    function newSubtask(e) {
        e.preventDefault()
        let currentSubtasks = subtasks.slice()
        currentSubtasks.push(e.target[1].value)
        setSubtasks(currentSubtasks)
        e.target[1].value = ""
    }

    function subtaskElements(subtasks) {
        let subtaskElements = []
        for (let i = 0; i < subtasks.length; i++) {
            subtaskElements[i] = <p key={i}>{subtasks[i]}</p>
        }

        return subtaskElements
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <div className="new-task-container">
            <h1>Task:</h1>

            <form id="new-task" onSubmit={handleSubmit}>
                <input spellCheck="false" type="text" placeholder="Name" /><br />
                <input spellCheck="false" className="new-task-description" type="text" placeholder="Description" />
                <br />

                <p style={{ marginRight: "76px" }}>List</p>
                <select name="list" >
                    <option value="" />
                    {listMenu(lists)}
                </select><br />

                <p>Due Date</p>
                <input type="date" name="date" min={currentDate} max={"2099-12-31"} value={currentDate} /><br />

                <p>Tags</p>
                {tagsMenu(tags)}
                <input type="button" value="+ Add Tag" /><br />

                <input type="submit" />
            </form>

            <h1>Subtasks:</h1>
            <form onSubmit={newSubtask}>
                <input type="submit" value={"+"} /><input type="text" placeholder="Add New Subtask" />
            </form>
            {subtaskElements(subtasks)}
        </div>
    )
}
