import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getValue = async (currency) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/convert`, { currency });
    return { success: true, data: data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
