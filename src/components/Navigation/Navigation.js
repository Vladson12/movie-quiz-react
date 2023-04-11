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
    <div className="header">
      <nav className="nav nav-info">
        <Logo />
        <Link to="/" className="nav__item">
          <FontAwesomeIcon icon={faHouse} /> {"Home"}
        </Link>
        <Link to="about" className="nav__item">
          <FontAwesomeIcon icon={faCircleInfo} /> {"About"}
        </Link>
      </nav>

      <nav className="nav nav-auth">
        {!auth ? (
          <>
            <Link to="login" className="nav__item">
              <FontAwesomeIcon icon={faRightToBracket} /> {"Sign in"}
            </Link>
            <Link to="signup" className="nav__item">
              <FontAwesomeIcon icon={faUserPlus} /> {"Sign up"}
            </Link>
          </>
        ) : (
          <>
            <Link to="profile" className="nav__item">
              <FontAwesomeIcon icon={faUser} /> {auth.login}
            </Link>
            <Link to="/" onClick={onLogoutButtonClick} className="nav__item">
              <FontAwesomeIcon icon={faRightFromBracket} /> {"Log out"}
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
