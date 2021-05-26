import ToastHandling from "./toastify";
import {message} from 'antd'

const key = 2;

const handlingData = (res) => {
    if(res.data.status){
        ToastHandling("success", res.data.message);
        // message.success(res.data.message, key)
        return true;
      }else{
        if(res.data.message){
          message.error(res.data.message, key);
          ToastHandling("error", res.data.message);
        }else{
          ToastHandling("error", res.data.errors.message);
          message.error(res.data.errors.message, key);
        }
        return false;
      }
}

export default handlingData;