import axios from 'axios'
const baseUrl = '/api/login'

const loginUser = async (loginCreds) => {

    const response = await axios.post(baseUrl, loginCreds)
    //console.log(response.data);
    return response.data

}

export default { loginUser }
