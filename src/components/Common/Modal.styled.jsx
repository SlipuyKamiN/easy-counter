import styled from "@emotion/styled";
import { colors } from "~/styles/common/vars";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 50;
`;

export const ModalWindow = styled.div`
  background: ${colors.classicWhite};
  padding: 20px;
  border-radius: 16px;

  min-width: 300px;
  max-width: 90%;

  box-shadow: ${colors.lo100} 0px 0px 10px;
`;
