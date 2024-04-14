import axios from "axios"

// https://mask-z4vz.onrender.com
export const api= axios.create(
   {
     baseURL: "https://qhsmzh-8080.csb.app",
  
     headers:{
        "Content-Type":"application/json",

     }

}
)


