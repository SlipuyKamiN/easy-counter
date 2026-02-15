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
import { EssentialsCheckbox, TourerSwitcher } from "../Common/Checkboxes";
import { CommentInput } from "../Common/CommentInput";
import initialEssentials from "~/data/essentials.json";
import initialLinens from "~/data/linens.json";

const initialRow = {
  address: "",
  nextTour: [],
  pickupNeeded: false,
  users: ["admin-1001"],
  linens: initialLinens,
  essentials: initialEssentials,
  cart: [],
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
          name="address"
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
          value={newRow.nextTour}
          sort
          onChange={(dates) => {
            setNewRow((prev) => ({ ...prev, nextTour: dates }));
          }}
        />
      </Td>
      <Td>
        <TourerSwitcher
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
      <Td>
        <CommentInput
          item={newRow}
          handleChange={(_, body) => setNewRow(body)}
        />
      </Td>
    </tr>
  );
};
