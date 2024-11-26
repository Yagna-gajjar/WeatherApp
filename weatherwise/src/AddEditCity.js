import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddEditCity() {
  const initialState = {
    cityName: '',
    state: '',
    country: '',
    temperature: Array(24).fill(''),
    isEditing: false,
  };

  const { cityId } = useParams();

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.value };
      case 'SET_TEMPERATURE':
        const updatedTemp = [...state.temperature];
        updatedTemp[action.index] = action.value;
        return { ...state, temperature: updatedTemp };
      case 'LOAD_CITY_DATA':
        return { ...state, ...action.payload, isEditing: true };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (cityId) {
      const fetchCity = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/cityone/${cityId}`);

          if (response.status === 200) {
            dispatch({ type: 'LOAD_CITY_DATA', payload: response.data.city });
          }
        } catch (error) {
          console.error('Error fetching city data:', error);
        }
      };
      fetchCity();
    }
  }, [cityId]);
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = state.isEditing
      ? `http://localhost:5000/api/city/${cityId}`
      : 'http://localhost:5000/api/city';

    const method = state.isEditing ? 'put' : 'post';

    try {
      const response = await axios({
        method,
        url: apiUrl,
        data: {
          cityName: state.cityName,
          state: state.state,
          country: state.country,
          temperature: state.temperature.map(Number),
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert(`${state.isEditing ? 'City updated' : 'City added'} successfully!`);
        nav('/index')
        dispatch({ type: 'RESET' });
      }
    } catch (error) {
      console.error(`Error ${state.isEditing ? 'updating' : 'adding'} city:`, error);
      alert(`Failed to ${state.isEditing ? 'update' : 'add'} city. Please try again.`);
    }
  };

  return (
    <div className="w-3/4 mx-auto">
      <h1 className="text-2xl text-amber-800 font-bold mb-5">
        {state.isEditing ? 'Edit City' : 'Add City'}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="City Name"
          value={state.cityName}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'cityName', value: e.target.value })}
          className="border p-2 rounded-2xl text-amber-800 bg-transparent border-amber-800"
        />
        <input
          type="text"
          placeholder="State"
          value={state.state}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'state', value: e.target.value })}
          className="border p-2 rounded-2xl text-amber-800 bg-transparent border-amber-800"
        />
        <input
          type="text"
          placeholder="Country"
          value={state.country}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'country', value: e.target.value })}
          className="border p-2 rounded-2xl text-amber-800 bg-transparent border-amber-800"
        />
        <div>
          <h2 className="font-semibold mb-2 text-amber-800 ">Temperature (24 hours):</h2>
          <div className="grid grid-cols-6 gap-2">
            {state.temperature.map((temp, index) => (
              <input
                key={index}
                type="number"
                placeholder={`Hour ${index + 1}`}
                value={temp}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_TEMPERATURE',
                    index,
                    value: e.target.value,
                  })
                }
                className="border p-2 rounded-2xl text-amber-800 bg-transparent border-amber-800"
              />
            ))}
          </div>
        </div>
        <div className='flex justify-center'>
          <button type="submit" className="bg-amber-800 text-white py-2 px-4 rounded">
            {state.isEditing ? 'Update City' : 'Add City'}
          </button></div>
      </form>
    </div>
  );
}
