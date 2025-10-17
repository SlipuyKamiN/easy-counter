import { NumberInput, Td } from "./DashboardPage.styled";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import DatePicker from "react-multi-date-picker";
import { getAllColums } from "~/helpers/dashboard";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { EmptyQtyInput } from "./QtyInput";

const initialRow = {
  shortName: "",
  address: "",
  nextCheckout: [],
  pickupNeeded: false,
  linens: [
    { name: "pillow case", available: 0, minimum: 0 },
    { name: "sheets Green", available: 0, minimum: 0 },
    { name: "towel Big", available: 0, minimum: 0 },
    { name: "towel Small", available: 0, minimum: 0 },
  ],
  addOns: [
    { name: "shower gel", available: 0, minimum: 0 },
    { name: "dishwasher tabs", available: 0, minimum: 0 },
    { name: "coffee tabs green", available: 0, minimum: 0 },
  ],
};

export const EmptyRow = ({ dispatch, data }) => {
  const [create] = useAPI(API.create);
  const [newRow, setNewRow] = useState(null);

  return !newRow ? (
    <tr>
      <td>
        <button type="button" onClick={() => setNewRow(initialRow)}>
          New row
        </button>
      </td>
    </tr>
  ) : (
    <tr>
      <td>
        <button
          type="button"
          onClick={() => {
            create(newRow).then(() => {
              dispatch().then(() => setNewRow(null));
            });
          }}
        >
          <IoIosAddCircleOutline size={30} />
        </button>
      </td>
      <td>
        <input
          required
          type="text"
          onBlur={({ target }) => {
            setNewRow((prev) => ({ ...prev, address: target.value }));
          }}
        />
      </td>
      <Td>
        <DatePicker
          required
          format="DD/MM/YYYY"
          multiple
          minDate={new Date()}
          value={newRow.nextCheckout}
          sort
          onChange={(dates) => {
            setNewRow((prev) => ({ ...prev, nextCheckout: dates }));
          }}
        />
      </Td>
      <Td>
        <input
          required
          type="checkbox"
          checked={newRow.pickupNeeded}
          onChange={() => {
            setNewRow((prev) => ({
              ...prev,
              pickupNeeded: !newRow.pickupNeeded,
            }));
          }}
        />
      </Td>
      <Td>0</Td>
      {getAllColums(data).allLinens.map((name) => {
        const found = newRow.linens.find((l) => l.name === name);

        return (
          <Td key={name}>
            {found ? (
              <>
                <EmptyQtyInput
                  value={found.available}
                  setNewRow={setNewRow}
                  column={"available"}
                  itemKey={"linens"}
                  name={name}
                />
                {" / "}
                <EmptyQtyInput
                  value={found.minimum}
                  setNewRow={setNewRow}
                  column={"minimum"}
                  itemKey={"linens"}
                  name={name}
                />
              </>
            ) : (
              "—"
            )}
          </Td>
        );
      })}

      {getAllColums(data).allAddOns.map((name) => {
        const found = newRow.addOns.find((a) => a.name === name);
        return (
          <Td key={name}>
            {found ? (
              <>
                <EmptyQtyInput
                  value={found.available}
                  setNewRow={setNewRow}
                  column={"available"}
                  itemKey={"addOns"}
                  name={name}
                />
                {" / "}
                <EmptyQtyInput
                  value={found.minimum}
                  setNewRow={setNewRow}
                  column={"minimum"}
                  itemKey={"addOns"}
                  name={name}
                />
              </>
            ) : (
              "—"
            )}
          </Td>
        );
      })}
    </tr>
  );
};
