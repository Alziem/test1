import { message } from "antd";

const key = 2;

const handlingError = (err) => {

  if(err.response.status >= 500){

    message.error('Please check your connection then reload', 3);
    
  }else{

    message.error(err.response.data.message, key);

    return [err.response.data.errors];
  }

};

export default handlingError;
