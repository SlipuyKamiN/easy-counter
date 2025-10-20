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
import { EssentialsCheckbox, PickUpCheckbox } from "../Common/PickUpCheckbox";

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
  essentials: [
    { name: "Toilettenpapier", available: false },
    { name: "Küchenrollen", available: false },
    { name: "Geschirrspültabs", available: false },
    { name: "Schwammtücher", available: false },
    { name: "Kaffeetabs/Tee", available: false },
    { name: "Handseife", available: false },
    { name: "Reinigungsmittel", available: false },
    { name: "Geschirrspülmittel", available: false },
    { name: "Spülschwämme", available: false },
    { name: "Zucker, Salz, Pfeffer", available: false },
    { name: "Essig, Öl", available: false },
    { name: "Duschgel/Shampoo", available: false },
  ],
};

export const EmptyRow = ({ dispatch, data }) => {
  const [create] = useAPI(API.create);
  const [newRow, setNewRow] = useState(null);

  return !newRow ? (
    <tr className={"empty-row"}>
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
      <Td className="bags-needed">0</Td>
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

      {getAllColums(data).allEssentials.map((name) => {
        const found = newRow.essentials.find((a) => a.name === name);

        return (
          <Td key={name}>
            {found ? (
              <EssentialsCheckbox
                item={newRow}
                found={found}
                onChange={(_, body) => setNewRow(body)}
              />
            ) : (
              "—"
            )}
          </Td>
        );
      })}
    </tr>
  );
};
