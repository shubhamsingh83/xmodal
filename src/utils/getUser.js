import axios from "axios";

async function getUsers (){
    try {
        const users = await axios.get("http://localhost:8080/users");
        return users;
    } catch (error) {
        console.log(error);
    }
}

export {getUsers};