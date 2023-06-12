import { useState} from 'react' ;
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.style.scss'
import Button from '../button/button.component';      


const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    //console.log(formFields)

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const {user} =  await signInAuthUserWithEmailAndPassword(email,password);
            resetFormFields();

        } catch (error){
            if(error.code === "auth/wrong-password"){
                alert('incorrect password');

            }else if(error.code === "auth/user-not-found") {
                alert('user not associated with eamil ');

            }else {

            }

        }

    }  


    const handleChange=(event)=>{
        //console.log(event)
        const {name,value} =  event.target;
        setFormFields({...formFields, [name]: value});

    }

    return(
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span> Sign in with your eamil and password</span>
            <form onSubmit={handleSubmit}>


                <FormInput label="E-mail" type="email" required  onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required  onChange={handleChange} name="password" value={password}/>

                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttontype="google" onClick={signInWithGoogle}> Use google </Button>
                </div>

                

            </form>
        </div>
    );
}

export default SignInForm ;