import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import sampleData from './sampleData.json'
import MainLayout from "./components/MainLayout"
import Main from "./pages/Main"
import Trash from "./pages/Trash"
import Upcoming from "./pages/Upcoming"
import Calendar from "./pages/Calendar"
import Error from "./pages/Error"

function App() {
  const [todos, setTodos] = useState(sampleData)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout todos={todos} setTodos={setTodos} />}>
          <Route index element={<Main todos={todos} setTodos={setTodos} />} />
          <Route path="trash" element={<Trash todos={todos} setTodos={setTodos} />} />
          <Route path="upcoming" element={<Upcoming />} />
          <Route path="calendar" element={<Calendar />} />

          <Route path="lists" element={<></>} />
          <Route path="lists/:listName" element={<></>} />

          <Route path=":404" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <App />
  )
