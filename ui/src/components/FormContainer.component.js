import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



export default function FormContainer() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      
    </form>
  );
}
