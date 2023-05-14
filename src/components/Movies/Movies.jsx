/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import Pagination from '../pagination/pagination';
import FeaturedMovies from '../FeaturedMovie/FeaturedMovies';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = lg ? 17 : 19;

  // console.log(data);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (data.results.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        mt="20px"
      >
        <Typography variant="h4">
          No movies match that name
          <br />
          Please search for something else
        </Typography>
      </Box>
    );
  }

  if (error) {
    return 'Error has occured';
  }
  return (
    <div>
      <FeaturedMovies movie={data.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  );
}

export default Movies;
