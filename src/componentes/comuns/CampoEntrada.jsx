import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function CampoEntrada({ id, label, tipo, name, value, onchange, requerido
    , readonly, maxlength, msgvalido, msginvalido, placeholder }) {
    return (
        <>
                <TextField
                    InputProps={{
                        readOnly: readonly
                    }}
                    fullWidth={true}
                    type={tipo}
                    id={id}
                    label={label}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onchange}
                    required={requerido}
                    maxLength={maxlength}
                    helperText={value === "" && requerido===true ? msginvalido : ' '}
                    error={readonly || requerido===false ? false : value === ""}
                />
        </>
    )
}

export default CampoEntrada;