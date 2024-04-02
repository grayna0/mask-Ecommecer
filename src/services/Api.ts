import axios from "axios"


export const api= axios.create(
   {
     baseURL: "https://mask-z4vz.onrender.com",
  
     headers:{
        "Content-Type":"application/json",

     }

}
)


