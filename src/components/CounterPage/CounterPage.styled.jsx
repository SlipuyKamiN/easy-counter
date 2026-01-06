import styled from "@emotion/styled";
import { colors, transition } from "~/styles/common/vars";

export const AddressesList = styled.ul`
  margin: 0 auto;
`;

export const AddressesListItem = styled.li`
  margin: 0 auto;
  max-width: 375px;
  transition: ${transition.duration};
  border-radius: 12px;
  border: 1px solid ${colors.light.hi100};

  a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px;
  }

  &:hover,
  &:focus {
    background-color: ${colors.light.hi200};
  }

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

export const Heading = styled.h1`
  margin: 0 auto;
  font-size: 24px;
  max-width: 320px;
  margin-bottom: 10px;

  @media screen and (min-width: 768px) {
    font-size: 28px;
    max-width: none;
  }

  @media screen and (min-width: 1280px) {
    font-size: 32px;
  }
`;

export const PickupWrapper = styled.li`
  margin: 0 auto 10px;
  max-width: 190px;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const SectionListItem = styled.li`
  overflow: hidden;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const ActiveSectionWrapper = styled.div`
  overflow: hidden;
  max-height: 0;
  transform: translateY(-100%);
  opacity: 0;
  transition: all ${transition.duration};
  pointer-events: none;

  &.active {
    pointer-events: auto;
    transform: translateY(0%);
    max-height: none;
    opacity: 1;

    transition: all ${transition.duration};
  }
`;

export const SectionSwitch = styled.button`
  margin: 0 auto;
  width: 100%;
  max-width: 375px;
  transition: ${transition.duration};
  border-radius: 12px;
  border: 1px solid ${colors.light.hi100};
  padding: 10px;

  &:hover,
  &:focus {
    background-color: ${colors.light.hi200};
  }
`;
