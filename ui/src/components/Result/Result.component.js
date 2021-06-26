import './Result.component.css';
import Typography from '@material-ui/core/Typography';

export default function Result(props) {
    // {props.res}
    return (
        <div>
            <Typography  variant="h4" component="h1" className="result" color=""> 
                {props.res}
            </Typography>            
        </div>
                
          
    );
}