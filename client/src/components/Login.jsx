import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorMsg,setErrorMsg] = useState('');
    const [successMsg,setSuccessMsg] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try{
            setErrorMsg('')
            setSuccessMsg('')
            if(!email || !password){
                setErrorMsg('Email and Password is required');
                return
            }
            const res = await axios.post('http://localhost:8000/api/auth/login',{email,password});

            if(res.status == 200){
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('userId',res.data.user.id);
                setSuccessMsg('Login Succesful!');
                setTimeout(() => navigate('/'),1000);
                navigate('/');
            }
        }catch(error){
            setErrorMsg(error.response.data.message)
            console.error("Error in handleSubmit",error.message);
        }
    }

    return (
        <>
            <div className='container mt-5' style={{maxWidth:'500px'}} >
            <h2 className='mb-4' >Login</h2>

                {errorMsg && <div className='alert alert-danger' >{errorMsg}</div>}
                {successMsg && <div className='alert alert-success' >{successMsg}</div>}

                <form action={() => handleSubmit()}>
                    <div className='form-group'>
                        <label>Email</label>
                        <input 
                            type="email" 
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}    
                        />
                    </div>
                    <div className='form-group' >
                        <label>Password</label>
                        <input 
                            type="password" 
                            className='form-control'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}    
                        />
                    </div>
                    <button type='submit' className='btn btn-primary mt-3' >
                        Login
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login
