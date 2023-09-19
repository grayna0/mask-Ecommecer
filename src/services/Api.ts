import axios from "axios"

const apiUrl :string =  "http://localhost:3001"
export default apiUrl
export const api= axios.create(
   {
     baseURL: "http://localhost:3001",
     headers:{
        "Content-Type":"application/json"
     }

}
)


