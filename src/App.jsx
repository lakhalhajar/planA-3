import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ListingDetailPage from './pages/ListingDetailPage'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings/:id" element={<ListingDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
