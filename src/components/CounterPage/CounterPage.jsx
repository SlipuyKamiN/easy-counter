import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import { PickUpCheckbox } from "../Common/PickUpCheckbox";
import { Counter } from "./Counter";
import { Container, Section } from "../SharedLayout/SharedLayout.styled";
import { Heading, PickupWrapper } from "./CounterPage.styled";
import { StateIndicator } from "../Common/StateIndicator";

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

  return (
    <Section>
      <Container>
        <StateIndicator
          isLoading={isLoading}
          isError={isError}
          success={current}
          text={isError && "Something went wrong... "}
        />
        {current && !isError && (
          <>
            <Heading>{current.address}</Heading>
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
              {current.linens.map(({ name, available }) => (
                <Counter
                  key={name}
                  name={name}
                  available={available}
                  handleChange={handleChange}
                  itemKey={"linens"}
                />
              ))}
              {current.addOns.map(({ name, available }) => (
                <Counter
                  key={name}
                  name={name}
                  available={available}
                  handleChange={handleChange}
                  itemKey={"addOns"}
                />
              ))}
            </ul>
          </>
        )}
      </Container>
    </Section>
  );
};

export default CounterPage;
