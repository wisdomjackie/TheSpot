/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setAuthUser } from '../../store/appSlice';
import { RootState } from '../../store/store';
import Location from './Location';
import { Avatar, Button, Container, TextField, Typography, MenuItem } from '@mui/material';
import { UploadFile } from '@mui/icons-material';


const ProfileSetUp = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.app.authUser);

  const [username, setUsername] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');
  const [type, setType] = React.useState(''); // Updated state for type
  const [birthday, setBirthday] = React.useState('');
  const [picture, setPicture] = React.useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  useEffect(() => {
    if (authUser) {
      setPicture(authUser.picture);
    }
  }, [authUser]);

  const handleProfileSetup = () => {
    const profileData = {
      username,
      displayName,
      type, // Updated profile type
      birthday,
      picture,
    };

    // Update user's profile on the server using Axios
    axios
      .patch(`/users/${authUser.id}`, profileData)
      .then(response => {
        // Dispatch the updated user object to the Redux store
        dispatch(setAuthUser(response.data));
        // redirect the user to the feed
    window.location.href = `${process.env.HOST}:4000/Feed`;
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleImageChange = (event: any) => {
    console.log(event.target.files[0], '<---- is sent back to server PROF PIC')
    console.log(typeof event.target.files[0], '<---- is its datatype PROF PIC')
    setSelectedImage(event.target.files[0]);
    setIsImageSelected(true);
  };

  const uploadImageToServer = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await axios.post(`/users/uploadImage/${authUser.id}`, formData);

      if (response && response.data) {
        dispatch(setAuthUser(response.data));
        setPicture(authUser.picture);
        console.log(picture, '<-----------PIC');
        setSelectedImage(null); // clear the selected image after successful upload
        setIsImageSelected(false); // reset the image selection state
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="container-full-w center">
      <Typography variant="h1">Profile Setup</Typography>
      <div className='flex-container center' style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={picture}
            alt="User Picture"
            className='rounded-circle mb-3'
            sx={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
            onClick={() => document.getElementById('imageInput').click()}
          />
          <input
            type="file"
            id="imageInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageChange}
          />
          {isImageSelected && (
            <Button variant="contained" color="secondary" onClick={uploadImageToServer}>
              Upload Image <UploadFile style={{ marginLeft: '0.5rem' }} />
            </Button>
          )}
        </div>

      <form className='flex-container center'>
        <TextField
          label="Username"
          variant="outlined"
          color="secondary"
          fullWidth
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ backgroundColor: 'var(--grey)' }}
        />

        <TextField
          label="Display Name"
          variant="outlined"
          color="secondary"
          fullWidth
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          style={{ backgroundColor: 'var(--grey)' }}
        />

        <TextField
          select
          label="Why are you here?"
          variant="outlined"
          color="secondary"
          fullWidth
          value={type}
          onChange={e => setType(e.target.value)}
          style={{ backgroundColor: 'var(--grey)' }}
        >
          <MenuItem value="personal">Party Goer</MenuItem>
          <MenuItem value="business">Party Thrower</MenuItem>
        </TextField>

        <TextField
          variant="outlined"
          color="secondary"
          type="date"
          fullWidth
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
          style={{ backgroundColor: 'var(--grey)' }}
        />

        <Button
          variant="contained"
          color="secondary"
          onClick={handleProfileSetup}
          style={{ marginTop: '1rem' }}
        >
          Save Profile
        </Button>
      </form>

      <Location />
    </Container>
  );
};

export default ProfileSetUp;

