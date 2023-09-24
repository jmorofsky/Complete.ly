import React, { useState, useEffect, useContext } from "react"
import { TodoContext } from ".."
import sunIcon from "../images/sunIcon.png"
import { Link } from "react-router-dom"

export default function UpcomingTodoList(props) {
    const {
        todos,
        setTodos
    } = useContext(TodoContext)

    const [todoItems, setTodoItems] = useState(todos.todoItems)

    useEffect(() => { setTodoItems(todos.todoItems) }, [todos.todoItems])

    const activeStyle = {
        opacity: "50%",
        textDecoration: "line-through",
        transition: "all 0.2s"
    }

    let upcomingElements = []
    if (props.todos.length) {
        props.todos.forEach(todo => {
            let link = "/tasks/" + todo.id
            upcomingElements.push(
                <div className="upcoming-todo" style={todo.completed ? activeStyle : null} key={todo.id}>
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
                    <Link to={link}>{todo.text}</Link>
                </div>
            )
        })
    } else {
        upcomingElements.push(
            <div className="upcoming-empty" key={"Empty"}>
                <img src={sunIcon} alt="" className="upcoming-empty-img" />
                No tasks!
            </div>
        )
    }

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
        <>
            {upcomingElements}
        </>
    )
}
