import React, { useState } from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth,db } from '../firebase';
import {setDoc , doc, Timestamp} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const [data,setdata] = useState({
        name:'',
        email:'',
        password:'',
        error:null,
        loading:false,
    });
    const navigate = useNavigate();
    const {name,email,password,error,loading} = data;

    const handleChange = (e) =>{
        setdata ({...data,[e.target.name]:e.target.value})
        
    };
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setdata({...data,error:null,loading:true})
        if(!name || !email || !password){
            setdata({...data,error:"All Fields are required"}); 
        }
        if(password.length < 6){
            setdata({...data,error:"Password should contain at least 6 characters"});
        }
        try{
            const result = await createUserWithEmailAndPassword(auth,email,password);
            
            await setDoc(doc(db,'user',result.user.uid),{
                uid: result.user.uid,
                name,
                email,
                createdAt:Timestamp.fromDate(new Date()),
                isOnline:false,

            });
            setdata({
                name:"",
                email:"",
                password:"",
                error:null,
                loading:false,

            });
            navigate("/");

        }catch(err){
            console.log(err)
        }
        console.log(data) 
    }
  return (
    <section>
        <h3>Create Account</h3>
        <form className='form' onSubmit={handleSubmit}>
            <div className='input_container'>
                <label htmlFor='name'>Name</label>
                <input type="text" name="name" value={name} onChange={handleChange}/>
            </div>
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
                <button className='btn' disabled={loading}>Register</button>
            </div>
        </form>
    </section>
  )
}
