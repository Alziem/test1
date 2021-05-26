import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Tooltip, Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { UpdateStatus } from "./actions";
/// Icons

import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const Columns = (table, columns, model = false) => {
  const [isProduct, setProduct] = useState([]);
  const [loadings, setLoading] = useState([]);
  const [visible, setVisible] = useState([]);

  const { t } = useTranslation();

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

  const Action = (id, index) => {

    setLoading(() => {

      const newLoadings = [...loadings];

      newLoadings[index] = true;

      return newLoadings;
    });

    UpdateStatus(table, id).then((res) => {

      if (res.status) {

        setProduct(() => {
          
          const newLoadings = [...isProduct];

          newLoadings[id] = res.data.status;

          return newLoadings;
        });

        setLoading(() => {
          const newLoadings = [...loadings];

          newLoadings[index] = false;

          return newLoadings;
        });

        setVisible(() => {
          const newLoadings = [...visible];

          newLoadings[index] = false;

          return newLoadings;
        });
      }
    });
  };

  return [
    ...columns,
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
                <Button>
                  <Link to={`${table}/${dataIndex}`}>
                    <VisibilityIcon />
                  </Link>
                </Button>
              </Tooltip>

              <Tooltip title="Edit" placement="bottom">
                <Button>
                  <Link to={`${table}/${dataIndex}/edit`}>
                    <EditIcon />
                  </Link>
                </Button>
              </Tooltip>

              {table === "product" ? (
                <Tooltip title="Status" placement="bottom">
                  <Popconfirm
                    title={t(`product.status`)}
                    placement="topLeft"
                    visible={visible[rowIndex.rowIndex]}
                    onConfirm={() => Action(dataIndex, rowIndex.rowIndex)}
                    okButtonProps={{ loading: loadings[rowIndex.rowIndex] }}
                    onCancel={() => handleCancel(rowIndex.rowIndex)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button onClick={() => enterVisible(rowIndex.rowIndex)}>
                      {rowIndex.tableData[rowIndex.rowIndex].status ? (
                        isProduct.includes(dataIndex) ? (
                          <LockIcon />
                        ) : (
                          <LockOpenIcon />
                        )
                      ) : isProduct[dataIndex] ? (
                        <LockOpenIcon />
                      ) : (
                        <LockIcon />
                      )}
                    </Button>
                  </Popconfirm>
                </Tooltip>
              ) : null}
            </Fragment>
          );
        },
      },
    },
  ];
};

export default Columns;
