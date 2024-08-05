import './styles/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import { persistor, store } from './app/store'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <>
              <App />
              <ToastContainer
                newestOnTop
                hideProgressBar
                pauseOnFocusLoss={false}
                icon={false}
                closeButton={false}
              />
            </>
          </PersistGate>
        </Provider>
  </React.StrictMode>,
)
