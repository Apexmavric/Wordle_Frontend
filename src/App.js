import './App.css';
import LoginPage from './Pages/LoginPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PlayerContextProvider from './context/PlayerContextProvider';
import Menu from './Pages/MenuPage';
import ProfilePage from './Pages/ProfilePage';
import CreateRoom from './Pages/CreateRoom';
import SinglePage from './Pages/SinglePage';
import GameDetails from './Pages/GameDetails';
import Joinroom from './Pages/JoinRoom';
import Multiplayer from './Pages/Multiplayer';
function App() {
  return (
    <PlayerContextProvider>
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/menu' element = {<Menu/>}></Route>
            <Route path='/' element = {<LoginPage/>}></Route>
            <Route path='/profile' element = {<ProfilePage/>}></Route>
            <Route path='/single' element = {<SinglePage/>}></Route>
            <Route path='/create' element = {<CreateRoom/>}></Route>
            <Route path='/join' element = {<Joinroom/>}></Route>
            <Route path='/gamedetails' element = {<GameDetails/>}></Route>
            <Route path='/multi' element ={<Multiplayer/>}></Route> 
        </Routes>
      </BrowserRouter>
    </div>
    </PlayerContextProvider>
  );
}

export default App;
