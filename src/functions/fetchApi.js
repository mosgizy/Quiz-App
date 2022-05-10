import axios from "axios";

export const fetchData = async (url) => {
    let response = await axios.get(url).catch(error => error.code)
    return response === "ERR_NETWORK" ? response : response.data
}