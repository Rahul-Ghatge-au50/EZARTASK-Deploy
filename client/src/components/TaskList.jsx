import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function TaskList() {
    const [tasks,setTasks] = useState([]);
    const navigate = useNavigate();
    const [errorMsg,setErrorMsg] = useState('');
    const [statusFilter,setStatusFilter] = useState('');
    const [searchTitle,setSearchTitle] = useState('');

    const fetchTasks = async (status = "",title = "") => {
        try{
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem("userId");
            let Url = `http://localhost:8000/api/tasks/${userId}`;

            if(status) {Url += `?status=${status}`};
            if(title) {Url += `?title=${title}`};

            const res = await axios.get(Url,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            setTasks(res.data.result);
        }catch(error){
            setErrorMsg(error.response.data.message);
            console.error("Error in fetcTask:function",error.message);
        } 
    }

    useEffect(() => {
        fetchTasks();
    },[]);

    const handleDelete = async (id) => {
        try{
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/api/tasks/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            fetchTasks();
        }catch(error){
            setErrorMsg(error.response.data.message);
            console.error("Error in handelDelete fucntion",error.message);
        }
    };

    const handleEdit = async (id) => {
        try{    
            if(id){
                navigate(`/task/${id}`)
            }
        }catch(error){
            console.error("Error in handleEdit",error.message);
        }
    };

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;
        setStatusFilter(selectedStatus);
        fetchTasks(selectedStatus);
    }

    const handleTitleFilter = (e) => {
        const selectedTitle = e.target.value
        setSearchTitle(selectedTitle);
        fetchTasks(statusFilter,selectedTitle);
    }

    return (
    <>  
        <div>
            <div className='d-flex justify-content-between align-items-center' >
                <h2>Task List</h2>
                <Link to="/task" className="btn btn-primary mb-3"  >
                    Add New Task
                </Link>
            </div>

            {errorMsg && <div className='alert alert-danger' >{errorMsg}</div>}

            <div className='mb-5 d-flex justify-content-start align-items-end gap-3 flex-wrap'>
                <div >
                    <select 
                        className='form-select' 
                        id="statusFilter"
                        value={statusFilter}
                        onChange={handleStatusChange}    
                    >
                        <option value="">All</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <div>
                    <input 
                        type="text" 
                        className='form-control'
                        placeholder='Search by title'
                        value={searchTitle}
                        onChange={handleTitleFilter}
                    />
                </div>
            </div>
            


            <Table responsive="sm" hover >
                <thead className='thead-dark' >
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Desc</th>
                        <th style={{textAlign:'right'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {tasks.map((task,index) => (

                    <tr key={index}>
                        <td>{task.title}</td>
                        <td>{task.status}</td>
                        <td>{task.dueDate}</td>
                        <td>{task.description}</td>
                        <td style={{textAlign:'right'}} >
                            <button style={{backgroundColor:'white',border:'none',background: "none"}} onClick={() => handleDelete(task._id)} >
                                <MdDelete style={{fontSize:"25px",color:"red"}} />
                            </button>
                            {/* <Link to={''} onClick={() => handleDelete()} >
                                Edit
                            </Link> */}
                            <button style={{backgroundColor:'white',border:'none',background: "none"}} onClick={() => handleEdit(task._id)} >
                            <MdEdit style={{fontSize:"25px",color:"blue"}}/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    </>
    )
}

export default TaskList
