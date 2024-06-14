import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

function BookingsList(props) {
  return (
    <>
      <Card>
        <CardBody className="overflow-scroll lg:overflow-auto px-0 py-0">
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
                            className="font-normal flex flex-col"
                          >
                            <Link
                              to={"/vendor/property/details"}
                              state={{
                                property_id: vendor.propertyInfo.property_id,
                              }}
                              className="font-semibold"
                            >
                              {vendor.propertyInfo.property_name}
                            </Link>
                            <span className="text-gray-500">
                              City: {vendor.propertyInfo.city}
                            </span>
                            <span className="text-gray-500">
                              Locality: {vendor.propertyInfo.locality}
                            </span>
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
                        ₹{vendor.propertyInfo.price}/-
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-red-500 bg-red-100 w-fit px-2 rounded"
                      >
                        {vendor.propertyInfo.prop_status === 1
                          ? "Ready To Buy"
                          : vendor.propertyInfo.prop_status === 2
                          ? "Upcoming"
                          : vendor.propertyInfo.prop_status === 3
                          ? "Sold"
                          : vendor.propertyInfo.prop_status === 4
                          ? "Rented"
                          : ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal flex flex-col"
                      >
                        <span className="capitalize font-semibold">
                          {vendor.accountInfo.name}
                        </span>
                        <span className="text-gray-500">
                          {vendor.accountInfo.role === 3
                            ? "User"
                            : vendor.accountInfo.role === 2
                            ? "Vendor"
                            : vendor.accountInfo.role === 1
                            ? "Admin"
                            : ""}
                        </span>
                        <span className="text-gray-500">
                          {vendor.accountInfo.email}
                        </span>
                        <span className="text-gray-500">
                          {vendor.accountInfo.phone}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`font-normal w-fit px-2 rounded`}
                      >
                        {vendor.booked_on}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`font-normal w-fit px-2 rounded ${
                          vendor.isaccepted === 0
                            ? "bg-blue-gray-500 text-white"
                            : vendor.isaccepted === 1
                            ? "bg-green-100 text-green-700"
                            : ""
                        }`}
                      >
                        {vendor.isaccepted === 0
                          ? "Pending"
                          : vendor.isaccepted === 1
                          ? "Accepted"
                          : ""}
                      </Typography>
                    </td>
                    {vendor.isaccepted === 0 ? (
                      <td className={classes}>
                        <Button
                          className="bg-green-500"
                          onClick={() =>
                            props.handleAcceptBooking(vendor.bookin_id)
                          }
                        >
                          Accept
                        </Button>
                      </td>
                    ) : (
                      <td className={classes}></td>
                    )}
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

export default BookingsList;
