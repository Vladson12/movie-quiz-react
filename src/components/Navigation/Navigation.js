import "./Navigation.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import useAuth from "../../hooks/useAuth";
import Logo from "../Logo/Logo";

const Navigation = () => {
  const { auth, setAuth } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies("user");

  const onLogoutButtonClick = () => {
    setAuth(null);
    removeCookie("user", { path: "/" });
  };

  return (
    <header>
      <nav className="nav-rest">
        <Logo />
        <Link to="/" className="nav-p">
          Home
        </Link>
        <Link to="/about" className="nav-p">
          About
        </Link>
      </nav>

      <nav className="nav-auth">
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
          <>
            <Link to="#" className="nav-p">
              {auth.login}
            </Link>
            <Link to="/" onClick={onLogoutButtonClick} className="nav-p">
              Log out
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
