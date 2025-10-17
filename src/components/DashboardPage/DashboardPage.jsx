import { useEffect } from "react";
import { DeleteBtn, Td, Th } from "./DashboardPage.styled";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import DatePicker from "react-multi-date-picker";
import { TiDeleteOutline } from "react-icons/ti";
import { countBags, getAllColums } from "~/helpers/dashboard";
import { EmptyRow } from "./EmptyRow";
import { QtyInput } from "./QtyInput";

const DashboardPage = () => {
  const [dispatch, data, isLoading, isError] = useAPI(API.getAll);
  const [update] = useAPI(API.update);
  const [deleteRow] = useAPI(API.delete);

  useEffect(() => {
    if (!data) {
      dispatch();
    }
  }, [dispatch, data]);

  const handleChange = (id, body) => {
    update({ id, body }).then(() => dispatch());
  };

  // console.log(data, isLoading, isError);

  if (!data || isLoading) return <div>Loading...</div>;
  if (!data || isError) return <div>Error...</div>;

  return (
    <>
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
                <input
                  type="checkbox"
                  checked={item.pickupNeeded}
                  onChange={() =>
                    handleChange(item.id, {
                      ...item,
                      pickupNeeded: !item.pickupNeeded,
                    })
                  }
                />
              </Td>
              <Td>{countBags(item)}</Td>
              {getAllColums(data).allLinens.map((name) => {
                const found = item.linens.find((l) => l.name === name);

                return (
                  <Td key={name}>
                    {found ? (
                      <>
                        <QtyInput
                          type="number"
                          min={0}
                          maxLength={3}
                          defaultValue={found.available}
                          onBlur={({ target }) => {
                            const value = Number(target.value);
                            if (found.available === value || value < 0) return;
                            handleChange(item.id, {
                              ...item,
                              linens: item.linens.map((l) => {
                                if (l.name === found.name) {
                                  l.available = value;
                                }

                                return l;
                              }),
                            });
                          }}
                        />
                        {" / "}
                        <QtyInput
                          type="number"
                          min={0}
                          maxLength={3}
                          defaultValue={found.minimum}
                          onBlur={({ target }) => {
                            const value = Number(target.value);
                            if (found.minimum === value) return;
                            handleChange(item.id, {
                              ...item,
                              linens: item.linens.map((l) => {
                                if (l.name === found.name) {
                                  l.minimum = value;
                                }

                                return l;
                              }),
                            });
                          }}
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
                          type="number"
                          min={0}
                          maxLength={3}
                          defaultValue={found.available}
                          onBlur={({ target }) => {
                            const value = Number(target.value);
                            if (found.available === value || value < 0) return;
                            return handleChange(item.id, {
                              ...item,
                              addOns: item.addOns.map((l) => {
                                if (l.name === found.name) {
                                  l.available = value;
                                }

                                return l;
                              }),
                            });
                          }}
                        />
                        {" / "}
                        <QtyInput
                          type="number"
                          min={0}
                          maxLength={3}
                          defaultValue={found.minimum}
                          onBlur={({ target }) => {
                            const value = Number(target.value);

                            if (found.minimum === value) return;
                            handleChange(item.id, {
                              ...item,
                              addOns: item.addOns.map((l) => {
                                if (l.name === found.name) {
                                  l.minimum = value;
                                }

                                return l;
                              }),
                            });
                          }}
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
