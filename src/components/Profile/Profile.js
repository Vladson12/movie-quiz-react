import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";

const Profile = () => {
  const { auth } = useAuth();

  return (
    <div className="profile-section">
      <h2>
        <FontAwesomeIcon icon={faIdCard} /> User profile
      </h2>
      {`Login: ${auth.login}`}
      <br />
      {`Creation date: ${new Date(auth.createdAt)}`}
      <br />
      {`Role: ${auth.role}`}
    </div>
  );
};

export default Profile;
