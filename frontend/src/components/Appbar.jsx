import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Appbar(){
const [UserEmail,setUserEmail]=useState(null);
useEffect(()=>{
    fetch("http://localhost:3000/me",{
        method:"GET",
        headers:{
            "Content-type":"application/json",
            "Authorization":localStorage.getItem("token")
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        if(data.username){
            setUserEmail(data.username)
        }
    })
},[]);
if(UserEmail){
    return <div>
    <div style={{
        display:"flex",
        justifyContent:"flex-end"
    }}>
        <div>{UserEmail}</div>
    <Button onClick={()=>{
        localStorage.setItem("token",null)
        window.location="/signin"
    }}>log out</Button>
    </div>
</div>
}
return <div>
    <div style={{
        display:"flex",
        justifyContent:"flex-end"
    }}>
    <Button onClick={()=>{
        window.location="/signin"
    }}>Sign in</Button>
    <Button onClick={()=>{
        window.location="/signup"
    }}>Sign up</Button>
    </div>
</div>
}
export default Appbar;