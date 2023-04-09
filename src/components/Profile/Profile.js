import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { auth } = useAuth();

  return (
    <div>
      <FontAwesomeIcon icon={faIdCard} />
      <br />
      {`Login: ${auth.login}`}
      <br />
      {`Creation date: ${new Date(auth.createdAt)}`}
      <br />
      {`Role: ${auth.role}`}
    </div>
  );
};

export default Profile;
