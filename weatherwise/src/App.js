import './App.css';
import Herosection from './Herosection.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import Display from './Display.js';
import EditProfile from './EditProfile.js';
import AddEditCity from './AddEditCity.js';
import PvtRoute from './PvtRoute.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Herosection />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />

        <Route path='/index' element={
          <PvtRoute>
            <Display />
          </PvtRoute>} />
        <Route path='/editProfile' element={
          <PvtRoute>
            <EditProfile />
          </PvtRoute>} />
        <Route path='/addeditCity/:cityId' element={
          <PvtRoute>
            <AddEditCity />
          </PvtRoute>} />
        <Route path='/addeditCity' element={
          <PvtRoute>
            <AddEditCity />
          </PvtRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
