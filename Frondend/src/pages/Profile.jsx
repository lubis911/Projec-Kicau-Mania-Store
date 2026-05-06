import { useState } from "react";
import Navbar from "../components/Navbar";
import { getUser } from "../services/auth";

function Profile() {
  const user = getUser() || {};

  const [name, setName] = useState(user.name || "");
  const [email] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");
  const [photo, setPhoto] = useState(user.photo || "");

  const uploadPhoto = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPhoto(imageUrl);
  };

  const saveProfile = () => {
    const updatedUser = {
      ...user,
      name,
      email,
      phone,
      address,
      photo,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile berhasil diperbarui");
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <div className="profile-card">
          <img
            src={photo || "https://i.imgur.com/HeIi0wU.png"}
            alt=""
            className="profile-avatar"
          />

          <input type="file" onChange={uploadPhoto} />

          <input
            type="text"
            value={name}
            placeholder="Nama Lengkap"
            onChange={(e) => setName(e.target.value)}
          />

          <input type="email" value={email} disabled />

          <input
            type="text"
            value={phone}
            placeholder="Nomor HP"
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            value={address}
            placeholder="Alamat"
            onChange={(e) => setAddress(e.target.value)}
          />

          <button onClick={saveProfile}>Simpan Profile</button>
        </div>
      </div>
    </>
  );
}

export default Profile;
