import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

export default function FormBulan(props) {
    // {props.res}

    function renderBulan(){
        let start;
        let end;

        if(props.rentangUmur == '024'){
            start = 1;
            end = 24;
        } else if(props.rentangUmur == '2560'){
            start = 25;
            end = 60;
        }

        var array = [];

        for (let i = start; i <= end; i++) {
            array.push(i);
        }   

        return array.map((number) => {
            return (
                <Grid item xs={4} sm={3} md={2}>
                    <TextField
                        label={`Bulan ${number}`}
                        name={`Bulan${number}`}
                        type="number"
                        InputLabelProps={{
                            shrink: true,                          
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                        }}
                        variant="outlined"
                    />
                </Grid>            
            ) ;
        })
    };

    function renderBulanMultiple(){
        let start;
        let end;

        if(props.rentangUmur == '024'){
            start = 1;
            end = 24;
        } else if(props.rentangUmur == '2460'){
            start = 25;
            end = 60;
        }
        for(let i = start; i < end; i++){
            renderBulan(i);
        }

    }

    

    return (
        <Grid container spacing={2}>
            {renderBulan()}
        </Grid>        
    );
}