import { useState} from 'react' ;
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.style.scss'
import Button from '../button/button.component';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    //console.log(formFields)

    const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();


        if(password !== confirmPassword ) {
            alert("password do not match");
            return;
        }

        try {
            console.log("attempting")
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user,{displayName});
            resetFormFields();

        } catch (error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }else {
                console.log('user creation error',error)
            }
        }

    }  


    const handleChange=(event)=>{
        //console.log(event)
        const {name,value} =  event.target;
        setFormFields({...formFields, [name]: value});

    }

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span> Sign up with your eamil and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName"  value={displayName}/>

                <FormInput label="E-mail" type="email" required  onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required  onChange={handleChange} name="password" value={password}/>

                <FormInput label="Confirm Password" type="password" required  onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>
                

            </form>
        </div>
    );
}

export default SignUpForm ;