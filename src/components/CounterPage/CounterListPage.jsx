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

  if (!data || isLoading)
    return (
      <div>
        <StateIndicator isLoading={isLoading} data={data} isError={isError} />
      </div>
    );
  if (!data || isError)
    return (
      <div>
        <StateIndicator isLoading={isLoading} data={data} isError={isError} />
      </div>
    );

  return (
    <Section>
      <Container>
        <CounterList>
          {data.map(({ id, address }) => {
            return (
              <AddressesListItem key={id}>
                <Link to={`/counter/${id}`}>{address}</Link>
              </AddressesListItem>
            );
          })}
        </CounterList>
      </Container>
    </Section>
  );
};

export default CounterListPage;
