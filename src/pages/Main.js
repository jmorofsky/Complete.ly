import React, { useState } from 'react'
import sampleData from '../sampleData.json'
import TodoItem from '../components/TodoItem'
import NewTask from '../components/NewTask'

// mark as important
// subtasks
// tags
// repeating tasks, daily, weekly, etc

export default function Main() {
    const [todos] = useState(sampleData.todoItems)
    const [newTask, setNewTask] = useState(false)
    let todoElements = todos.map(TodoItem)

    function handleClick() {
        setNewTask(true)
    }

    return (
        <div className='main-wrapper'>
            <div id='main'>
                <h1>
                    Today&emsp;&emsp;
                    <span>{todos.length}</span>
                </h1>

                <div className='new-task' onClick={handleClick}>
                    <span style={{
                        display: "inline-block",
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#7B7B7B",
                        padding: "13px 0 13px 27px"
                    }} >
                        +
                    </span>
                    &emsp;Add New Task
                </div>

                {todoElements}
            </div>

            {newTask ?
                <NewTask />
                : null
            }
        </div>
    )
}
