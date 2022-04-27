import * as firebase from 'firebase-admin';

export function initializeFirebase() {
  const serviceAccount = JSON.parse(process.env.FIREBASE); // Busca credenciais do banco nas variáveis de ambiente
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount), // Configura Firebase App
  });
}
