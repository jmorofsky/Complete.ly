import React, { useState } from 'react'
import TodoItem from '../components/TodoItem'
import NewTask from '../components/NewTask'
import TaskDetails from '../components/TaskDetails'

export default function Main(props) {
    const [newTask, setNewTask] = useState(false)
    const [update, setUpdate] = useState(false)
    const [taskSelected, setTaskSelected] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState(null)
    let numberOfTodos = props.todos.todoItems.length
    let todoItems = props.todos.todoItems
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
                        tagArray={props.todos.tags}
                        tags={todo.tags}
                        listArray={props.todos.lists}
                        lists={todo.lists}
                        numberOfTodos={numberOfTodos}
                        subtasks={todo.subtasks}
                        setTaskSelected={setTaskSelected}
                        taskSelected={taskSelected}
                        setSelectedTodo={setSelectedTodo}
                        setNewTask={setNewTask}
                        newTask={newTask}
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
    }

    function handleClick() {
        if (taskSelected === true) {
            if (window.confirm("Are you sure you want to discard your changes?")) {
                setNewTask(true)
                setTaskSelected(false)
            }
        } else {
            setNewTask(true)
            setTaskSelected(false)
        }
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
                <NewTask todos={props.todos} setTodos={props.setTodos} setNewTask={setNewTask} />
                : null
            }

            {taskSelected ?
                <TaskDetails
                    id={selectedTodo}
                    setTaskSelected={setTaskSelected}
                    todos={props.todos}
                    setTodos={props.setTodos}
                />
                : null
            }
        </div>
    )
}
