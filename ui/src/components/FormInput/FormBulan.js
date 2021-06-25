import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';

export default function FormBulan(props) {
    // {props.res}

    function renderBulan(){
        let start;
        let end;

        if(props.rangeAge == '24'){
            start = 1;
            end = 24;
        } else if(props.rangeAge == '60'){
            start = 25;
            end = 60;
        }

        var array = [];

        for (let i = start; i <= end; i++) {
            array.push(i);
        }   

        return array.map((month) => {
            return (
                <Grid item xs={4} sm={3} md={2}>
                    <TextField
                        label={`Bulan ${month}`}
                        name={`${props.tipe}-${month}`}
                        type="number"
                        onChange={props.onChange}
                        InputLabelProps={{
                            shrink: true,                          
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">{props.tipe == 'tinggi' ? "cm" : "kg"}</InputAdornment>,
                        }}
                        variant="outlined"
                    />
                </Grid>            
            ) ;
        })
    };

    return (
        <Grid container spacing={2}>
            {renderBulan()}
        </Grid>        
    );
}