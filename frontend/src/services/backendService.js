import axios from 'axios';
const baseUrl = "/api/data";

const postEventName = async (data) => {

      const request = await axios.post(baseUrl+"/eventName", {name: data},{
        headers: {
          "Content-Type": "application/json",
        },
      })
      const res = request.data
      console.log(res);     
      console.log("Response from server:", request);

    // return request.then(response => {
    //     // Log the data received from the server
    //     console.log("Data received from server:", response.data);
    //     return response.data;
    // });
    return res.data;

}

export default {postEventName}