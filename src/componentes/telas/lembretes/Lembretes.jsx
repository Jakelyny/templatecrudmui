import { useState, useEffect } from "react";
import lembretesContext from "./LembretesContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { auth } from '../../../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import { deletePostFirebase, addPostFirebase, updatePostFirebase, getlembretesUIDFirebase } from '../servicos/LembretesService';
import { Navigate } from "react-router-dom";

function Lembretes() {
        
    const [user, loading, error] = useAuthState(auth);
    
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({id: "", quando: "", texto: "", tipo: "", anotacao: "", uid: user?.uid, usuario: user?.displayName, email: user?.email});
    
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: "", quando: "", texto: "", tipo: "", anotacao: "",
            uid: user?.uid, usuario: user?.displayName, email: user?.email
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
                await updatePostFirebase(objeto);
                setAlerta({ status: "success", message: "Lembrete atualizado com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar o lembrete:"
                + err });
            }
        } else { // novo
            try {
                setObjeto(await addPostFirebase(objeto));
                setEditar(true);
                setAlerta({ status: "success", message: "Lembrete criado com sucesso"
                });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar o POST:" +
                err });
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
                deletePostFirebase(objeto);
                setAlerta({ status: "success", message: "Lembrete removido com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao remover: " + err});
            }
        }
    }

    useEffect(() => {
        setCarregando(true);
        if (user?.uid != null) {
            const uid = user?.uid;
            getlembretesUIDFirebase(uid, setListaObjetos);
        }
        setCarregando(false);
    }, [user]);

    if (user) {
    return (
        <lembretesContext.Provider value={{
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
        </lembretesContext.Provider>
        )
    } else {
        return <Navigate to="/" />;
    }
}
export default Lembretes;