import React, { useState, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import sampleData from './sampleData.json'
import MainLayout from "./components/MainLayout"
import Main from "./pages/Main"
import Trash from "./pages/Trash"
import Upcoming from "./pages/Upcoming"
import Error from "./pages/Error"
import List from './pages/List'
import Task from './pages/Task'

export const TodoContext = createContext(null)

function App() {
  const [todos, setTodos] = useState(sampleData)

  return (
    <TodoContext.Provider value={{todos, setTodos}} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Main />} />
            <Route path="trash" element={<Trash />} />
            <Route path="upcoming" element={<Upcoming />} />

            <Route path="lists" element={<></>} />
            <Route path="lists/:listName" element={<List />} />

            <Route path="tasks/:id" element={<Task />} />

            <Route path=":404" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <App />
  )
