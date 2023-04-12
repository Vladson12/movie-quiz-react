import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import { userLocale } from "../../util/locale";

const Profile = () => {
  const { auth } = useAuth();

  const creationDate = new Date(auth.createdAt).toLocaleDateString(userLocale, {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className="profile-section">
      <h2 className="profile-section__title">
        <FontAwesomeIcon icon={faIdCard} /> User profile
      </h2>
      <div className="profile-section__content">
        <p>Login: {auth.login}</p>
        <p>Creation date: {creationDate}</p>
        <p>Role: {auth.role}</p>
      </div>
    </div>
  );
};

export default Profile;
