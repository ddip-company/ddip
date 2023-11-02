import React from "react";
import "../../styles/css/GuidePage.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h1 className="footer-title">ddip-company</h1>
      <div
        className="gitLink"
        onClick={() =>
          window.open("https://github.com/ddip-company/ddip", "_blank")
        }
      >
        https://github.com/ddip-company/ddip
      </div>
      <p className="member">Ddip Project Frontend developer 안태건</p>
    </footer>
  );
};

export default Footer;
