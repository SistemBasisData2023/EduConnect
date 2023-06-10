import axios from "axios";

export const getAllStudent = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/student/");
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
