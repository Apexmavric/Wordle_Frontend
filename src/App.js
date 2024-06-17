import './App.css';
import LoginPage from './Pages/LoginPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import BlurContextProvider from './context/PlayerContextProvider';
import Menu from './Pages/MenuPage';
import ProfilePage from './Pages/ProfilePage';
import CreateRoom from './Pages/CreateRoom';
import SinglePage from './Pages/SinglePage';
import GameDetails from './Pages/GameDetails';
import Joinroom from './Pages/JoinRoom';
import Multiplayer from './multiplayer/Multiplayer';
import AnimationTester from './Pages/AnimationTester';
import RegisterPage from './Pages/RegisterPage';
import VerificationPage from './Pages/VerificationPage';
import LeaderBoardPage from './Pages/LeaderboardPage';
import FriendsPage from './Pages/FriendsPage';
import ForgetPassWord from './Pages/ForgetPassword';

function App() {
  return (
    <BlurContextProvider>
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/play' element = {<Menu/>}></Route>
            <Route path='/' element = {<LoginPage/>}></Route>
            <Route path='/profile' element = {<ProfilePage/>}></Route>
            <Route path='/single' element = {<SinglePage/>}></Route>
            <Route path='/create' element = {<CreateRoom/>}></Route>
            <Route path='/join' element = {<Joinroom/>}></Route>
            <Route path='/gamedetails' element = {<GameDetails/>}></Route>
            <Route path='/multi' element ={<Multiplayer/>}></Route> 
            <Route path='/animate' element ={<AnimationTester/>}></Route> 
            <Route path='/register' element={<RegisterPage/>}></Route>
            <Route path='/verify-link/:token' element={<VerificationPage/>}></Route>
            <Route path='/leaderboard' element={<LeaderBoardPage/>}></Route>
            <Route path='/friends' element={<FriendsPage/>}></Route>
            <Route path='/forget-password' element={<ForgetPassWord/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </BlurContextProvider>
  );
}

export default App;
