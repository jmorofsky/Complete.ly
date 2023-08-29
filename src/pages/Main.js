import React from 'react'
import TodoItem from '../components/TodoItem'

// mark as important, completed
// subtasks
// tags

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            text: "",
            todos: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleText = this.handleText.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        const text = this.state.text
        this.setState(prevState => {
            let updatedTodos = []
            updatedTodos = prevState.todos.slice(0)
            updatedTodos.push({ id: prevState.todos.length, text: text, completed: false })

            return {
                text: "",
                todos: updatedTodos
            }
        })
    }

    handleChange(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo
            })
            return {
                todos: updatedTodos
            }
        })
    }

    handleText(event) {
        const value = event.target.value
        this.setState({
            text: value
        })
    }

    render() {
        const todoItems = this.state.todos.map(item =>
            <TodoItem
                key={item.id}
                item={item}
                handleChange={this.handleChange}
            />
        )

        const submitStyle = {
            display: 'none'
        }

        return (
            <div className="todo-list">
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Add a new item"
                        autoComplete="off"
                        value={this.state.text}
                        onChange={this.handleText}
                    />
                    <input type="submit" style={submitStyle} />
                </form>

                {todoItems}
            </div>
        )
    }
}

export default App
