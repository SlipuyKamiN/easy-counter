import { data } from "~/data/data";
import { QtyInput, Td, Th } from "./DataPage.styled";
import { createAddress, getDataSheet } from "~/API/API";

const allLinens = Array.from(
  new Set(data.flatMap((item) => item.linens.map((l) => l.name)))
);
const allAddOns = Array.from(
  new Set(data.flatMap((item) => item.addOns.map((a) => a.name)))
);
const allColumns = [
  "Address",
  "Next Checkout",
  "Pickup Needed",
  ...allLinens,
  ...allAddOns,
];

getDataSheet();
createAddress({ name: "Vasia", address: "Add" });

const DataPage = () => {
  return (
    <table>
      <thead>
        <tr>
          {allColumns.map((col) => (
            <Th key={col}>{col}</Th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.address}</td>
            <Td>{item.nextCheckout}</Td>
            <Td>{item.pickupNeeded ? "Yes" : "No"}</Td>

            {allLinens.map((name) => {
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

            {allAddOns.map((name) => {
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
