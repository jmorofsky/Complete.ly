import React, { useState, useEffect, useContext } from 'react'
import { Separator } from '../components/Separator'
import emptyTrashImage from '../images/emptyTrash.png'
import { TodoContext } from '..'

export default function Trash() {
    const {
        todos,
        setTodos
    } = useContext(TodoContext)

    const [todoItems, setTodoItems] = useState(todos.todoItems)
    const [tagArray] = useState(todos.tags)
    const [listArray] = useState(todos.lists)

    useEffect(() => {
        setTodoItems(todos.todoItems)
    }, [todos.todoItems])

    const activeStyle = {
        opacity: "50%",
        textDecoration: "line-through",
        transition: "all 0.2s"
    }

    let numberOfTodos = 0
    let deletedTodos = []
    todoItems.forEach(todo => {
        if (todo.deleted) {
            numberOfTodos++
            deletedTodos.push(todo)
        }
    })

    let trashElements = []
    deletedTodos.forEach(todo => {
        let isLastTodo = true
        deletedTodos.forEach(todo2 => {
            if (todo2.id > todo.id) {
                isLastTodo = false
            }
        })

        let tagElements = []
        let key = 0
        for (const tag in tagArray[0]) {
            if (todo.tags.includes(tag)) {
                tagElements.push(
                    <div key={key} className="tag" style={{
                        display: "inline",
                        backgroundColor: tagArray[0][tag],
                        cursor: "auto",
                        margin: "0 15px 0 0"
                    }}>
                        {tag}
                    </div>
                )
                key++
            }
        }

        let listElement = ""
        for (const list in listArray[0]) {
            if (list === todo.lists) {
                listElement = <div style={tagElements.length !== 0 ? {
                    marginRight: "15px",
                    display: "inline",
                    borderRight: "2px solid #EBEBEB",
                    paddingRight: "18px"
                } : {
                    marginRight: "15px",
                    display: "inline",
                    paddingRight: "18px"
                }}>
                    <span style={{
                        backgroundColor: listArray[0][list],
                        borderRadius: "5px",
                        fontSize: "15px",
                        verticalAlign: "1.5px",
                        marginRight: "10px"
                    }}>
                        &emsp;&nbsp;
                    </span>
                    {todo.lists}
                </div>
            }
        }

        let subtaskElement = null
        let numberOfSubtasks = Object.keys(todo.subtasks).length
        if (numberOfSubtasks !== 0) {
            if (numberOfSubtasks === 1) {
                subtaskElement = <div
                    className="todo-item-subtask"
                    style={listElement !== "" || tagElements.length !== 0 ?
                        { borderRight: "2px solid #EBEBEB" } : null}>
                    <span className="badge">
                        {numberOfSubtasks}
                    </span>
                    Subtask
                </div>
            } else {
                subtaskElement = <div
                    className="todo-item-subtask"
                    style={listElement !== "" || tagElements.length !== 0 ?
                        { borderRight: "2px solid #EBEBEB" } : null}>
                    <span className="badge">
                        {numberOfSubtasks}
                    </span>
                    Subtasks
                </div>
            }
        }

        trashElements.push(
            <div key={todo.id}>
                <div className="todo-item">
                    <label className="checkbox-container" >
                        {todo.completed === true || todo.completed === false ?
                            <>
                                <input type="checkbox" checked={true} id={todo.id} />
                                <span className={"checkmark-" + todo.completed} />
                            </>
                            :
                            <>
                                <input type="checkbox" checked={false} id={todo.id} />
                                <span className={"checkmark-" + todo.completed} />
                            </>
                        }
                    </label>

                    <div className="todo-text" style={todo.completed ? activeStyle : null}>
                        {todo.text}
                    </div>
                    <span className="trash-item-x" id={todo.id} onClick={handleClick}>X</span>

                    {listElement !== "" || tagElements.length !== 0 || subtaskElement !== null ?
                        <div className="todoItem-tags" style={
                            todo.completed ?
                                { opacity: "50%", transition: "all 0.2s" }
                                :
                                null
                        }>
                            {subtaskElement} {listElement} {tagElements}
                        </div>
                        :
                        null
                    }
                    <span className='trash-restore' onClick={handleRestore} id={todo.id}>⭯</span>

                    {isLastTodo ? null : <Separator />}
                </div>
            </div>
        )
    })

    function handleClick(e) {
        if (window.confirm("Permanently delete this task?")) {
            // permanently delete
            let newTodos = []
            for (let i = 0; i < todoItems.length; i++) {
                if (i !== e.target.id - 1) {
                    newTodos.push(todoItems[i])
                }
            }

            for (let i = 0; i < newTodos.length; i++) {
                newTodos[i].id = i + 1
            }

            let finalTodos = { ...todos }
            finalTodos["todoItems"] = newTodos
            setTodos(finalTodos)
        }
    }

    function handleRestore(e) {
        if (window.confirm("Restore this task?")) {
            let newTodos = [...todoItems]
            newTodos.forEach(todo => {
                if (todo.id === parseInt(e.target.id)) {
                    todo.deleted = false
                }
            })

            let finalTodos = { ...todos }
            finalTodos["todoItems"] = newTodos
            setTodos(finalTodos)
        }
    }

    return (
        <div className='main-wrapper'>
            <div id='main'>
                <h1>Trash
                    <span style={numberOfTodos === 1 ?
                        { paddingRight: "23px", paddingLeft: "19px", marginLeft: "83px" }
                        :
                        { marginLeft: "83px" }
                    }>{numberOfTodos}</span>
                </h1>

                {trashElements.length ? trashElements :
                    <div className='empty-trash'>
                        <img src={emptyTrashImage} className='empty-trash-img' alt='' />
                        <p className='empty-trash-text'>All clear. For now...</p>
                    </div>
                }
            </div>
        </div>
    )
}
