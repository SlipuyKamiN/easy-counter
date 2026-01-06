import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import { EssentialsCheckbox } from "../Common/Checkboxes";
import { Counter } from "./Counter";
import { Container, Section } from "../SharedLayout/SharedLayout.styled";
import { CounterItem, Heading } from "./CounterPage.styled";
import { StateIndicator } from "../Common/StateIndicator";
import throttle from "lodash.throttle";
import useWakeLock from "~/hooks/useWakeLock";
import { CommentInput } from "../Common/CommentInput";
import { CheckList } from "./CheckList";

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

  const commentChange = (id, body) => {
    update({ id, body }).then(() => dispatch(addressID));
  };

  const throttledHandleChange = useRef(
    throttle(({ name, qty, itemKey }) => {
      update({
        id: addressID,
        body: {
          ...currentRef.current,
          [itemKey]: currentRef.current[itemKey].map((l) =>
            l.name === name ? { ...l, available: qty } : l
          ),
          updatedAt: new Date(),
        },
      }).then(() => dispatch(addressID));
    }, 1000)
  ).current;

  const throttledCheckboxChange = useRef(
    throttle((id, body) => {
      update({ id, body }).then(() => dispatch(addressID));
    }, 200)
  ).current;

  useWakeLock();

  return (
    <Section>
      <Container>
        {current && !isError && (
          <>
            <Heading>{current.address}</Heading>
            <ul>
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
              <CounterItem>
                <h3>Sonstiges:</h3>
                <CommentInput item={current} handleChange={commentChange} />
              </CounterItem>
            </ul>
            <CheckList />
          </>
        )}
      </Container>
      <StateIndicator
        isLoading={isLoading}
        isError={isError}
        success={current}
        text={isError && "Something went wrong... "}
        fixed
      />
    </Section>
  );
};

export default CounterPage;
