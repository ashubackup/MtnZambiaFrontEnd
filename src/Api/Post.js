import axios from "axios";
const Post = async (url, request) => {

    let sendResponse;
    await axios.post(url, request,{
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header
      },
    }).then(
      (response) => {
        // console.log("response ",response.data);
        sendResponse = response.data;
      },
      (error) => {
        // console.log(error);
        sendResponse = error.message;
      }
    );
    return sendResponse;
};

export default Post;
