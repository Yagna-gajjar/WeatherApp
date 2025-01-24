import React, { useState, useEffect, useCallback, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function AdminProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [editing, setEditing] = useState(null);
  const fileInputRef = useRef(null);
  const [profilePic, setProfilePic] = useState('default.png');
  const api = useSelector((state) => state.api.url);
  const email = localStorage.getItem('email');
  const nav = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${api}/api/oneuser/${email}`);
      setUserDetails({ ...res.data.oneuser, file: null });
      console.log(res.data.oneuser.profilePic);
      setProfilePic(res.data.oneuser.profilePic)
    } catch (error) {
      console.error("Error fetching user data", error);
      setUserDetails({
        cityId: null,
        username: null,
        email: null,
        profilePic: "default.png",
        file: null
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const addOrEditUser = useCallback(
    debounce(async () => {
      try {
        console.log(profilePic);
        const formData = new FormData();
        Object.keys(userDetails).forEach((key) => {
          if (key == 'profilePic') {
            formData.append('profilePic', profilePic)
          } else {
            formData.append(key, userDetails[key]);
          }
        });
        await axios.put(`${api}/api/editprofile/${email}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Error updating user details:", error);
      }

    }, 500),
    [api, userDetails]
  );

  const handleCellDoubleClick = (event, field) => {
    setEditing({ field });
  };

  const handleCellBlur = (event, field) => {
    const value = event.target.innerText.trim();
    setEditing(null);
    if (field && value !== userDetails[field]) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [field]: value,
      }));
    }
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setProfilePic(file.name)
    if (file) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        file: file,
      }));
      addOrEditUser();
    }
  };

  useEffect(() => {
    if (editing === null) {
      addOrEditUser();
    }
  }, [userDetails, editing]);

  return (
    <div id="profile" className="absolute bg-secondary transition-all duration-700 ease-in-out h-screen w-screen lg:w-[20%] -left-[20%]">
      <div className="relative p-5">
        <div
          onClick={() => {
            document.getElementById('profile').classList.add('-left-[20%]');
            document.getElementById('profile').classList.remove('left-0');
          }}
          className="flex w-full justify-end"
        >
          <CloseIcon />
        </div>
        <div className="relative flex flex-col justify-center items-center">
          <div className="w-56 h-56 rounded-full">
            <img
              className="rounded-full w-56 h-56"
              src={require(`./assests/Users/${userDetails.profilePic || 'default.png'}`)}
              alt="Profile"
            />
          </div>
          <div
            className="absolute flex justify-center items-center top-0 rounded-full w-56 h-56 bg-black opacity-0 text-white text-3xl transition-all duration-300 ease-in-out hover:opacity-60"
            onClick={() => fileInputRef.current.click()}
          >
            <EditIcon style={{ width: 40, height: 40 }} />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            name="file"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col justify-center items-center text-primary">
          <p
            className="text-3xl outline-primary border-none p-3 font-bold hover:cursor-pointer hover:underline hover:selection:bg-secondary selection:bg-text"
            contentEditable={editing?.field === 'username'}
            suppressContentEditableWarning={true}
            onDoubleClick={(e) => handleCellDoubleClick(e, 'username')}
            onBlur={(e) => handleCellBlur(e, 'username')}
          >
            {userDetails.username}
          </p>
          <p className="hover:cursor-pointer hover:selection:bg-secondary selection:bg-secondary">
            {userDetails.email}
          </p>
          {userDetails.cityId && (
            <div className='py-4 flex flex-col justify-center items-center'>
              <p className="font-bold">
                {userDetails.cityId.cityName}
              </p>
              <p className="">
                {userDetails.cityId.stateID.stateName}
              </p>
              <p className="">
                {userDetails.cityId.countryID.countryName}
              </p>
            </div>
          )}
          <div className='flex hover:font-bold' onClick={() => {
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            nav('/')
          }}>
            <LogoutIcon />
            <p>Log out</p>
          </div>
        </div>

      </div>
    </div>
  );
}
