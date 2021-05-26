import { useTranslation } from "react-i18next";
import { Table, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import Spinner from "../layouts/spinner/spinner";
import { Delete, Fetch } from "../../common/actions";

const columns = [
  {
    title: "Code",
    dataIndex: "code",
  },
  {
    title: "Description",
    dataIndex: "title",
  },
  {
    title: "Qty",
    dataIndex: "count",
  },
  {
    title: "Amount",
    dataIndex: "price",
  },
];

const dataTable = [
  {
    key: "1",
    code: "RT45667445ER",
    title: "Hello Come Back",
    count: 3,
    price: "700 ASR",
  },
];

const Products = () => {
  const [loadings, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    Fetch("invoice").then((res) => {
      if (res.status) {
        setData(res.data);
        setLoading(true);
      }else{
        setLoading(true);
        setData(null);
      }
    });
  }, []);

  const deleteAction = (index) => {

    setActive(true);

    if(Delete('invoice',index)){

      setVisible(false);

      setActive(false);

    }

  };

  if (loadings) {
    return (
      <Fragment>
        <div className="invoice">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-12 m-auto">
                <div className="invoice-content mt-5">
                  <div className="invoice-details">
                    <div className="invoice-top d-flex">
                      <div className="company-logo">
                        <img src={data.image} alt="logo" />
                        <div className="company-options">
                          <Button>
                            {data.id ? (
                              <Link to={`/dashboard/invoice/${data.id}/edit`}>
                                Update
                              </Link>
                            ) : (
                              <Link to={`/dashboard/invoice/create`}>
                                Create
                              </Link>
                            )}
                          </Button>
                          {data.id ? (
                            <Popconfirm
                              title={t(`invoice.status`)}
                              placement="bottomLeft"
                              visible={visible}
                              onConfirm={() => deleteAction(data.id)}
                              okButtonProps={{ loading: active }}
                              onCancel={() => setVisible(false)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button onClick={() => setVisible(true)}>
                                Delete
                              </Button>
                            </Popconfirm>
                          ) : (
                            false
                          )}
                        </div>
                      </div>
                      <div className="company-name">
                        <span>Company Name : </span>
                        <span>{data.name}</span>
                      </div>
                    </div>

                    <div className="invoice-bottom">
                      <div className="invoice-buyer-info">
                        <div className="invoice-buyer">
                          <div>
                            <span>To :</span> <span>Mahmoud Abd Alziem</span>
                          </div>
                          <div>
                            <span>E-Mail :</span>{" "}
                            <span>mbdalzym376@gmail.com</span>
                          </div>
                          <div>
                            <span>Address :</span>{" "}
                            <span>Bahtit,AbuHammed Elsharquia</span>
                          </div>
                        </div>

                        <div className="invoice-info">
                          <ul>
                            <li>
                              <span>Invoice Number : </span>
                              <span>RT45667445ER</span>
                            </li>
                            <li>
                              <span>Invoice Date : </span>
                              <span>2021/9/8</span>
                            </li>
                            <li>
                              <span>Payment Method : </span>
                              <span>Cash</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="invoice-orders">
                        <Table
                          columns={columns}
                          dataSource={dataTable}
                          pagination={false}
                        />
                      </div>
                    </div>

                    <div className="invoice-total d-flex">
                      <div className="total">
                        <span>Total :</span>
                        <span>5000 ASR</span>
                      </div>
                      <div className="code">
                        <span>Code : </span>
                        <span>&TYG5664355YT&</span>
                      </div>
                    </div>

                    <div className="invoice-footer">
                      All Data in This Invoice Belongs to Company
                    </div>
                  </div>
                </div>
              </div>
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
