import axios from "axios"


export const api= axios.create(
   {
     baseURL: "https://mocki.io/v1/97fb96a5-a0cb-4e57-babe-2c6cd71e75bc",
  
     headers:{
        "Content-Type":"application/json"
     }

}
)


