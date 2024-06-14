import { Card, CardBody, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

function VendorsList(props) {
  return (
    <>
      <Card>
        <CardBody className="overflow-scroll lg:overflow-auto px-0">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                {props.TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.TABLE_ROWS.map((vendor, index) => {
                const isLast = index === props.TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            <Link to={"/admin/vendor/list_properties"} state={vendor}>
                              {vendor.name}
                            </Link>
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {vendor.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {vendor.phone}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
}

export default VendorsList;
