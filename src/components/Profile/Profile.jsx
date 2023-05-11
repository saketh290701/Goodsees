/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/auth';

function Profile() {
  const { user } = useSelector(userSelector);
  const favMovies = [];

  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          My Profile
        </Typography>

        <Button
          color="inherit"
          onClick={logOut}
        >
          LogOut &nbsp; <ExitToApp />
        </Button>
      </Box>

      {!favMovies.length
        ? (
          <Typography variant="h5">
            Add favourite movies or watchList some movies to see them here!
          </Typography>
        )
        : (
          <Box>
            FAVOURITE MOVIES
          </Box>
        )}
    </Box>
  );
}

export default Profile;
