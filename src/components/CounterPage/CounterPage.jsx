import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import { PickUpCheckbox } from "../DashboardPage/PickUpCheckbox";
import { Counter } from "./Counter";

const CounterPage = () => {
  const { addressID } = useParams();
  const [dispatch, current, isLoading, isError] = useAPI(API.getAddress);
  const [update] = useAPI(API.update);

  useEffect(() => {
    if (!current) {
      dispatch(addressID);
    }
  }, [dispatch, current, addressID]);

  const handleCheckboxChange = (id, body) => {
    update({ id, body }).then(() => dispatch(addressID));
  };

  const handleChange = ({ name, qty, itemKey }) => {
    update({
      id: addressID,
      body: {
        ...current,
        [itemKey]: current[itemKey].map((l) => {
          if (l.name === name) {
            return { ...l, available: qty };
          }
          return l;
        }),
      },
    }).then(() => dispatch(addressID));
  };

  if (!current || isLoading) return <div>Loading...</div>;
  if (!current || isError) return <div>Error...</div>;

  const { address, linens, addOns } = current;

  return (
    <section>
      <h1>{address}</h1>
      <ul>
        <li>
          <h3>Pick-up needed:</h3>
          <PickUpCheckbox handleChange={handleCheckboxChange} item={current} />
        </li>
        <li>
          <h3>Linens:</h3>
          <ul>
            {linens.map(({ name, available }) => (
              <Counter
                key={name}
                name={name}
                available={available}
                handleChange={handleChange}
                itemKey={"linens"}
              />
            ))}
          </ul>
        </li>
        <li>
          <h3>Add-ons</h3>
          <ul>
            {addOns.map(({ name, available }) => (
              <Counter
                key={name}
                name={name}
                available={available}
                handleChange={handleChange}
                itemKey={"addOns"}
              />
            ))}
          </ul>
        </li>
      </ul>
    </section>
  );
};

export default CounterPage;
