import { useEffect, useState } from "react";
import { DeleteBtn, QtyInput, Td, Th } from "./DashboardPage.styled";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import DatePicker from "react-multi-date-picker";
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosAddCircleOutline } from "react-icons/io";

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

const countBags = (item) => {
  const bagIncludes = {
    ["pillow case"]: 6,
    ["sheets Green"]: 3,
    ["towel Big"]: 6,
    ["towel Small"]: 6,
  };

  let bagsNeeded = 0;

  item.linens.map((l) => {
    const neededBagsLinen = (l.minimum * 2 - l.available) / bagIncludes[l.name];

    bagsNeeded = bagsNeeded > neededBagsLinen ? bagsNeeded : neededBagsLinen;
  });

  return Math.round(bagsNeeded);
};

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
    "Bags needed",
    ...allLinens,
    ...allAddOns,
  ];

  return { allColumns, allLinens, allAddOns };
};

const DataPage = () => {
  const [dispatch, data, isLoading, isError] = useAPI(API.getAll);
  const [update] = useAPI(API.update);
  const [deleteRow] = useAPI(API.delete);
  const [create] = useAPI(API.create);
  const [newRow, setNewRow] = useState(null);

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
          {newRow && (
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
                        <QtyInput
                          required
                          type="number"
                          min={0}
                          maxLength={3}
                          value={found.available}
                          onChange={({ target }) => {
                            const value = Number(target.value);
                            setNewRow((prev) => ({
                              ...prev,
                              linens: prev.linens.map((l) => {
                                if (l.name === name) {
                                  return { ...l, available: value };
                                }
                                return l;
                              }),
                            }));
                          }}
                        />
                        {" / "}
                        <QtyInput
                          required
                          type="number"
                          min={0}
                          maxLength={3}
                          value={found.minimum}
                          onChange={({ target }) => {
                            const value = Number(target.value);
                            setNewRow((prev) => ({
                              ...prev,
                              linens: prev.linens.map((l) => {
                                if (l.name === name) {
                                  return { ...l, minimum: value };
                                }
                                return l;
                              }),
                            }));
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
                const found = newRow.addOns.find((a) => a.name === name);
                return (
                  <Td key={name}>
                    {found ? (
                      <>
                        <QtyInput
                          required
                          type="number"
                          min={0}
                          maxLength={3}
                          value={found.available}
                          onChange={({ target }) => {
                            const value = Number(target.value);
                            setNewRow((prev) => ({
                              ...prev,
                              addOns: prev.addOns.map((l) => {
                                if (l.name === name) {
                                  return { ...l, available: value };
                                }
                                return l;
                              }),
                            }));
                          }}
                        />
                        {" / "}
                        <QtyInput
                          required
                          type="number"
                          min={0}
                          maxLength={3}
                          value={found.minimum}
                          onChange={({ target }) => {
                            const value = Number(target.value);
                            setNewRow((prev) => ({
                              ...prev,
                              addOns: prev.addOns.map((l) => {
                                if (l.name === name) {
                                  return { ...l, minimum: value };
                                }
                                return l;
                              }),
                            }));
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
          )}
        </tbody>
      </table>
      {!newRow && (
        <button type="button" onClick={() => setNewRow(initialRow)}>
          New row
        </button>
      )}
    </>
  );
};

export default DataPage;
