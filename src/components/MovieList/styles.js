import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  moviesContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center !important',
    },
  },
}));
