import React from "react";

function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
