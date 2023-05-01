import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movie: {
    padding: '5px',

  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '180px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: '10px',
    marginBottom: '0px',
    textAlign: 'center',
    textDecoration: 'none',
  },
  links: {
    alignItems: 'center',
    fontWeight: 'bolder',
    textDecoration: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      textDecoration: 'none',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  image: {
    borderRadius: '20px',
    height: '250px',
    marginBottom: '10px',
    marginRight: '10px',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));
