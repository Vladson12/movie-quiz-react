import { useContext } from "react";

import "./Navigation.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const Navigation = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/" className="nav-p">
        Home
      </Link>
      <Link to="/about" className="nav-p">
        About
      </Link>
      {!loggedIn ? (
        <>
          <Link to="/login" className="nav-p">
            Sign In
          </Link>
          <Link to="signup" className="nav-p">
            Sign Up
          </Link>
        </>
      ) : (
        <Link to="/" onClick={() => setLoggedIn(false)} className="nav-p">
          Log out
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
