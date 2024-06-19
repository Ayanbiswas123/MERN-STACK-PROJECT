//Components imports
import App from './App.jsx'


//CSS imports
import './index.css'


//Library imports
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import store from './Redux/Store.js'
import { ChakraProvider, theme } from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <App />
                <Toaster />
            </ChakraProvider>

        </BrowserRouter>
    </Provider>


)
