import React from "react";
import "./HomeStyles.css";

const ProfilePage: React.FC = () => {
  const artist = {
    photo: "https://i.pravatar.cc/80?img=3",
    name: "Juan Dela Cruz",
    username: "@juandelacruz",
    bio: "Visual artist and musician from Davao. Exploring Mindanaoan culture through multimedia.",
    location: "Mindanao",
    memberSince: "March 2025"
  };

  return (
    <div className="profile-root">
      <h2 className="profile-title">Artist Profile</h2>
      <div className="profile-flex">
        <img
          src={artist.photo}
          alt="Artist"
          className="profile-photo"
        />
        <div>
          <div className="profile-name">{artist.name}</div>
          <div className="profile-username">{artist.username}</div>
          <div className="profile-bio">{artist.bio}</div>
          <div className="profile-location">{artist.location}</div>
          <div className="profile-member">Member since {artist.memberSince}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
