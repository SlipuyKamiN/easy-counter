import { useEffect, useState } from "react";
import { DeleteBtn, Td, Th } from "./DashboardPage.styled";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import DatePicker from "react-multi-date-picker";
import { TiDeleteOutline } from "react-icons/ti";
import { countBags, getAllColums, getSortBy } from "~/helpers/dashboard";
import { EmptyRow } from "./EmptyRow";
import { QtyInput } from "./QtyInput";
import { PickUpCheckbox } from "./PickUpCheckbox";

const DashboardPage = () => {
  const [dispatch, data, isLoading, isError] = useAPI(API.getAll);
  const [update] = useAPI(API.update);
  const [deleteRow] = useAPI(API.delete);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (!data) {
      dispatch();
    }
  }, [dispatch, data]);

  const handleChange = (id, body) => {
    update({ id, body }).then(() => dispatch());
  };

  if (!data || isLoading) return <div>Loading...</div>;
  if (!data || isError) return <div>Error...</div>;

  return (
    <>
      <table>
        <thead>
          <tr>
            {getAllColums(data).allColumns.map((col, i) => {
              if (i <= 2) {
                return (
                  <Th key={col}>
                    <button
                      type="button"
                      onClick={() => setSortBy(col.toLowerCase())}
                    >
                      {col}
                    </button>
                  </Th>
                );
              }

              return <Th key={col}>{col}</Th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.sort(getSortBy(sortBy)).map((item) => (
            <tr key={item.id}>
              <td>
                <DeleteBtn
                  type="button"
                  onClick={() => deleteRow(item.id).then(dispatch)}
                >
                  {item.id}
                  <span>
                    <TiDeleteOutline size={30} />
                  </span>
                </DeleteBtn>
              </td>
              <td>{item.address}</td>
              <Td>
                <DatePicker
                  format="DD/MM/YYYY"
                  multiple
                  minDate={new Date()}
                  value={item.nextCheckout}
                  sort
                  onChange={(dates) => (item.nextCheckout = dates)}
                  onClose={() => {
                    handleChange(item.id, item);
                  }}
                />
              </Td>
              <Td>
                <PickUpCheckbox handleChange={handleChange} item={item} />
              </Td>
              <Td>{countBags(item)}</Td>
              {getAllColums(data).allLinens.map((name) => {
                const found = item.linens.find((l) => l.name === name);

                return (
                  <Td key={name}>
                    {found ? (
                      <>
                        <QtyInput
                          item={item}
                          found={found}
                          itemKey={"linens"}
                          column={"available"}
                          defaultValue={found.available}
                          handleChange={handleChange}
                        />
                        {" / "}
                        <QtyInput
                          item={item}
                          found={found}
                          itemKey={"linens"}
                          column={"minimum"}
                          handleChange={handleChange}
                          defaultValue={found.minimum}
                        />
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
                        <QtyInput
                          item={item}
                          found={found}
                          itemKey={"addOns"}
                          column={"available"}
                          handleChange={handleChange}
                          defaultValue={found.available}
                        />
                        {" / "}
                        <QtyInput
                          item={item}
                          found={found}
                          itemKey={"addOns"}
                          column={"minimum"}
                          handleChange={handleChange}
                          defaultValue={found.minimum}
                        />
                      </>
                    ) : (
                      "—"
                    )}
                  </Td>
                );
              })}
            </tr>
          ))}
          <EmptyRow dispatch={dispatch} data={data} />
        </tbody>
      </table>
    </>
  );
};

export default DashboardPage;
