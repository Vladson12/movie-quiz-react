import { useState } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [year] = useState(new Date().getFullYear());
  const [email] = useState(process.env.REACT_APP_DEVELOPER_EMAIL);

  return (
    <footer className="footer">
      <p className="footer__copyright">
        <FontAwesomeIcon icon={faCopyright} /> {year} Vladson12, Inc
      </p>
      <a className="footer__link" href={`mailto: ${email}`}>
        <FontAwesomeIcon icon={faEnvelope} />
      </a>
    </footer>
  );
};

export default Footer;
