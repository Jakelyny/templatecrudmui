import { auth, db } from '../../../firebaseConfig';
import { doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where
} from "firebase/firestore";

export const getlembretesFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'lembretes'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
            id: doc.id,
            quando: doc.data().quando,
            texto: doc.data().texto,
            tipo: doc.data().tipo,
            anotacao: doc.data().anotacao,
            usuario: doc.data().usuario,
            email: doc.data().email,
            uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const getlembretesUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "lembretes");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
        setListaObjetos(querySnapshot.docs.map(doc => ({
            id: doc.id,
            quando: doc.data().quando,
            texto: doc.data().texto,
            tipo: doc.data().tipo,
            anotacao: doc.data().anotacao,
            usuario: doc.data().usuario,
            email: doc.data().email,
            uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deletePostFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'lembretes', objeto.id)
        await deleteDoc(postDocRef);
    } catch (err) {
        throw err;
    }
}

export const addPostFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'lembretes'),
        {
            quando: objeto.quando,
            texto: objeto.texto,
            tipo: objeto.tipo,
            anotacao: objeto.anotacao,
            uid: objeto.uid,
            usuario: objeto.usuario,
            email: objeto.email
        }).then(function (docRef) {
            objeto = { ...objeto, id: docRef.id };
            return objeto;
        });
    return ret;
    } catch (err) {
        throw err;
    }
}

export const updatePostFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'lembretes', objeto.id)
        await updateDoc(postDocRef, {
            quando: objeto.quando,
            texto: objeto.texto,
            tipo: objeto.tipo,
            anotacao: objeto.anotacao,
            uid: objeto.uid,
            usuario: objeto.usuario,
            email: objeto.email
        })
    } catch (err) {
        throw err;
    }
}