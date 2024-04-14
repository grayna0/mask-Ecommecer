import axios from "axios"

// https://mask-z4vz.onrender.com
export const api= axios.create(
   {
     baseURL: "http://localhost:3001",
  
     headers:{
        "Content-Type":"application/json",

     }

}
)


