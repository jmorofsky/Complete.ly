import React, { useEffect, useState } from 'react'
import TodoItem from '../components/TodoItem'
import NewTask from '../components/NewTask'
import TaskDetails from '../components/TaskDetails'

export default function Main(props) {
    const [newTask, setNewTask] = useState(false)
    const [taskSelected, setTaskSelected] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState(null)
    const [todoItems, setTodoItems] = useState(props.todos.todoItems)

    useEffect(() => { setTodoItems(props.todos.todoItems) }, [props.todos.todoItems])

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

    let numberOfTodos = 0
    todoItems.forEach(todo => {
        if (todo.deleted !== true && todo.date === currentDate) {
            numberOfTodos++
        }
    })

    let todoElements = []
    let i = 0
    let isLastTodo = false
    todoItems.forEach(todo => {
        if (todo.deleted !== true && todo.date === currentDate) {
            i++
            if (i === numberOfTodos) {
                isLastTodo = true
            }

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
                            isLastTodo={isLastTodo}
                        />
                    </div>
                </div>
            )
        }
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

        let updatedTodos = { ...props.todos }
        updatedTodos.todoItems = todoItems
        props.setTodos(updatedTodos)
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
                    Today
                    <span style={numberOfTodos === 1 ?
                        { paddingRight: "23px", paddingLeft: "19px", marginLeft: "75px" }
                        :
                        { marginLeft: "75px" }
                    }>{numberOfTodos}</span>
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
