import ToastHandling from "./toastify";
import connect from "../../services/connect";
import handlingData from "./handlingData";
import handlingError from "./handlingError";

import { message } from "antd";

const http = new connect();

const key = 2;

/***
 * Fetch Data
 *
 * @return JsonData
 */

export const Fetch = async (table) => {
  return http
    .getData(null, `${http.BASE_URL_SELLER}/${table}`, true)
    .then((res) => {
      if (handlingData(res)) {
        return {
          data: res.data.data,
          status: true,
        };
      } else {
        ToastHandling("error", res.data.message);
        return{
          status:res.data.status
        }
      }
    })
    .catch((err) => {
      handlingError(err);
    });
};

/****
 * Create Method
 */

export const Create = (table, data) => {
  message.loading("Loading ...", key);

  http
    .postData(data, `${http.BASE_URL_SELLER}/${table}`, false)

    .then((res) => {
      return handlingData(res);
    })
    .catch((err) => {
      handlingError(err).forEach((element, index) => {
        if (element.title) {
          ToastHandling("error", element.title[0]);
        }

        if (element.name) {
          ToastHandling("error", element.name[0]);
        }

        if (element.topic) {
          ToastHandling("error", element.topic[0]);
        }
        if (element.content) {
          ToastHandling("error", element.content[0]);
        }
      });
    });

  return true;
};

/****
 * Update Method
 */

export const Update = (table, data, id) => {
  
  message.loading("Loading ...", key);

  http
    .postData(data, `${http.BASE_URL_SELLER}/${table}/${id}?_method=PUT`, false)

    .then((res) => {
      return handlingData(res);
    })
    .catch((err) => {
      handlingError(err).forEach((element, index) => {
        if (element.m_neg) {
          ToastHandling("error", element.m_neg[0]);
        }

        if (element.title) {
          ToastHandling("error", element.title[0]);
        }
        if (element.content) {
          ToastHandling("error", element.content[0]);
        }
      });
    });

  return true;
};

/****
 * Update Method
 */

export const UpdateStatus = async (table, id) => {
  
  message.loading("Loading ...", key);

  return http
    .postData(null, `${http.BASE_URL_SELLER}/${table}/status/${id}?_method=PUT`, false)

    .then((res) => {
      if(handlingData(res)){
        return {
          data: res.data.data,
          status: true,
        };
      }
    })
    .catch((err) => {
      handlingError(err).forEach((element, index) => {
        if (element.m_neg) {
          ToastHandling("error", element.m_neg[0]);
        }

        if (element.title) {
          ToastHandling("error", element.title[0]);
        }
      });
    });
};

/****
 * Delete Method
 */

export const Delete = (table, index) => {

  message.loading("Loading...", key);

  http
    .deleteData(null, `${http.BASE_URL_SELLER}/${table}/${index}`, true)
    .then((res) => {
      handlingData(res);
    })
    .catch((err) => {
      handlingError(err).forEach((element, index) => {
        if (element.title) {
          ToastHandling("error", element.title[0]);
        }

        if (element.name) {
          ToastHandling("error", element.name[0]);
        }
      });
    });

    return true;
};

/****
 * View Method
 */

export const View = async(table, index) => {

  message.loading("Loading...", key);

  return http
    .getData(null, `${http.BASE_URL_SELLER}/${table}/${index}`, true)
    .then((res) => {
      if (handlingData(res)) {
        return {
          data: res.data.data,
          status: true,
        };
      } else {
        return {
          data: res.data.errors,
          status: false,
        };
      }
    })
    .catch((err) => {
      handlingError(err).forEach((element, index) => {
        if (element.title) {
          ToastHandling("error", element.title[0]);
        }

        if (element.name) {
          ToastHandling("error", element.name[0]);
        }
      });
    });
};
