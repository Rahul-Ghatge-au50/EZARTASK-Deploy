import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const [errorMsg,setErrorMsg] = useState('');
    const [successMsg,setSuccessMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try{
            setErrorMsg('')
            setSuccessMsg('')
            const res = await axios.post('https://ezartask.onrender.com/api/auth/register',{email,password,username});
            
            if(res.status == 200){
                setSuccessMsg("Registerd successfully");
                setTimeout(() => navigate('/login'),2000);
            }
        }catch(error){
            const msg = error.response?.data?.message;
            setErrorMsg(msg);
            console.error("Error in handleSubmit",error.message);
        }
    }

    return (
        <>
        <div className='container mt-5' style={{maxWidth:'500px'}} >
            <h2 className='mb-4' >Register</h2>

            {errorMsg && <div className='alert alert-danger' >{errorMsg}</div>}
            {successMsg && <div className='alert alert-success' >{successMsg}</div>}

            <form action={(e) => handleSubmit(e)}>
                <div className='form-group'>
                    <label>Username</label>
                    <input 
                        name='username'
                        type="text" 
                        className='form-control'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}    
                    />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input 
                        type="email" 
                        name='email'
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}    
                    />
                </div>
                <div className='form-group' >
                    <label>Password</label>
                    <input 
                        type="password" 
                        name='password'
                        className='form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}    
                    />
                </div>
                <button type='submit' className='btn btn-primary mt-3' >
                    Register
                </button>
            </form>
        </div>
        </>
    )
}

export default Register;
