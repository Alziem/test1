import Table from "../../common/table";
import { useTranslation } from "react-i18next";
import { Button,  Tooltip } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../layouts/spinner/spinner";
import { Fetch,View } from "../../common/actions";
import {ViewMessage} from './modals'
/// Icons

import VisibilityIcon from "@material-ui/icons/Visibility";

const Products = () => {
  const [data, setData] = useState([{ title: "Loading ..." }]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState();
  const [dataViewMessage, setdataViewMessage] = useState([]);
  const [visibleMessage, setVisibleMessage] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    Fetch("message").then((res) => {
      if (res && res.status) {
        setData(res.data.data);
        setCount(res.data.count);
        setLoading(true);
      }else{
        setLoading(true);
        setData([]);
      }
    });
  }, []);

  
  const enterMeetingVisible = (index, zoomId) => {

    for (let x in visibleMessage) {

      visibleMessage[x] = false;

    }

    View("message", zoomId)
    .then((res) => {
      if (res.status) {
        setdataViewMessage(res.data);

        setVisibleMessage(() => {
          const newLoadings = [...visibleMessage];

          newLoadings[index] = true;

          return newLoadings;
        });
      }
    });

  };

  const handlingMeetingProps = (index) => {
    setVisibleMessage(() => {
      const newLoadings = [...visibleMessage];

      newLoadings[index] = false;

      return newLoadings;
    });
  };

  const handleMeetingCancel = (index) => {
    setVisibleMessage(() => {
      const newLoadings = [...visibleMessage];

      newLoadings[index] = false;

      return newLoadings;
    });
  };

  const columns = [
    {
      label: t("ID"),
      name: "id",
    },
    {
      label: t("Buyer"),
      name: "buyer",
    },
    {
      label: t("create At"),
      name: "created_at",
    },
    {
      label: t("Update At"),
      name: "updated_at",
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

              <Tooltip title="View" placement="bottom">
                <Button onClick={() =>
                    enterMeetingVisible(rowIndex.rowIndex, dataIndex)
                  }>
                  <VisibilityIcon />
                </Button>
                <ViewMessage
                  visible={visibleMessage[rowIndex.rowIndex]}
                  onCancel={() => handleMeetingCancel(rowIndex.rowIndex)}
                  title="View Meeting"
                  data={dataViewMessage}
                  dataIndex={dataIndex}
                  handlingProps={() => handlingMeetingProps(rowIndex.rowIndex)}
                />
              </Tooltip>

            </Fragment>
          );
        },
      },
    },
  ];

  if (loading) {
    return (
      <Fragment>
        <div className="products-dropbox">
          <div className="message">
            <span>Message Count : </span>
            <span>{count ? count : 'Offer Closed'}</span>
          </div>
          <div className="products-table">
            <Table
              dataTable={data}
              table="message"
              Columns={columns}
            />
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};

export default Products;
