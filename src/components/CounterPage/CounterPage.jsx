import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import { PickUpCheckbox } from "../Common/PickUpCheckbox";
import { Counter } from "./Counter";
import { Container, Section } from "../SharedLayout/SharedLayout.styled";
import { Heading, PickupWrapper } from "./CounterPage.styled";

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
    <Section>
      <Container>
        <Heading>{address}</Heading>
        <ul>
          <PickupWrapper>
            <h3>Pick-up needed:</h3>
            <PickUpCheckbox
              handleChange={handleCheckboxChange}
              onChange={() =>
                handleCheckboxChange(current.id, {
                  ...current,
                  pickupNeeded: !current.pickupNeeded,
                })
              }
              item={current}
            />
          </PickupWrapper>
          {linens.map(({ name, available }) => (
            <Counter
              key={name}
              name={name}
              available={available}
              handleChange={handleChange}
              itemKey={"linens"}
            />
          ))}
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
      </Container>
    </Section>
  );
};

export default CounterPage;
