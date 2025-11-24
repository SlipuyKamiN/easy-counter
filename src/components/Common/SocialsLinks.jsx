import { IconLink, SocialsList } from "../Footer/Footer.styled";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

export const SocialsLinks = () => (
  <SocialsList>
    <li>
      <IconLink
        href="https://wa.me/491781516236"
        target="_blank"
        rel="noopener nofollow noreferrer"
        className="whats-app"
      >
        <FaWhatsapp size={36} />
      </IconLink>
    </li>
    <li>
      <IconLink
        href="https://t.me/@easyRing_delivery"
        target="_blank"
        rel="noopener nofollow noreferrer"
        className="telegram"
      >
        <FaTelegramPlane size={36} />
      </IconLink>
    </li>
    <li>
      <IconLink
        href="https://www.instagram.com/easyring.delivery/"
        target="_blank"
        rel="noopener nofollow noreferrer"
        className="instagram"
      >
        <FaInstagram size={36} />
      </IconLink>
    </li>
  </SocialsList>
);
