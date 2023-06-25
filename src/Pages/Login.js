import { useState } from 'react'
import {signInWithEmailAndPassword} from "firebase/auth";
import { auth,db } from '../firebase';
import {updateDoc , doc } from 'firebase/firestore'
import { Navigate, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export const Login = () => {
    const [data,setdata] = useState({
        email:'',
        password:'',
        error:null,
        loading:false,
        // isOnline:false
    });
    const [newerror,setnewerror] = useState(false);
    const navigate = useNavigate();
    const {email,password,error,loading} = data;

    const handleChange = (e) =>{
        setdata ({...data,[e.target.name]:e.target.value})
        
    };
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setdata({...data,error:null,loading:true})
        if( !email || !password){
            setdata({...data,error:"All Fields are required"}); 
        }
        
        try{
            const result = await signInWithEmailAndPassword(auth,email,password);
            
            await updateDoc(doc(db,'user',result.user.uid),{
                isOnline:true,
            });
            setdata({
                email:"",
                password:"",
                error:null,
                loading:false,

            }) 
            navigate("/message");

        }catch(err){
            return(
                setTimeout(function() {
                    navigate(0)
                }, 1000),
                setnewerror(true)              
            )
        }
        console.log(data) 
    }
  return (
    <section>
        <h3>Login </h3>
        <form className='form' onSubmit={handleSubmit}>
           
            <div className='input_container'>
                <label htmlFor='email'>Email</label>
                <input type="email" name="email" value={email} onChange={handleChange}/>
            </div>
            <div className='input_container'>
                <label htmlFor='password'>Password</label>
                <input type="password" name="password" value={password} onChange={handleChange}/>
            </div>
            {error ? <p className='error'>{error}</p>:null}
            <div className='btn_container'>
                <button className='btn' disabled={loading}>{loading?"Loging in....":"Login"}</button>
                
            </div>
           
        </form>
        {!error && newerror && <span className="error">
                <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert variant="filled" severity="error">Email or Password is incorrect</Alert>
                </Stack>
                </span>}
    </section>
    
    )
   
  
}
