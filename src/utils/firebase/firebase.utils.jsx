import { initializeApp } from 'firebase/app' ;
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword,
signOut, onAuthStateChanged } from 'firebase/auth' ;
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore' ;

const firebaseConfig = {

  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additiobalInfrmation={}) => {

    if(!userAuth) return ;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot =  await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email } = userAuth ;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additiobalInfrmation
            });

        } catch(error){
            console.log("error creating user",error.message)
        }
    }

    return userDocRef ;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password ) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password ) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth); 

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);