import React, { useState } from 'react'
import sampleData from '../sampleData.json'
import TodoItem from '../components/TodoItem'
import NewTask from '../components/NewTask'

// mark as important
// subtasks
// tags
// repeating tasks, daily, weekly, etc

export default function Main() {
    const [todos, setTodos] = useState(sampleData)
    const [newTask, setNewTask] = useState(false)
    const [update, setUpdate] = useState(false)
    let numberOfTodos = todos.todoItems.length
    let todoItems = todos.todoItems
    let todoElements = []

    todoItems.forEach(todo => {
        todoElements.push(
            <div key={todo.id}>
                <div className="todo-item">
                    <label className="checkbox-container" >
                        {todo.completed === true || todo.completed === false ?
                            <>
                                <input type="checkbox" checked={true} onChange={handleChange} id={todo.id} />
                                <span className={"checkmark-" + todo.completed} />
                            </>
                            :
                            <>
                                <input type="checkbox" checked={false} onChange={handleChange} id={todo.id} />
                                <span className={"checkmark-" + todo.completed} />
                            </>
                        }
                    </label>

                    <TodoItem
                        id={todo.id}
                        completed={todo.completed}
                        text={todo.text}
                        tags={todo.tags}
                        listArray={todos.lists}
                        lists={todo.lists}
                        numberOfTodos={numberOfTodos}
                    />
                </div>
            </div>
        )
    })

    function handleChange(e) {
        let id = e.target.id - 1

        if (todoItems[id].completed) {
            todoItems[id].completed = false
        } else if (todoItems[id].completed === null) {
            todoItems[id].completed = true
        } else {
            todoItems[id].completed = null
        }

        setUpdate(!update)

        //update database
    }

    function handleClick() {
        setNewTask(true)
    }

    return (
        <div className='main-wrapper'>
            <div id='main'>
                <h1>
                    Today&emsp;&emsp;
                    <span>{numberOfTodos}</span>
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
                <NewTask todos={todos} setTodos={setTodos} setNewTask={setNewTask} />
                : null
            }
        </div>
    )
}
