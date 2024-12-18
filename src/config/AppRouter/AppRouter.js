import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import SignUp from '../../Auth/SignUp'
import Login from '../../Auth/Login'
import Todo from '../../To-do/Todo'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path='Login' element={<Login />} />
                <Route path='Todo' element={<Todo />} />
            </Routes>
        </BrowserRouter>
    )
}
