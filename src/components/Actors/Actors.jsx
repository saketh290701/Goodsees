/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Box, Grid, Typography, Button, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { useGetActorInfoQuery, useGetMoviesByActorQuery } from '../../services/TMDB';
import useStyles from './styles';
import MovieList from '../MovieList/MovieList';
import Pagination from '../pagination/pagination';

function Actors() {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const { data, isFetching, error } = useGetActorInfoQuery(id);
  const { data: actorStarredMovies } = useGetMoviesByActorQuery({ id, page });
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => history.goBack()}
          color="primary"
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
        >
          <Typography variant="h2" gutterBottom>{data?.name}</Typography>
          <Typography variant="h5" gutterBottom>
            Born : {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || 'Sorry,no biography available...'}
          </Typography>
          <Box marginTop="2rem" display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >IMDB
            </Button>
            <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">Back</Button>
          </Box>
        </Grid>
      </Grid>
      <Box magin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">Movies</Typography>
        {actorStarredMovies && <MovieList movies={actorStarredMovies} numberOfMovies={12} />}
      </Box>
      <Pagination currentPage={page} setPage={setPage} totalPages={actorStarredMovies?.total_pages} />
    </>
  );
}

export default Actors;
