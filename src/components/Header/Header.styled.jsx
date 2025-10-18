import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { colors, transition } from "~/styles/common/vars";

export const PageHeader = styled.header`
  width: 100%;
  z-index: 10;
  top: 0;
  left: 0;

  padding: 5px 0;

  backdrop-filter: blur(10px);
  border-bottom: 3px solid ${colors.lo100};
  box-shadow: ${colors.lo100} 0px 0px 10px;

  @media screen and (min-width: 768px) {
    position: fixed;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  flex-wrap: wrap;
  gap: 10px;
`;

export const UiConfigWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LanguagePicker = styled.button`
  width: 32px;
  height: 23px;
  padding: 0;
  overflow: hidden;
  border-radius: 8px;

  border: 1px solid ${colors.lo200};

  filter: grayscale(100%) contrast(90%);

  transition: all ${transition.duration};

  &:hover,
  &:focus {
    filter: none;
  }

  svg {
    display: block;
    width: 32px;
    height: 32px;

    transform: translate(-1px, -5px) scale(1.05);
  }
`;

export const DarkModeToggler = styled.button`
  padding: 4px 0 0;
  background-color: transparent;
  color: ${colors.lo200};
`;

export const LogoLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 240px;

  font-family: Montserrat-Alt1, Montserrat;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 1;

  background-image: ${colors.light.logo.main};
  color: transparent;

  background-clip: text;

  @media screen and (min-width: 768px) {
    font-size: 40px;
  }
`;

export const FirstLetterLogo = styled.span`
  rotate: -15deg;
  background-image: ${colors.light.logo.initCap};
  color: transparent;

  background-clip: text;
`;

export const ArrowLogo = styled.span`
  font-family: "LucidaSansUnicode";
  font-weight: 500;
  font-size: 48px;

  @media screen and (min-width: 768px) {
    font-size: 60px;
  }
`;

export const SubLogo = styled.span`
  content: "";
  position: absolute;
  z-index: 99;
  top: 34px;
  left: 20px;

  font-family: "HPSimplifiedLightItalic";
  font-style: italic;
  font-size: 10px;
  color: ${colors.light.lo200};

  @media screen and (min-width: 768px) {
    top: 42px;
    left: 28px;
    font-size: 11px;
  }
`;

export const NavList = styled.ul`
  display: flex;
  margin: 0 auto;
  gap: 30px;
  text-transform: uppercase;

  a:hover,
  a:focus {
    color: ${colors.light.mid100};
  }
`;
