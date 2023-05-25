import { Link } from "react-router-dom";
import "../../component/Navbar.css";

const HeadingPageContent = () => {
  return (
    <div className="head-container">
      <Link to="/">
        <img
          src={process.env.PUBLIC_URL + "/img/logo.png"}
          alt="logo img"
          width="100px"
          height="50px"
        />
      </Link>
    </div>
  );
};

export default HeadingPageContent;
