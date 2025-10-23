import styled from "@emotion/styled";
import { colors, transition } from "~/styles/common/vars";

export const DeleteBtn = styled.button`
  position: relative;
  width: 35px;
  height: 35px;

  background-color: transparent;
  border: none;

  transition: ${transition.duration};

  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;

    transition: ${transition.duration};
  }

  &:hover,
  &:focus {
    color: transparent;
  }

  &:hover span,
  &:focus span {
    opacity: 1;
    color: ${colors.errorRed};
  }
`;

export const SortBtn = styled.button`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0;
  margin: 0 auto;

  background-color: transparent;
  font-size: inherit;
  font-weight: inherit;

  pointer-events: all;
`;

export const TableWrapper = styled.div`
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;

  @media screen and (min-width: 768px) {
    height: 82vh;
    overflow-y: scroll;
  }
`;

export const Table = styled.table`
  color: ${colors.light.lo200};

  .sticky {
    position: sticky;
    backdrop-filter: blur(96px);
  }

  .sticky.left {
    z-index: 1;
    left: 0px;
    text-align: left;

    border-right: 1px solid ${colors.light.lo200};
  }

  .sticky.top {
    border-bottom: 1px solid ${colors.light.lo200};

    z-index: 2;
    top: 0px;
  }

  th,
  td {
    margin: 0;
    text-transform: capitalize;
    border-bottom: 1px solid ${colors.light.hi100};
  }

  td:not(:last-of-type),
  th:not(:last-of-type) {
    border-right: 1px solid ${colors.light.hi100};
  }

  pointer-events: none;

  @media screen and (min-width: 768px) {
    pointer-events: all;
  }

  .empty-row {
    display: none;

    @media screen and (min-width: 768px) {
      display: block;
    }
  }
`;

export const Th = styled.th`
  padding: 0 10px;
  text-align: center;
`;

export const Td = styled.td`
  position: relative;
  text-align: center;
  padding: 0 4px;

  &.id {
    width: 40px;
  }

  & .date-picker {
    max-width: 78px;
    padding: 5px;

    border: none;

    font-size: inherit;
    font-family: inherit;
    background-color: transparent;
  }
`;

export const BagsNeeded = styled.span`
  font-size: 28px;
  cursor: pointer;

  & + span {
    pointer-events: none;
    position: absolute;
    top: 10px;
    left: 75px;
    z-index: 1;

    padding: 5px 15px;
    border-radius: 16px;

    font-size: 20px;
    opacity: 0;
    background-color: ${colors.light.lo100};
    color: ${colors.light.hi200};
    backdrop-filter: blur(96px);
  }

  &:hover + span {
    opacity: 0.9;
  }
`;

export const NumberInput = styled.input`
  width: 48px;
  height: 20px;
  padding: 0;
  text-align: center;
  font-size: 20px;
  background-color: transparent;
  border: none;

  font-family: Montserrat;

  &.available {
    font-size: 28px;
  }

  &.low.available {
    color: ${colors.errorRed};
  }

  &.medium.available {
    color: ${colors.warning};
  }

  &.high.available {
    color: ${colors.success};
  }
`;

export const TableInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  input {
    height: 30px;
  }
`;

export const AddressInput = styled.input`
  height: 30px;
  border: none;
  background-color: transparent;

  font-size: inherit;
`;

export const PlusBtn = styled.button`
  background-color: transparent;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  padding: 0;
  margin: 4px auto 0;

  color: ${colors.light.lo100};
  transition: ${transition.duration};

  &:hover,
  &:focus {
    color: ${colors.light.hi200};
    background-color: ${colors.light.mid100};
  }

  &.active {
    color: ${colors.accent.cyan};
  }
`;
