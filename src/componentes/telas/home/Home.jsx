import { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getlembretesFirebase } from '../servicos/LembretesService';

function Home() {

    useEffect(() => {
        getlembretesFirebase(setListaObjetos);
    }, []);

    const [listaObjetos, setListaObjetos] = useState([
        {
            id: '1xxx',
            quando: 'Usando Firebase',
            texto: 'Como usar o Firebase',
            anotacao: 'https://firebase.google.com/docs/guides?hl=pt-br',
            tipo: 'Documentação',
            usuario: 'Jorge',
            email: 'jlbavaresco@gmail.com',
            uid: 'jj123'
        },
        {
            id: '2xxx',
            quando: 'Analysis of Component Libraries for React JS',
            texto: 'Analysis of Component Libraries for React JS',
            anotacao: 'https://iarjset.com/wp-content/uploads/2021/06/IARJSET.2021.8607.pdf',
            tipo: 'Artigo',
            usuario: 'Jorge',
            email: 'jlbavaresco@gmail.com',
            uid: 'jj123'
        }
    ]);

    useEffect(() => {

    }, []);
    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" component="div">
                Firebase com Firestore - lembretes - PWA
            </Typography>
            {listaObjetos.length === 0 && <Typography variant="h5" component="div">
                Nenhum registro encontrado
            </Typography>}

            {listaObjetos.length === 0 && <h2>Nenhum registro encontrado</h2>}

            <Grid container spacing={2}>
                {listaObjetos.length > 0 && (
                    listaObjetos.map(objeto => (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}
                            key={objeto.id}>
                            <Card sx={{ minWidth: 50 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {objeto.tipo}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {objeto.texto}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {objeto.quando}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {objeto.anotacao}
                                    </Typography>
                                    <Typography variant="h7" component="div">
                                        {objeto.usuario}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {objeto.email}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))

                )}
            </Grid>

        </div>
    )
}

export default Home;