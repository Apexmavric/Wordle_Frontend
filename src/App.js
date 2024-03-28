import './App.css';
import LoginPage from './Pages/LoginPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PlayerContextProvider from './context/PlayerContextProvider';
import Menu from './Pages/MenuPage';
import ProfilePage from './Pages/ProfilePage';
import Multiplayer from './Pages/Multiplayer';
import SinglePage from './Pages/SinglePage';
import GameDetails from './Pages/GameDetails';
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
            <Route path='/multi' element = {<Multiplayer/>}></Route>
            <Route path='/gamedetails' element = {<GameDetails/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </PlayerContextProvider>
  );
}

export default App;
