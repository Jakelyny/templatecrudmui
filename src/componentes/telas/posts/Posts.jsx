import { useState, useEffect } from "react";
import PostsContext from "./PostsContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";


function Posts() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: '',
        titulo: '',
        texto: '',
        url: '',
        tipo: '',
        usuario: '',
        email: '',
        uid: ''
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: '',
            titulo: '',
            texto: '',
            url: '',
            tipo: '',
            usuario: '',
            email: '',
            uid: ''
        });
        setAbreDialogo(true)
    }

    const editarObjeto = async (objeto) => {
        setObjeto(objeto);
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {

            try {

                setAlerta({ status: "success", message: "Post atualizado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar o POST:" + err });
            }
        } else { // novo 
            try {
                setEditar(true);
                setAlerta({ status: "success", message: "Post criado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar o POST:" + err });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                setAlerta({ status: "success", message: "Post removido com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao  remover: " + err });
            }
        }
    }

    useEffect(() => {
        setListaObjetos([
            {
                id: '1xxx',
                titulo: 'Usando Firebase',
                texto: 'Como usar o Firebase',
                url: 'https://firebase.google.com/docs/guides?hl=pt-br',
                tipo: 'Documentação',
                usuario: 'Jorge',
                email: 'jlbavaresco@gmail.com',
                uid: 'jj123'
            },
            {
                id: '2xxx',
                titulo: 'Analysis of Component Libraries for React JS',
                texto: 'Analysis of Component Libraries for React JS',
                url: 'https://iarjset.com/wp-content/uploads/2021/06/IARJSET.2021.8607.pdf',
                tipo: 'Artigo',
                usuario: 'Jorge',
                email: 'jlbavaresco@gmail.com',
                uid: 'jj123'
            }
        ])
        setCarregando(false);
    }, []);

    return (
        <PostsContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            remover,
            objeto, setObjeto,
            editarObjeto, novoObjeto, acaoCadastrar,
            handleChange, abreDialogo, setAbreDialogo
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </PostsContext.Provider>
    )

}

export default Posts;