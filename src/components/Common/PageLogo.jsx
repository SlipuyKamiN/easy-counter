import { useParams } from "react-router-dom";
import {
  ArrowLogo,
  FirstLetterLogo,
  LogoLink,
  SubLogo,
} from "./PageLogo.styled";

export const PageLogo = () => {
  const { user } = useParams();

  return (
    <LogoLink to={`/${user}`}>
      <FirstLetterLogo>e</FirstLetterLogo>asyLinens<ArrowLogo>↺</ArrowLogo>
      <SubLogo>counter</SubLogo>
    </LogoLink>
  );
};
