import ToastHandling from "../../common/toastify";
import connect from "../../../services/connect";
import handlingData from '../../common/handlingData'
import handlingError from '../../common/handlingError'

import {message} from 'antd'

const http = new connect();

const key = 2;

export const sendPrice = (rowIndex,price) => {

    message.loading('Loading ...',key);

    if(price < 5){

        ToastHandling("error", "price must be up { 5 } ASR");   

        return false;
    }

    let data = {price : price};

  http
    .postData(data, `${http.BASE_URL_SELLER}/negotiate/${rowIndex}?_method=PUT`)

    .then((res) => {
        return handlingData(res);
    })
    .catch(err => {
        handlingError(err).forEach((element,index) => {

            if(element.m_neg){

                ToastHandling("error", element.m_neg[0]);
            }

            if(element.title){

                ToastHandling("error", element.title[0]);
            }

        })
    });

    return true;
};
