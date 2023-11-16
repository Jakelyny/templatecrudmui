import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

const Alerta = ({ alerta }) => {

    const [exibir, setExibir] = useState(false);

    useEffect(() => {
        setExibir(true);
        setTimeout(() => {
            setExibir(false);
        }, 4000);
    }, [alerta]);

    return (
        <>
            {(alerta.message.length > 0 && exibir) &&
                <Snackbar open={exibir} autoHideDuration={4000}  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity={alerta.status === 'error' ? 'error' : 'success'}>{alerta.message}</Alert>
                    </Stack>
                </Snackbar>

            }
        </>
    )
}

export default Alerta;