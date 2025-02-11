import AllCitiesAdmin from './AllCitiesAdmin';
import Cities from './Cities';
import PerticularCity from './components/PerticularCity';
import Layout from './Layout';
import Map from './Map';
import PerticularCityManage from './PerticularCityManage';
import PvtRoute from './PvtRoute';
import SignIn from './SignIn';
import Signup from './Signup';
import WeatherPage from './WeatherPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<WeatherPage />} />
          <Route path='/cityList' element={<Cities />} />
          <Route path='/Map' element={<Map />} />
        </Route>
        <Route path='/Signin' element={<SignIn />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/admin' element={<PvtRoute />} >
          <Route index element={<AllCitiesAdmin />} />
          <Route path='/admin/manageweather/:cityName/:cityId/:cityDate' element={<PerticularCityManage />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
