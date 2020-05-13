import axios from 'axios'

function getUserData() {
  return axios.get('/users.json').then((response) => response.data)
}

export default getUserData
