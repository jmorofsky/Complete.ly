import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from "./components/MainLayout"
import Main from "./pages/Main"
import Trash from "./pages/Trash"
import Archive from "./pages/Archive"
import Upcoming from "./pages/Upcoming"
import Calendar from "./pages/Calendar"
import Error from "./pages/Error"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Main />} />
          <Route path="trash" element={<Trash />} />
          <Route path="archive" element={<Archive />} />
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
