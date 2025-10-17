import { useEffect } from "react";
import { QtyInput, Td, Th } from "./DataPage.styled";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";

const getAllColums = (data) => {
  const allLinens = Array.from(
    new Set(data.flatMap((item) => item.linens.map((l) => l.name)))
  );
  const allAddOns = Array.from(
    new Set(data.flatMap((item) => item.addOns.map((a) => a.name)))
  );
  const allColumns = [
    "id",
    "Address",
    "Next Checkout",
    "Pickup Needed",
    ...allLinens,
    ...allAddOns,
  ];

  return { allColumns, allLinens, allAddOns };
};

const DataPage = () => {
  const [dispatch, data, isLoading, isError] = useAPI(API.getAll);

  useEffect(() => {
    if (!data) {
      dispatch();
    }
  }, [dispatch, data]);

  console.log(data, isLoading, isError);
  if (!data || isLoading) return <div>Loading...</div>;
  if (!data || isError) return <div>Error...</div>;

  return (
    <table>
      <thead>
        <tr>
          {getAllColums(data).allColumns.map((col) => (
            <Th key={col}>{col}</Th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.address}</td>
            <Td>{item.nextCheckout}</Td>
            <Td>
              <input
                type="checkbox"
                checked={item.pickupNeeded}
                onChange={() => {
                  item.pickupNeeded = !item.pickupNeeded;
                  API.update(item.id, item);
                }}
              />
            </Td>

            {getAllColums(data).allLinens.map((name) => {
              const found = item.linens.find((l) => l.name === name);

              return (
                <Td key={name}>
                  {found ? (
                    <>
                      <QtyInput type="number" defaultValue={found.available} />
                      {" / "}
                      <QtyInput type="number" defaultValue={found.minimum} />
                    </>
                  ) : (
                    "—"
                  )}
                </Td>
              );
            })}

            {getAllColums(data).allAddOns.map((name) => {
              const found = item.addOns.find((a) => a.name === name);
              return (
                <Td key={name}>
                  {found ? (
                    <>
                      <QtyInput type="number" defaultValue={found.available} />
                      {" / "}
                      <QtyInput type="number" defaultValue={found.minimum} />
                    </>
                  ) : (
                    "—"
                  )}
                </Td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataPage;
