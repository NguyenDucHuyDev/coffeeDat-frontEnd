//import library
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'

//import function component
import App from './App'

//import file other
import { store } from './redux/store'

//import css globals
// import './assets/styles/globals.css'
import '@/assets/styles/globals.css'
import '@/assets/styles/video-react.js.org_assets_video-react.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
