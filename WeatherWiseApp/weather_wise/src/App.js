import Cities from './Cities';
import Layout from './Layout';
import Map from './Map';
import WeatherPage from './WeatherPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    // <div className='bg-dark-background'>
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<WeatherPage />} />
          <Route path='/cityList' element={<Cities />} />
          <Route path='/Map' element={<Map />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
