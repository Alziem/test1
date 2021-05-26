import Table from "../../common/table";
import { useTranslation } from "react-i18next";
import { Select, Button, Tooltip } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../layouts/spinner/spinner";
import { updateDelivery, fetchDelivery } from "./actions";
import { Fetch } from "../../common/actions";

/// Icons

import VideocamIcon from '@material-ui/icons/Videocam';
import PermPhoneMsgIcon from '@material-ui/icons/PermPhoneMsg';

import { SendMessage, CreateMeeting } from './modals'

const { Option } = Select;

const Products = () => {
  const [data, setData] = useState([{ title: "Loading ..." }]);
  const [loading, setLoading] = useState(false);
  const [delivery, setDelivery] = useState([]);
  const [visibleMessage, setMessageVisible] = useState([]);
  const [visibleMeeting, setMeetingVisible] = useState([]);


  const { t } = useTranslation();

  useEffect(() => {
    
    fetchDelivery().then((res) => {
      if (res.status) {
        setDelivery(res.data);
      }
    });

    Fetch("order").then((res) => {
      if (res.status) {
        setData(res.data);
        setLoading(true);
      }else{
        setData([]);
        setLoading(true);
      }
    });
  }, []);

  const handlingMessageProps = (index) => { 

    setMessageVisible(() => {

      const newLoadings = [...visibleMessage];

      newLoadings[index] = false;

      return newLoadings;

    });
  }

  const handlingMeetingProps = (index) => {

    setMeetingVisible(() => {

      const newLoadings = [...visibleMeeting];

      newLoadings[index] = false;

      return newLoadings;

    });
  }

  const enterMessageVisible = (index) => {               

    for (let x in visibleMessage) {

      visibleMessage[x] = false;
      
    }

    setMessageVisible(() => {

      const newLoadings = [...visibleMessage];

      newLoadings[index] = true;

      return newLoadings;

    });
  };

  const handleMessageCancel = (index) => {

    setMessageVisible(() => {

      const newLoadings = [...visibleMessage];

      newLoadings[index] = false;

      return newLoadings;

    });
  };

  const enterMeetingVisible = (index) => {               

    for (let x in visibleMeeting) {

      visibleMeeting[x] = false;
      
    }

    setMeetingVisible(() => {

      const newLoadings = [...visibleMeeting];

      newLoadings[index] = true;

      return newLoadings;

    });
  };

  const handleMeetingCancel = (index) => {

    setMeetingVisible(() => {

      const newLoadings = [...visibleMeeting];

      newLoadings[index] = false;

      return newLoadings;

    });
  };

  const columns = [
    {
      label: "Code",
      name: "code",
    },
    {
      label: t("product.title"),
      name: "product.title",
    },
    {
      label: t("order.status"),
      name: "status",
    },
    {
      label: t("order.buyer"),
      name: "buyer.name",
    },
    {
      label: t("order.price"),
      name: "price",
    },
    {
      label: t("order.discount"),
      name: "discount",
    },
    {
      label: t("order.count"),
      name: "counts",
    },
    {
      label: t("order.delivery"),
      name: "delivery.id",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex) => {
          return (
            <Fragment>
              <Select
                defaultValue={dataIndex}
                onChange={(event) =>
                  updateDelivery(
                    rowIndex.tableData[rowIndex.rowIndex].id,
                    event
                  )
                }
              >
                {delivery.map((index, key) => {
                  return (
                    <Option key={key} value={index.id}>
                      {index.name_en || index.name_ar}
                    </Option>
                  );
                })}
              </Select>
            </Fragment>
          );
        },
      },
    },
    {
      label: t("Actions"),
      name: "id",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex) => {
          return (
            <Fragment>
              <Tooltip title="Send Message" placement="bottom">
                <Button onClick={() => enterMessageVisible((rowIndex.rowIndex))}>
                  <PermPhoneMsgIcon />
                </Button>
                <SendMessage visible={visibleMessage[(rowIndex.rowIndex)]} onCancel={() => handleMessageCancel((rowIndex.rowIndex))} title="Send Message" dataIndex={dataIndex} handlingProps={() => handlingMessageProps(rowIndex.rowIndex)}/>
              </Tooltip>

              <Tooltip title="Create Meeting" placement="bottom">
                <Button onClick={() => enterMeetingVisible(rowIndex.rowIndex)}>
                  <VideocamIcon />
                </Button>
                <CreateMeeting visible={visibleMeeting[(rowIndex.rowIndex)]} onCancel={() => handleMeetingCancel(( rowIndex.rowIndex))} title="Create Meeting" dataIndex={dataIndex} handlingProps={() => handlingMeetingProps(rowIndex.rowIndex)}/> 
              </Tooltip>

              {/* <Tooltip title="Let's Chat" placement="bottom">
                <Button >
                  <ForumIcon />
                </Button>
              </Tooltip> */}

            </Fragment>
          );
        },
      },
    },
  ];

  const options = {};

  if (loading) {
    return (
      <Fragment>
        <div className="products-dropbox">
          <div className="products-table">
            <Table
              dataTable={data}
              table="order"
              Columns={columns}
              options={options}
            />

          <div className="Modals-container">
            {/* <LetChat visible={visible[2]} confirmLoading={modelLoading[2]} onCancel={() => handleCancel(2)} title="Lets Chat" /> */}
          </div>

          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};

export default Products;
