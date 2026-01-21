import axios from "axios";
import {toast} from "react-toastify"

const AxiosToastError = (error : any) => {
    let errorMessage = "Request failed!";

    if (axios.isAxiosError(error)) {
      const data = error.response?.data;

      if (Array.isArray(data?.message)) {
        errorMessage = data.message[0];
      } else if (typeof data?.message === "string") {
        errorMessage = data.message;
      }
    }

    toast.error(errorMessage);
}

export default AxiosToastError