import Table from "../../common/table";
import { useTranslation } from "react-i18next";
import { Button, InputNumber, Input } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../layouts/spinner/spinner";
import { sendPrice } from "./actions";
import { Fetch } from "../../common/actions";
import {ViewMessage} from './modals'
import VisibilityIcon from "@material-ui/icons/Visibility";
import PublishIcon from "@material-ui/icons/Publish";

const Products = () => {
  const [data, setData] = useState([{ title: "Loading ..." }]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([]);

  const [visibleNegotiate, setvisibleNegotiate] = useState([]);

  const handlingPrice = (value, rowIndex) => {
    setPrice(() => {
      const newLoadings = [...price];

      newLoadings[rowIndex] = value;

      return newLoadings;
    });
  };
  const { t } = useTranslation();

  const enterMeetingVisible = (index, zoomId) => {

    for (let x in visibleNegotiate) {

      visibleNegotiate[x] = false;

    }
    setvisibleNegotiate(() => {
      const newLoadings = [...visibleNegotiate];

      newLoadings[index] = true;

      return newLoadings;
    });
  };

  const handlingMeetingProps = (index) => {
    setvisibleNegotiate(() => {
      const newLoadings = [...visibleNegotiate];

      newLoadings[index] = false;

      return newLoadings;
    });
  };

  const handleMeetingCancel = (index) => {
    setvisibleNegotiate(() => {
      const newLoadings = [...visibleNegotiate];

      newLoadings[index] = false;

      return newLoadings;
    });
  };

  useEffect(() => {
    Fetch("negotiate").then((res) => {
      if (res.status) {
        setData(res.data);
        setLoading(true);
      }else{
        setData([])
        setLoading(true);
      }
    });
  }, []);

  const columns = [
    {
      label: t("code"),
      name: "code",
    },
    {
      label: t("product.title"),
      name: "product.title",
    },
    {
      label: t("order.buyer"),
      name: "buyer.name",
    },
    {
      label: t("price"),
      name: "price",
    },
    {
      label: t("negotiate.seller"),
      name: "price_seller",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex) => {
          return (
            <Fragment>
              <Input.Group compact>
                <InputNumber
                  defaultValue={dataIndex}
                  name="price"
                  placeholder="Price Value"
                  formatter={(value) =>
                    `SAR ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  step="number"
                  parser={(value) => value.replace(/\SAR\s?|(,*)/g, "")}
                  onChange={(value) => handlingPrice(value, rowIndex.rowIndex)}
                />
                <Button
                  onClick={() => {
                    sendPrice(
                      rowIndex.tableData[rowIndex.rowIndex].id,
                      price[rowIndex.rowIndex]
                        ? price[rowIndex.rowIndex]
                        : dataIndex
                    );
                  }}
                >
                  <PublishIcon />
                </Button>
              </Input.Group>
            </Fragment>
          );
        },
      },
    },
    {
      label: t("Actions"),
      name: "notes",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex) => {
          return (
            <Fragment>
              <Button onClick={() =>
                    enterMeetingVisible(rowIndex.rowIndex, dataIndex)
                  }>
                <VisibilityIcon />
              </Button>
              <ViewMessage
                  visible={visibleNegotiate[rowIndex.rowIndex]}
                  onCancel={() => handleMeetingCancel(rowIndex.rowIndex)}
                  title="View Negotiate"
                  dataIndex={dataIndex}
                  handlingProps={() => handlingMeetingProps(rowIndex.rowIndex)}
                />
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
              table="negotiate"
              Columns={columns}
              options={options}
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
