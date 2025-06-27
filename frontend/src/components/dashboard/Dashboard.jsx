import React, { useEffect, useState } from 'react'
import { get, post } from '../../utils/Api'

const Dashboard = () => {
    const [users,setUsers]=useState([])

    useEffect (() => {
        const fetchUsers = async () => {
            try {
                const request = await get("/api/accesser/admin")
                const response = request.data
                if(request.status === 200){
                    setUsers(response.users)
                }
            } catch(error) {
                console.error(error)
            }
        }
        fetchUsers()
    }, [])


   

  return (
    <>
    <div className="container">
        <h2>Manage users</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users && users.map((elem,index)=>{
                    return (
                    <tr key={index}>
                        <td>{elem.name}</td>
                        <td>{elem.email}</td>
                        <td>
                            <button className="btn btn-primary" >Delete</button>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    </>
   
  )
}

export default Dashboard
