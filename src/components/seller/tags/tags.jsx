import Table from "../../common/table";
import Columns from "../../common/columnTable";
import { useTranslation } from "react-i18next";
import { Tooltip, Popconfirm, Button } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import {Fetch} from '../../common/actions'

import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";


const Products = () => {
  const [visible, setVisible] = useState([]);
  const [loadings, setLoading] = useState([]);
  const [isTag, setTag] = useState(undefined);
  const [data, setData] = useState([{ title: "Loading ..." }]);

  const { t } = useTranslation();

  useEffect(() => {
    Fetch("tag").then((res) => {
      if (res.status) {
        setData(res.data);
        setLoading(true);
      }else{
        setData([]);
        setLoading(true);
      }
    });
  }, []);

  const columns = [
    {
      label: "ID",
      name: "id",
    },
    {
      label: t("product.title"),
      name: "title",
    },
    {
      label: t("tag.status"),
      name: "tag_status",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex) => {
          return (
            <Fragment>
              <Tooltip title="Tag Status" placement="bottom">
                <Popconfirm
                  title={t(`tag.status`)}
                  placement="topLeft"
                  visible={visible[rowIndex.rowIndex]}
                  onConfirm={() => Delete(rowIndex.rowIndex)}
                  okButtonProps={{ loading: loadings[rowIndex.rowIndex] }}
                  onCancel={() => handleCancel(rowIndex.rowIndex)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button onClick={() => enterVisible(rowIndex.rowIndex)}>
                    {
                      (isTag === undefined) ? (dataIndex ? <LockOpenIcon /> : <LockIcon />) : (isTag ? <LockOpenIcon /> : <LockIcon />)
                    }
                  </Button>
                </Popconfirm>
              </Tooltip>
            </Fragment>
          );
        },
      },
    },
    {
      label: t("tag.admin.status"),
      name: "admin_status",
      options: {
        filter: false,
        empty: true,
        customBodyRender: (dataIndex, rowIndex) => {
          return (
            <Fragment>
              <Tooltip title="Admin Status" placement="bottom">
                <Button>{dataIndex ? <LockOpenIcon /> : <LockIcon />}</Button>
              </Tooltip>
            </Fragment>
          );
        },
      },
    },
  ];

  const enterVisible = (index) => {

    for (let x in visible) {

      visible[x] = false;
      
    }

    setVisible(() => {
      const newLoadings = [...visible];

      newLoadings[index] = true;

      return newLoadings;
    });
  };

  const handleCancel = (index) => {
    
    setVisible(() => {
      const newLoadings = [...visible];

      newLoadings[index] = false;

      return newLoadings;
    });
  };

  const Delete = (target) => {
    setLoading(() => {
      const newLoadings = [...loadings];

      newLoadings[target] = true;

      return newLoadings;
    });
  };

  return (
    <Fragment>
      <div className="products-dropbox">
        <div className="products-table">
          <Table
            dataTable={data}
            table="tag"
            Columns={Columns("tag", columns)}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Products;
