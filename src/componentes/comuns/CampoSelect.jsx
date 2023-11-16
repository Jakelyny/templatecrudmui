import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

function CampoSelect(props) {
    return (
        <>
            <FormControl sx={{ m: 1, width: '97%' }} required={props.requerido}
                error={props.readonly || props.requerido===false ? false : props.value === ""}>
                <InputLabel id={props.idLabel}>{props.label}</InputLabel>
                <Select
                    value={props.value}
                    labelId={props.idLabel}
                    id={props.id}
                    label={props.label}
                    name={props.name}
                    onChange={props.onchange}
                >
                    {props.children}
                </Select>
                <FormHelperText>{props.value === "" && props.requerido===true ? props.msginvalido : ' '}</FormHelperText>
            </FormControl>
        </>
    )
}

export default CampoSelect;