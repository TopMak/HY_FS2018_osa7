import axios from 'axios'
const baseUrl = '/api/login'

const loginUser = async (loginCreds) => {
    //NOTE Not safe without HTTPS!!
    const response = await axios.post(baseUrl, loginCreds)
    //console.log(response.data);
    return response.data

}

export default { loginUser }
