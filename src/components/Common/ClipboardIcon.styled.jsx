import styled from "@emotion/styled";
import { transition } from "~/styles/common/vars";

export const ClipboardIcon = styled.span`
  z-index: 1;
  position: absolute;
  pointer-events: none;
  top: 5px;

  padding: 0;

  opacity: 0;
  transition: ${transition.duration};

  background-color: inherit;

  &.copied {
    opacity: 1;
    transition: none;
  }
`;
