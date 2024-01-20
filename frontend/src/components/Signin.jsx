import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Card from '@mui/material/Card';
import { useState } from 'react';

function Signin(){
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    return <div>
        <center>
            <h3 style={{ marginTop:"160px",marginBottom:"20px"}}>Welcome, Sign in below</h3>
        <Card variant="outlined" style={{width:"400px",padding:"20px"}}>
        <TextField id="filled-basic" label="Username" variant="filled" type="email" onChange={(e)=>setemail(e.target.value)} fullWidth/><br/><br/>
        <TextField id="filled-basic" label="Password" variant="filled" type='password' onChange={(e)=>setpassword(e.target.value)} fullWidth/><br/><br/>
        <Button variant="contained" 
        onClick={()=>{
            fetch("http://localhost:3000/signin",{
                method:"POST",
                body:JSON.stringify({
                    username:email,
                    password:password
                }),
                headers:{
                    "Content-type":"application/json"
                }
            })
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                localStorage.setItem("token",data.token);
                if(data.token){
                    window.location="/addtodo"
                }else{
                    alert("Invalid Data");
                }
            })
        }}>Sign in</Button>
        </Card>
        </center>
    </div>
}
export default Signin;