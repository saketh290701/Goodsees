/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { useGetGenresQuery } from '../../services/TMDB';

const redLogo = 'https://fontmeme.com/permalink/230426/98fc44d2def4f2c9e760d83df8859d02.png';
const blueLogo = 'https://fontmeme.com/permalink/230426/19ebd3ab80660ad9c3f9dceec8319187.png';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },

];

function Sidebar({ setMobileOpen }) {
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching, error } = useGetGenresQuery();
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <Link
        to="/"
        className={classes.imageLink}
      >
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="GoodSees Logo"

        />
      </Link>

      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link
            key={value}
            className={classes.links}
            to="/"
          >
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(value))}
              button
            >
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} className={classes.genreImage} height={30} width={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>

          </Link>
        ))}
      </List>
      <Divider />

      <List>
        <ListSubheader>Genres</ListSubheader>

        { isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : data.genres.map(({ name, id }) => (
          <Link
            key={name}
            className={classes.links}
            to="/"
          >
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(id))}
              button
            >
              <ListItemIcon>
                <img src={genreIcons[name.toLowerCase()]} className={classes.genreImage} height={30} width={30} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>

          </Link>
        ))}

      </List>

    </>
  );
}

export default Sidebar;
