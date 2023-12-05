import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import lembretesContext from "./LembretesContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import CampoSelect from "../../comuns/CampoSelect";
import CampoEntradaTexto from "../../comuns/CampoEntradaTexto";
import Dialogo from "../../comuns/Dialogo";
import { MenuItem } from "@mui/material";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, abreDialogo, setAbreDialogo } =
        useContext(lembretesContext);

    return (
        <>
            <Dialogo id="modalEdicao" quando="Organização"
                open={abreDialogo} setOpen={setAbreDialogo}
                acaoCadastrar={acaoCadastrar} idform="formulario"
                maxWidth="sm">
                <Alerta alerta={alerta} />
                <CampoEntrada id="txtID" label="ID"
                    tipo="text" name="id" value={objeto.id}
                    onchange={handleChange} requerido={false}
                    readonly={true} />
                <CampoEntrada id="txtquando" label="Quando"
                    tipo="text" name="quando" value={objeto.quando}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="quando OK"
                    msginvalido="Informe quando" />
                <CampoEntradaTexto id="txtTexto" label="Texto"
                    rows={5}
                    tipo="text" name="texto"
                    value={objeto.texto}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="Texto OK"
                    msginvalido="Informe o texto" />
                <CampoEntrada id="txtanotacao" label="Anotação"
                    tipo="text" name="anotacao"
                    value={objeto.anotacao}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="anotacao OK"
                    msginvalido="Informe a anotação" />
                <CampoSelect
                    id="selectTipo" label="Tipo"
                    idLabel="labelTipo"
                    tipo="text" name="tipo" value={objeto.tipo}
                    onchange={handleChange} requerido={false}
                    msgvalido="Tipo OK"
                    msginvalido="Informe o tipo">                    
                    <MenuItem value='Diário'>Diário</MenuItem>
                    <MenuItem value='Eventos'>Eventos</MenuItem>                    
                </CampoSelect>
            </Dialogo>
        </>
    )

}

export default Form;