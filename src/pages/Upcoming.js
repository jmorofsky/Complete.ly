import React, { useContext, useState, useEffect } from "react"
import { TodoContext } from ".."
import UpcomingTodoList from "../components/UpcomingTodoList"
import { Separator } from "../components/Separator"

export default function Upcoming() {
    const {
        todos
    } = useContext(TodoContext)

    const [todoItems, setTodoItems] = useState(todos.todoItems)

    useEffect(() => { setTodoItems(todos.todoItems) }, [todos.todoItems])

    let dates = []
    for (let i = 0; i < 7; i++) {
        let date = new Date()
        date.setDate(date.getDate() + i);

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

        dates.push(currentDate)
    }

    function getDayOfWeek(dateString) {
        const date = new Date(dateString)
        const dayOfWeek = date.getDay()

        switch (dayOfWeek) {
            case 6:
                return "Sunday"
            case 0:
                return "Monday"
            case 1:
                return "Tuesday"
            case 2:
                return "Wednesday"
            case 3:
                return "Thursday"
            case 4:
                return "Friday"
            case 5:
                return "Saturday"
            default:
        }
    }

    let numberOfTodos = 0
    todoItems.forEach(todo => {
        if (dates.includes(todo.date) && todo.deleted === false) {
            numberOfTodos++
        }
    })

    let upcomingElements = []
    for (let i = 0; i < 7; i++) {
        let todosAtDate = []
        todoItems.forEach(todo => {
            if (todo.date === dates[i] && todo.deleted === false) {
                todosAtDate.push(todo)
            } else if (i === 0 && todo.date === "2023-01-01") {
                todosAtDate.push(todo)
            }
        })

        upcomingElements.push(
            <div key={i} className={i < 3 ? "upcoming-item-large" : "upcoming-item-small"} style={
                i === 2 || i === 6 ? { border: 'none' } : null
            }>
                {i === 0 ?
                    <>
                        <p>Today</p>
                        <p className="upcoming-date">{dates[i]}</p>
                    </>
                    : i === 1 ?
                        <>
                            <p>Tomorrow</p>
                            <p className="upcoming-date">{dates[i]}</p>
                        </>
                        :
                        <>
                            <p>{getDayOfWeek(dates[i])}</p>
                            <p className="upcoming-date">{dates[i]}</p>
                        </>
                }

                <UpcomingTodoList todos={todosAtDate} />
            </div>
        )

        if (i === 2) {
            upcomingElements.push(
                <Separator key={"Separator"} />
            )
        }
    }

    return (
        <div className="main-wrapper">
            <div id="main">
                <h1>Upcoming
                    <span style={numberOfTodos === 1 ?
                        { paddingRight: "23px", paddingLeft: "19px", marginLeft: "75px" }
                        :
                        { marginLeft: "75px" }
                    }>{numberOfTodos}</span>
                </h1>

                <div className="upcoming-container">
                    {upcomingElements}
                </div>
            </div>
        </div>
    )
}
