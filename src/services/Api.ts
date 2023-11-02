import axios from "axios"


export const api= axios.create(
   {
     baseURL: "localhost:3001",
  
     headers:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"disable"
     }

}
)


