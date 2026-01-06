import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import { Container, Section } from "../SharedLayout/SharedLayout.styled";
import {
  ActiveSectionWrapper,
  Heading,
  SectionListItem,
  SectionSwitch,
} from "./CounterPage.styled";
import { StateIndicator } from "../Common/StateIndicator";
import useWakeLock from "~/hooks/useWakeLock";
import { CheckList } from "./CheckList";
import { CounterList } from "./CounterList";

const CounterPage = () => {
  const { addressID } = useParams();
  const [dispatch, current, isLoading, isError] = useAPI(API.getAddress);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!current) {
      dispatch(addressID);
    }
  }, [dispatch, current, addressID]);

  useWakeLock();

  const toggleActive = (listName) => {
    if (listName === activeId) {
      return setActiveId("");
    }

    setActiveId(listName);
  };

  return (
    <Section>
      <Container>
        {current && !isError && (
          <>
            <Heading>{current.address}</Heading>
            <ul>
              <SectionListItem>
                <SectionSwitch
                  type="button"
                  onClick={() => toggleActive("counter")}
                >
                  counter
                </SectionSwitch>
                <ActiveSectionWrapper
                  className={activeId === "counter" && "active"}
                >
                  <CounterList
                    addressID={addressID}
                    dispatch={dispatch}
                    current={current}
                  />
                </ActiveSectionWrapper>
              </SectionListItem>
              <SectionListItem>
                <SectionSwitch
                  type="button"
                  onClick={() => toggleActive("checklist")}
                >
                  checklist
                </SectionSwitch>
                <ActiveSectionWrapper
                  className={activeId === "checklist" && "active"}
                >
                  <CheckList />
                </ActiveSectionWrapper>
              </SectionListItem>
              <SectionSwitch type="button">Confirm</SectionSwitch>
            </ul>
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
