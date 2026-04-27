import{
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

import {auth, db} from "./firebase-config.js";

export function showAlert(elementId, message) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.classList.remove("d-none");
}

export function hideAlert(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.classList.add("d-none");
  el.textContent = "";
}

export function setButtonLoading(button, isLoading, text, loadingText = 'Procesando...'){
    if (!button) return

    button.disabled = isLoading
    button.innerHTML = isLoading ? `
     <span class="spinner-border spinner-border-sm me-2" aria-hidden="true">
     </span>
     ${loadingText}
     `:text
}
export async function registerUser({name, email, password, favoriteCity}){
    const credential = await createUserWithEmailAndPassword(auth, email, password)

    const user = credential.user

    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        favoriteCity: favoriteCity || '',
        createdAt: serverTimestamp()
    })

    return user
}

export async function loginUser({email, password}){
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return credential.user
}
  
export async function getCurrentUserProfile(uid) {
  const ref = doc(db, "users", uid);
  await updateDoc(user, {
    ...data,
    updateAt: serverTimestamp()
  });

  if (!snap.exists()) return null;

  return snap.data();
}


export function observeAuth(callback){
    return onAuthStateChanged(auth, callback)
}

export async function logoutUser(){
    await signOut(auth)
}

export async function getFirebaseErrorMessage(error){
    const code = error?.code || ''
    switch(code){
        case 'auth/email-already-in-use':
            return 'Este correo ya esta registrado';
        case 'auth/invalid-email':
            return 'El correo no es válido';
        case 'auth/weak-password':
            return 'La contraseña debe de tener como mínimo 6 caracteres';
        case 'auth/invalid-credential':
            return 'Correo o contraseña inválida';
        case 'auth/user-not-found':
            return 'No existe una cuenta con este correo';
        case 'auth/wrong-password':
            return 'El password es incorrecto';
        case 'auth/too-many-requests':
            return 'Demasiados intentos, intanta más tarde';
        default:
            return error?.message || 'Error inesperado';
    }

}


