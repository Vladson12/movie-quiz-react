import "./Navigation.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import useAuth from "../../hooks/useAuth";
import Logo from "../Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faHouse,
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon icon={faHouse} /> {"Home"}
        </Link>
        <Link to="/about" className="nav-p">
          <FontAwesomeIcon icon={faCircleInfo} /> {"About"}
        </Link>
      </nav>

      <nav className="nav-auth">
        {!auth ? (
          <>
            <Link to="/login" className="nav-p">
              <FontAwesomeIcon icon={faRightToBracket} /> {"Sign In"}
            </Link>
            <Link to="signup" className="nav-p">
              <FontAwesomeIcon icon={faUserPlus} /> {"Sign Up"}
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="nav-p">
              <FontAwesomeIcon icon={faUser} /> {auth.login}
            </Link>
            <Link to="/" onClick={onLogoutButtonClick} className="nav-p">
              <FontAwesomeIcon icon={faRightFromBracket} /> {"Log out"}
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
