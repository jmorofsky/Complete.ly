import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TodoContext } from ".."
import TodoItem from "../components/TodoItem"
import TaskDetails from "../components/TaskDetails"
import emptyListImage from "../images/emptyList.png"
import Error from "./Error"

export default function List() {
    const listName = useParams().listName

    const {
        todos,
        setTodos
    } = useContext(TodoContext)

    let listExists = false
    if (listName in todos.lists[0]) {
        listExists = true
    }

    const [todoItems, setTodoItems] = useState(todos.todoItems)
    const [taskSelected, setTaskSelected] = useState(false)
    const [selectedTodo, setSelectedTodo] = useState(null)

    useEffect(() => { setTodoItems(todos.todoItems) }, [todos.todoItems])

    let numberOfTodos = 0
    todos.todoItems.forEach(todo => {
        if (todo.lists === listName && todo.deleted === false)
            numberOfTodos++
    })

    let listElements = []
    let i = 0
    let isLastTodo = false
    todoItems.forEach(todo => {
        if (todo.lists === listName && todo.deleted !== true) {
            i++
            if (i === numberOfTodos) {
                isLastTodo = true
            }

            listElements.push(
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
                            tagArray={todos.tags}
                            tags={todo.tags}
                            listArray={todos.lists}
                            lists={todo.lists}
                            numberOfTodos={numberOfTodos}
                            subtasks={todo.subtasks}
                            setTaskSelected={setTaskSelected}
                            taskSelected={taskSelected}
                            setSelectedTodo={setSelectedTodo}
                            isLastTodo={isLastTodo}
                            isList={true}
                            date={todo.date}
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

        let updatedTodos = { ...todos }
        updatedTodos.todoItems = todoItems
        setTodos(updatedTodos)
    }

    return (
        listExists ?
            <div className="main-wrapper">
                <div id="main">
                    <h1>{listName}
                        <span style={numberOfTodos === 1 ?
                            { paddingRight: "23px", paddingLeft: "19px", marginLeft: "83px" }
                            :
                            { marginLeft: "83px" }
                        }>{numberOfTodos}</span>
                    </h1>

                    {listElements.length ?
                        listElements :
                        <div className='empty-trash'>
                            <img src={emptyListImage} className='empty-trash-img' alt="" />
                            <p className='empty-list-text'>This list is empty!</p>
                        </div>
                    }
                </div>

                {taskSelected ?
                    <TaskDetails id={selectedTodo} setTaskSelected={setTaskSelected} />
                    : null
                }
            </div> : <Error />
    )
}
