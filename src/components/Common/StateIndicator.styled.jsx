import styled from "@emotion/styled";
import { colors, transition } from "~/styles/common/vars";

export const StateWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;

  color: ${colors.light.mid100};

  &.fixed {
    position: fixed;
    z-index: 11;
    top: 15px;
    right: 25px;
  }

  & .spinner {
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  & .hidden {
    opacity: 0;
    animation: hide 2s linear;
  }

  @keyframes hide {
    0% {
      opacity: 1;
    }

    75% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;

export const RedirectWrapper = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  padding: 20px 0;

  input {
    display: block;

    border: 1px solid ${colors.accent.cyan};
    padding: 12px;
    border-radius: 12px;

    font-family: inherit;
    font-size: inherit;

    background-color: transparent;

    &::placeholder {
      font-size: inherit;
    }

    &:hover,
    &:focus {
      border-color: ${colors.accent.blue};
    }
  }

  a {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;

    border: 1px solid ${colors.accent.cyan};
    padding: 10px;
    border-radius: 12px;

    transition: ${transition.duration};
    color: ${colors.light.lo100};

    &:hover,
    &:focus {
      color: ${colors.accent.blue};
      border-color: ${colors.accent.blue};
    }
  }
`;
