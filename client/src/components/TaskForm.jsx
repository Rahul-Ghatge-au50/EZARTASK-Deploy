import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';

function TaskForm() {

    const [task,setTask] = useState({title:"",description:"",status:"To Do",dueDate:""})
    const {id} = useParams();
    const navigate = useNavigate();
    const [errorMsg,setErrorMsg] = useState('');
    const [successMsg,setSuccessMsg] = useState('');

    useEffect(() => {
        if(id){
            fetchTask();
        }
    },[]);

    const fetchTask = async () => {
        try{
            
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:8000/api/tasks/getSingle/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });

            if(res.status == 200){
                setTask(res.data.result);
            }
            
        }catch(error){
            setErrorMsg(error.response.data.message);
            console.error("Error in fetchTask",error.message);
        }
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setTask((prev) => ({...prev,[name]:value}));
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        try{
            // setErrorMsg('');
            // setSuccessMsg('')
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            task.userId = userId;
            if(id){
                // task.userId = userId;
                let res = await axios.put(`http://localhost:8000/api/tasks/${id}`,task,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                });

                if(res.status == 200){
                    setSuccessMsg(res.data.message);
                    setTimeout(() =>  navigate('/'),1000);
                }
            }else{
                // task.userId = userId;
                await axios.post('http://localhost:8000/api/tasks/',task,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                });
                navigate('/')
            }
        }catch(error){
            setErrorMsg(error.response.data.message);
            console.error("Error in handleSubmit",error.message);
        }
    }

  return (
    <>
        <Container className='container mt-5' style={{maxWidth:'500px'}} >

            {errorMsg && <div className='alert alert-danger' >{errorMsg}</div>}
            {successMsg && <div className='alert alert-success' >{successMsg}</div>}

            <form action={(e) => handleSubmit()}>
                <div className="form-group" > 
                    <label>Title</label>
                    <input 
                        type="text"
                        required
                        className='form-control'
                        value={task.title}
                        name='title'
                        onChange={handleChange}    
                    />
                </div>
                <div className="form-group" >
                    <label>Status</label>
                    <select
                        className='form-control'
                        name="status"
                        value={task.status}
                        onChange={handleChange}  
                    >
                        <option >To Do</option>
                        <option >In Progress</option>
                        <option >Done</option>
                    </select>
                </div>
                <div className='form-group' >
                    <label >Due Date</label>
                    <input 
                        type='date'
                        required
                        value={task.dueDate}
                        name="dueDate"
                        className='form-control'
                        onChange={handleChange}  
                    />
                </div>
                <div className='form-group' >
                    <label >Description</label>
                    <textarea 
                        required
                        name="description"
                        value={task.description}
                        className='form-control'
                        onChange={handleChange}  
                    />
                </div>
                <div className='d-flex justify-content-left mt-3 gap-3' >
                    <button type='submit' className="btn btn-primary mt-3">
                        Submit
                    </button>
                    <button type='button' onClick={() => navigate('/')} className="btn btn-danger mt-3">
                        Cancel
                    </button>   
                </div>
            </form>
            
        </Container>
    </>
  )
}

export default TaskForm
