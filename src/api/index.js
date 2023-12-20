import { BASE_URL, SEND_TASK } from "./baseurl";
import axios from "axios";

export const SendEmail = async (data) => {
    console.log("data :",data);
  const url = BASE_URL + SEND_TASK;

  console.log("url :",url);

  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
// const requestOptions = {
//     mode: 'no-cors',
//     method: 'POST',
//     headers: {  "Content-Type": "multipart/form-data" },
//     body: data
// };


//  const response = await fetch(url, requestOptions)
 
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
       
//       });
  return response;
};
 