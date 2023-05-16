import axios from "axios";

const base_url = "https://youtube138.p.rapidapi.com";

const options = {
  params: {
    hl: "en",
    gl: "US",
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
  },
};

export const fetchdata = async (url) => {
  const { data } = await axios.get(`${base_url}/${url}`, options);
  return data;
};
