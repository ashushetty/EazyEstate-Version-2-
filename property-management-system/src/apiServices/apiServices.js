import config from "../config.json";
import toast from "react-hot-toast";
import axios from "axios";

const baseUrl = config.url;

const getServices = async (url, access_token) => {
  try {
    const response = await axios.get(`${baseUrl}${url}`, {
      headers: { access_token: access_token },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

const postServices = async (url, data, access_token) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, data, {
      headers: { access_token: access_token },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

const putServices = async (url, data, access_token) => {
  try {
    const response = await axios.put(`${baseUrl}${url}`, data, {
      headers: { access_token: access_token },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

const deleteServices = async (url, access_token) => {
  try {
    const response = await axios.delete(`${baseUrl}${url}`, {
      headers: { access_token: access_token },
    });
    return response.data;
  } catch (error) {
    toast.error(error.message);
  }
};

export { getServices, postServices, putServices, deleteServices };
