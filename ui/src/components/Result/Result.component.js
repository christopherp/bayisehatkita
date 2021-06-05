import './Result.component.css';
import Button from "../CustomButtons/Button.js";
import Grid from "@material-ui/core/Grid";

export default function Result(props) {
    // {props.res}
    return (
        <div>
            <p className="result">
                {props.res}
            </p>             
        </div>        
          
    );
}