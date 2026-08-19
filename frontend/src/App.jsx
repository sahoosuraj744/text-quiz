import {Routes,Route,Navigate} from 'react-router-dom'
import Home from './pages/Home'
import{SignedOut,SignInButton} from '@clerk/clerk-react'

import {useAuth} from '@clerk/clerk-react'
import MyResultPage from './pages/MyResultPage'

const App = () => {
  const {isLoaded} =useAuth()
  if(!isLoaded) return null;
  return (
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/result" element={
      <>
     <SignInButton>
     <MyResultPage/>
     </SignInButton>
     <SignedOut>
      <Navigate to="/"/>
     </SignedOut>
     </>
    }/>
   </Routes>
  )
}

export default App