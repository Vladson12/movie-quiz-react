import { useContext } from "react";

import "./Navigation.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { useCookies } from "react-cookie";

const Navigation = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies("user");

  const onLogoutButtonClick = () => {
    setAuth(null);
    removeCookie("user", { path: "/" });
  };

  return (
    <nav>
      <Link to="/" className="nav-p">
        Home
      </Link>
      <Link to="/about" className="nav-p">
        About
      </Link>
      {!auth ? (
        <>
          <Link to="/login" className="nav-p">
            Sign In
          </Link>
          <Link to="signup" className="nav-p">
            Sign Up
          </Link>
        </>
      ) : (
        <Link to="/" onClick={onLogoutButtonClick} className="nav-p">
          Log out
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
