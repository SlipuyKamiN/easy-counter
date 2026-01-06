import { useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import { Container, Section } from "../SharedLayout/SharedLayout.styled";
import { AddressesListItem, AddressesList } from "./CounterPage.styled";
import { StateIndicator } from "../Common/StateIndicator";

const AddressesListPage = () => {
  const [dispatch, data, isLoading, isError] = useAPI(API.getAll);

  useEffect(() => {
    if (!data) {
      dispatch();
    }
  }, [dispatch, data]);

  return (
    <Section>
      <Container>
        <AddressesList>
          {data &&
            !isError &&
            data.map(({ id, address }) => {
              return (
                <AddressesListItem key={id}>
                  <Link to={`counters/${id}`}>{address}</Link>
                </AddressesListItem>
              );
            })}
        </AddressesList>
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

export default AddressesListPage;
