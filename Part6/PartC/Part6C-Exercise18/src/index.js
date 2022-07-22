import React from 'react'
import ReactDOM from 'react-dom/client'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import anecdotesReducer from './reducers/anecdotesSlice'
import notificationReducer from './reducers/notificationSlice'
import filterReducer from './reducers/filterSlice'

const store = configureStore({
  reducer:{ 
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
