import { useEffect } from "react";
import { QtyInput, Td, Th } from "./DataPage.styled";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import DatePicker from "react-multi-date-picker";

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
      </tbody>
    </table>
  );
};

export default DataPage;
