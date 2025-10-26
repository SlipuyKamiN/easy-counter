import { useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import { Container, Section } from "../SharedLayout/SharedLayout.styled";
import { AddressesListItem, CounterList } from "./CounterPage.styled";
import { StateIndicator } from "../Common/StateIndicator";

const CounterListPage = () => {
  const [dispatch, data, isLoading, isError] = useAPI(API.getAll);

  useEffect(() => {
    if (!data) {
      dispatch();
    }
  }, [dispatch, data]);

  return (
    <Section>
      <Container>
        <CounterList>
          {data &&
            !isError &&
            data.map(({ id, address }) => {
              return (
                <AddressesListItem key={id}>
                  <Link to={`counters/${id}`}>{address}</Link>
                </AddressesListItem>
              );
            })}
        </CounterList>
      </Container>
      <StateIndicator
        isError={isError}
        isLoading={isLoading}
        success={data}
        fixed
      />
    </Section>
  );
};

export default CounterListPage;
