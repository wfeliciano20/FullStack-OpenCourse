import React from 'react'
import ReactDOM from 'react-dom/client'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import anecdotesReducer from './reducers/anecdoteReducer'

const store = configureStore({
  reducer:{ 
    anecdotes: anecdotesReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
