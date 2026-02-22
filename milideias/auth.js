import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";


const form = document.getElementById("authForm");
const emailEl = document.getElementById("email");
const passEl = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const toggleBtn = document.getElementById("toggleBtn");
const msg = document.getElementById("msg");
const googleBtn = document.getElementById("googleBtn");
googleBtn.addEventListener("click", async () => {
  msg.textContent = "Carregando Google...";

  try {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);

    // cria/atualiza o doc do usuário no Firestore
    await setDoc(doc(db, "users", cred.user.uid), {
      email: cred.user.email || "",
      name: cred.user.displayName || "",
      photoURL: cred.user.photoURL || "",
      plan: "free",
      createdAt: serverTimestamp(),
      authProvider: "google"
    }, { merge: true });

    window.location.href = "dashboard.html";
  } catch (err) {
    msg.textContent = traduzErro(err.code || err.message);
  }
});


let mode = "login"; // "login" | "signup"

function setMode(next) {
  mode = next;
  msg.textContent = "";
  submitBtn.textContent = mode === "login" ? "Entrar" : "Cadastrar";
  toggleBtn.textContent = mode === "login" ? "Criar conta" : "Já tenho conta";
}

toggleBtn.addEventListener("click", () => {
  setMode(mode === "login" ? "signup" : "login");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailEl.value.trim();
  const password = passEl.value;

  msg.textContent = "Carregando...";

  try {
    if (mode === "signup") {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", cred.user.uid), {
        email,
        plan: "free",
        createdAt: serverTimestamp(),
      });

      window.location.href = "dashboard.html";
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    }
  } catch (err) {
    msg.textContent = traduzErro(err.code || err.message);
  }
});

function traduzErro(code) {
  if (String(code).includes("auth/invalid-email")) return "Email inválido.";
  if (String(code).includes("auth/missing-password")) return "Digite uma senha.";
  if (String(code).includes("auth/weak-password")) return "Senha fraca (mínimo 6 caracteres).";
  if (String(code).includes("auth/email-already-in-use")) return "Esse email já está cadastrado.";
  if (String(code).includes("auth/invalid-credential")) return "Email ou senha incorretos.";
  return "Erro: " + code;
}

setMode("login");
