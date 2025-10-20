import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import { PickUpCheckbox, EssentialsCheckbox } from "../Common/PickUpCheckbox";
import { Counter } from "./Counter";
import { Container, Section } from "../SharedLayout/SharedLayout.styled";
import { CounterItem, Heading, PickupWrapper } from "./CounterPage.styled";
import { StateIndicator } from "../Common/StateIndicator";
import throttle from "lodash.throttle";

const CounterPage = () => {
  const { addressID } = useParams();
  const [dispatch, current, isLoading, isError] = useAPI(API.getAddress);
  const [update] = useAPI(API.update);

  const currentRef = useRef(current);
  currentRef.current = current;

  useEffect(() => {
    if (!current) {
      dispatch(addressID);
    }
  }, [dispatch, current, addressID]);

  const throttledHandleChange = useRef(
    throttle(({ name, qty, itemKey }) => {
      update({
        id: addressID,
        body: {
          ...currentRef.current,
          [itemKey]: currentRef.current[itemKey].map((l) =>
            l.name === name ? { ...l, available: qty } : l
          ),
        },
      }).then(() => dispatch(addressID));
    }, 1000)
  ).current;

  const throttledCheckboxChange = useRef(
    throttle((id, body) => {
      update({ id, body }).then(() => dispatch(addressID));
    }, 200)
  ).current;

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
                <h3>Abholung:</h3>
                <PickUpCheckbox
                  onChange={() =>
                    throttledCheckboxChange(current.id, {
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
                  handleChange={throttledHandleChange}
                  itemKey={"linens"}
                />
              ))}
              {current.essentials.map((found) => (
                <CounterItem key={found.name}>
                  <h3>{found.name}</h3>
                  <EssentialsCheckbox
                    item={current}
                    found={found}
                    onChange={throttledCheckboxChange}
                  />
                </CounterItem>
              ))}
            </ul>
          </>
        )}
      </Container>
    </Section>
  );
};

export default CounterPage;
