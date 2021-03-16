import {
  DataTable,
  Loading,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "carbon-components-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { getBookings, getToken } from "../api";
import Booking from "../components/Booking";
import { CacheContext } from "../components/DataProvider";

const headers = [
  {
    key: "0",
    header: "Groups",
  },
  {
    key: "1",
    header: "09:00 - 10:00",
  },
  {
    key: "2",
    header: "10:20 - 11:20",
  },
  {
    key: "3",
    header: "12:00 - 13:00",
  },
  {
    key: "4",
    header: "13:20 - 14:20",
  },
  {
    key: "5",
    header: "14:40 - 15:40",
  },
  {
    key: "6",
    header: "16:00 - 17:00",
  },
];

function findBooking(bookings, group, period) {
  if (bookings === null) {
    return null;
  }
  return bookings.find(
    (booking) => booking.group === group.id && booking.period === period
  );
}

function TablePage() {
  const [bookings, setBookings] = useState(null);
  const cache = useContext(CacheContext);

  const rows = useMemo(
    () =>
      Object.values(cache.groups).map((group) => ({
        id: `${group.id}`,
        0: group.name,
        1: findBooking(bookings, group, "1"),
        2: findBooking(bookings, group, "2"),
        3: findBooking(bookings, group, "3"),
        4: findBooking(bookings, group, "4"),
        5: findBooking(bookings, group, "5"),
        6: findBooking(bookings, group, "6"),
      })),
    [cache.groups, bookings]
  );

  useEffect(() => {
    async function fetchData() {
      const token = await getToken("admin", "admin");
      const res = await getBookings(token);
      setBookings(res);
    }
    fetchData();
  }, []);

  if (bookings === null) {
    return <Loading description="Loading timetable" />;
  }

  return (
    <>
      <DataTable rows={rows} headers={headers}>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getTableProps,
          getTableContainerProps,
        }) => (
          <TableContainer
            title="Time Table"
            description="Time table for all groups"
            {...getTableContainerProps()}
          >
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      key={header.key}
                      {...getHeaderProps({ header })}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    {row.cells.map((cell, idx) => (
                      <TableCell key={cell.id}>
                        {idx === 0 ? cell.value : null}
                        {idx > 0 && cell.value ? (
                          <Booking booking={cell.value} />
                        ) : null}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </>
  );
}

export default TablePage;
