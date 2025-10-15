import { useParams } from "react-router-dom";
import { data } from "~/data/data";

const CounterPage = () => {
  const { addressID } = useParams();
  const currentAddress = data.find(({ id }) => id === addressID);
  const { linens, shortName, address, addOns, pickupNeeded } = currentAddress;

  return (
    <section>
      <h1>{shortName}</h1>
      <p>{address}</p>
      <ul>
        <li>
          <h3>Pick-up needed:</h3>
          <input type="checkbox" checked={pickupNeeded} />
        </li>
        <li>
          <h3>Linens:</h3>
          <ul>
            {linens.map(({ name, available }) => {
              return (
                <li>
                  <h4>{name}</h4>
                  <input type="number" value={available} />
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          <h3>Add-ons</h3>
          <ul>
            {addOns.map(({ name, available }) => {
              return (
                <li>
                  <h4>{name}</h4>
                  <input type="number" value={available} />
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </section>
  );
};

export default CounterPage;
