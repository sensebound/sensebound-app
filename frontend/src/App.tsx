
import './App.css'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Privacy from './pages/Privacy'
import Introduction from './pages/Introduction'


import Profile from './pages/Profile'
import Editor from './pages/Editor'
import Loader from './components/Loader'
import Stats from './pages/Stats'
import Terms from './pages/Terms'
import Feedback from './pages/Feedback'
import Guide from './pages/Guide'
import UserPage from './pages/UserPage'
import { Post } from './pages/Post'
import Reset from './pages/Reset'
import ForgotPassword from './pages/ForgotPassword'
import ReactGA from 'react-ga4';


ReactGA.initialize("")


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/privacy' element={<Privacy/>}/>
            <Route path='/introduction' element={<Introduction/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/editor' element={<Editor/>}/>
            <Route path='/loader' element={<Loader/>}/>
            <Route path='/stats' element={<Stats/>}/>
            <Route path='/terms' element={<Terms/>}/>
            <Route path='/feedback' element={<Feedback/>}/>
            <Route path='/guide' element={<Guide/>}/>
            <Route path='/userProfile' element={<UserPage/>}/>
            <Route path='/post' element={<Post/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/reset' element={<Reset/>}/>
        </Routes>
      </BrowserRouter>

      
    </>
  )
}

export default App
