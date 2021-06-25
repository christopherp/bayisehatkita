import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
    padding: 0,
  },
  media: {
    
  },
}));

const ResultComponent = ({props}) => {
    // props && console.log(props)
    const classes = useStyles();
    return (
        <Fragment>
            { props && props.map((image, index) => (
                <Card className={classes.root}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {`Prediksi ${image.name} badan di ${image.age} bulan adalah ${image.result.toFixed(2)}`}
                  </Typography>
                  <CardMedia
                    component="img"
                    className={classes.media}
                    image={`data:image/jpeg;base64,${image.base64}`}
                  />
                </Card>
            ))}
        </Fragment>
    )
}

export default ResultComponent;