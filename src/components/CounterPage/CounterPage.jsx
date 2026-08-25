import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";
import { Container, Section } from "../SharedLayout/SharedLayout.styled";
import {
  ActiveSectionWrapper,
  ConfirmButton,
  Heading,
  SectionListItem,
  SectionSwitch,
} from "./CounterPage.styled";
import { StateIndicator } from "../Common/StateIndicator";
import useWakeLock from "~/hooks/useWakeLock";
import { CheckList } from "./CheckList";
import { CounterList } from "./CounterList";
import { scrollToTop } from "~/helpers/scrollToTop";

const initialProgress = {
  done: 0,
  total: 1,
};

const CounterPage = () => {
  const { addressID } = useParams();
  const [dispatch, current, isLoading, isError] = useAPI(API.getAddress);
  const [sendSMS, smsData, isSending] = useAPI(API.sendSMS);
  const [activeId, setActiveId] = useState("");
  const [counterProgress, setCounterProgress] = useState(initialProgress);
  const [checkListProgress, setCheckListProgress] = useState(initialProgress);
  const [key, setKey] = useState(0);
  const isCounterDone = counterProgress.done === counterProgress.total;
  const isCheckListDone = checkListProgress.done === checkListProgress.total;

  useEffect(() => {
    if (!current) {
      dispatch(addressID);
    }
  }, [dispatch, current, addressID]);

  const toggleActive = (listName) => {
    if (listName === activeId) {
      return setActiveId("");
    }

    setActiveId(listName);
    scrollToTop();
  };

  const reset = () => {
    scrollToTop();
    setActiveId("");
    setKey((k) => k + 1);
    setCounterProgress(initialProgress);
  };

  const handleSMS = () => {
    sendSMS({
      // body: `${current.address} – erledigt.\n Counter – aktualisiert. \n Checkliste – abgehakt.`,
      body: `${current.address} – erledigt.\n Counter – aktualisiert.`,
    }).then(() => {
      if (!isSending) {
        console.log(smsData);
      }
    });

    reset();
  };

  useWakeLock();

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
                  Counter
                  <p>{counterProgress.done + " / " + counterProgress.total}</p>
                </SectionSwitch>
                <ActiveSectionWrapper
                  className={activeId === "counter" && "active"}
                >
                  <CounterList
                    dispatch={dispatch}
                    current={current}
                    updateProgress={setCounterProgress}
                  />
                </ActiveSectionWrapper>
              </SectionListItem>
              <SectionListItem className={"hidden"}>
                <SectionSwitch
                  type="button"
                  onClick={() => toggleActive("checklist")}
                >
                  Checklist
                  <p>
                    {checkListProgress.done + " / " + checkListProgress.total}
                  </p>
                </SectionSwitch>
                <ActiveSectionWrapper
                  className={activeId === "checklist" && "active"}
                >
                  <CheckList
                    key={key}
                    updateProgress={setCheckListProgress}
                    checklist={current.checklist}
                  />
                </ActiveSectionWrapper>
              </SectionListItem>
              <ConfirmButton
                type="button"
                disabled={!isCounterDone || !isCheckListDone || isSending}
                onClick={handleSMS}
              >
                Bestätigen
              </ConfirmButton>
            </ul>
          </>
        )}
      </Container>
      <StateIndicator
        isLoading={isLoading || isSending}
        isError={isError}
        success={current}
        text={isError && "Something went wrong... "}
        fixed
      />
    </Section>
  );
};

export default CounterPage;
