import axios from 'axios'

const serviceRequest = axios.create({
  baseURL: "http://localhost:8088/",
});

export default serviceRequest;