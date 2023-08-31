import React, { useState } from 'react'
import sampleData from '../sampleData.json'
import TodoItem from '../components/TodoItem'

// mark as important, completed
// subtasks
// tags

export default function Main() {
    const[todos, setTodos] = useState(sampleData.todoItems)
    let todoElements = todos.map(TodoItem)

    return (
        <div id='main'>
            <h1>
                Today&emsp;&emsp;
                <span>{todos.length}</span>
            </h1>
            {todoElements}
        </div>
    )
}
