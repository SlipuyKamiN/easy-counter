import {
  AddressInput,
  PlusBtn,
  TableInputWrapper,
  Td,
} from "./DashboardPage.styled";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import DatePicker from "react-multi-date-picker";
import { getAllColums } from "~/helpers/dashboard";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { EmptyQtyInput } from "../Common/QtyInput";
import { PickUpCheckbox } from "../Common/PickUpCheckbox";

const initialRow = {
  address: "",
  nextCheckout: [],
  pickupNeeded: false,
  linens: [
    { name: "Bettbezüge", available: 0, minimum: 0 },
    { name: "Kissenbezüge", available: 0, minimum: 0 },
    { name: "Laken grün", available: 0, minimum: 0 },
    { name: "Laken orange", available: 0, minimum: 0 },
    { name: "Duschtücher", available: 0, minimum: 0 },
    { name: "Handtücher", available: 0, minimum: 0 },
    { name: "Badvorleger", available: 0, minimum: 0 },
    { name: "Geschirrtücher", available: 0, minimum: 0 },
  ],
  addOns: [
    { name: "Toilettenpapier", available: 0, minimum: 0 },
    { name: "Küchenrollen", available: 0, minimum: 0 },
    { name: "Geschirrspültabs", available: 0, minimum: 0 },
    { name: "Schwammtücher", available: 0, minimum: 0 },
    { name: "Kaffeetabs/Tee", available: 0, minimum: 0 },
    { name: "Handseife", available: 0, minimum: 0 },
    { name: "Reinigungsmittel", available: 0, minimum: 0 },
    { name: "Geschirrspülmittel", available: 0, minimum: 0 },
    { name: "Spülschwämme", available: 0, minimum: 0 },
    { name: "Zucker, Salz, Pfeffer", available: 0, minimum: 0 },
    { name: "Essig, Öl", available: 0, minimum: 0 },
    { name: "Duschgel/Shampoo", available: 0, minimum: 0 },
  ],
};

export const EmptyRow = ({ dispatch, data }) => {
  const [create] = useAPI(API.create);
  const [newRow, setNewRow] = useState(null);

  return !newRow ? (
    <tr>
      <Td>
        <PlusBtn type="button" onClick={() => setNewRow(initialRow)}>
          <IoIosAddCircleOutline size={34} />
        </PlusBtn>
      </Td>
    </tr>
  ) : (
    <tr>
      <Td>
        <PlusBtn
          className="active"
          type="button"
          onClick={() => {
            create(newRow).then(() => {
              dispatch().then(() => setNewRow(null));
            });
          }}
        >
          <IoIosAddCircleOutline size={34} />
        </PlusBtn>
      </Td>
      <Td>
        <AddressInput
          required
          type="text"
          onBlur={({ target }) => {
            setNewRow((prev) => ({ ...prev, address: target.value }));
          }}
        />
      </Td>
      <Td>
        <DatePicker
          required
          placeholder=" - "
          inputClass="date-picker"
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
        <PickUpCheckbox
          required
          type="checkbox"
          checked={newRow.pickupNeeded}
          item={newRow}
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
              <TableInputWrapper>
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
              </TableInputWrapper>
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
              <TableInputWrapper>
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
              </TableInputWrapper>
            ) : (
              "—"
            )}
          </Td>
        );
      })}
    </tr>
  );
};
