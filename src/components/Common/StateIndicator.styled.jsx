import styled from "@emotion/styled";
import { colors } from "~/styles/common/vars";

export const StateWrapper = styled.div`
  position: fixed;
  z-index: 11;
  top: 15px;
  right: 25px;

  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;

  color: ${colors.light.mid100};

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
