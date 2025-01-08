import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPassword: "",
    contactName: "",
    contactEmail: "",
    contactMessage: "",
    signUpName: "",
    signUpEmail: "",
    signUpPhone: "",
    signUpPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const API_KEY = "214f35b8260df6dddeebf0ee99acd70d";

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=5")
      .then((res) => res.json())
      .then((data) => setUsers(data.results))
      .catch((err) => console.error("Foydalanuvchilar xatosi:", err));
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 10)))
      .catch((err) => console.error("Postlar xatosi:", err));
  }, []);

  const fetchWeather = () => {
    if (!city.trim()) {
      alert("Shahar nomini kiriting!");
      return;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => alert("Ob-havo ma'lumotlarini olishda xato!"));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.loginEmail)) {
      setFormErrors({ loginEmail: "Noto'g'ri email format!" });
      return;
    }
    setFormErrors({});
    console.log("Login Email:", formData.loginEmail);
    console.log("Login Password:", formData.loginPassword);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.contactName ||
      !formData.contactEmail ||
      !formData.contactMessage
    ) {
      setFormErrors({ contactForm: "Barcha maydonlarni to'ldiring!" });
      return;
    }
    setFormErrors({});
    setSuccessMessage("Rahmat! Xabaringiz qabul qilindi.");
    console.log("Contact Form Data:", formData);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    if (formData.signUpPassword.length < 8) {
      setFormErrors({ signUpPassword: "Parol kamida 8 belgidan iborat bo'lishi kerak." });
      return;
    }
    setFormErrors({});
    console.log("Sign Up Data:", formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="App">
      <section>
        <h2>Foydalanuvchilar</h2>
        <ul>
          {users.map((user, idx) => (
            <li key={idx}>
              <img src={user.picture.medium} alt="User" />
              <p>{`${user.name.first} ${user.name.last}`}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Postlar</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body.substring(0, 50)}...</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Ob-havo Malumotlari</h2>
        <input
          type="text"
          placeholder="Shahar nomi"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Qidirish</button>
        {weather && (
          <div>
            <h3>{weather.name}</h3>
            <p>Harorat: {weather.main.temp}°C</p>
            <p>Ob-havo: {weather.weather[0].description}</p>
          </div>
        )}
      </section>

      <section>
        <h2>Kirish Formasi</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="loginEmail"
            placeholder="Email"
            value={formData.loginEmail}
            onChange={handleInputChange}
            required
          />
          {formErrors.loginEmail && <p style={{ color: "red" }}>{formErrors.loginEmail}</p>}
          <input
            type="password"
            name="loginPassword"
            placeholder="Parol"
            value={formData.loginPassword}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Kirish</button>
        </form>
      </section>

      <section>
        <h2>Kontakt Formasi</h2>
        <form onSubmit={handleContactSubmit}>
          <input
            type="text"
            name="contactName"
            placeholder="Ism"
            value={formData.contactName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="contactEmail"
            placeholder="Email"
            value={formData.contactEmail}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="contactMessage"
            placeholder="Xabar"
            value={formData.contactMessage}
            onChange={handleInputChange}
            required
          />
          {formErrors.contactForm && (
            <p style={{ color: "red" }}>{formErrors.contactForm}</p>
          )}
          <button type="submit">Yuborish</button>
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </form>
      </section>


      <section>
        <h2>Royxatdan O'tish</h2>
        <form onSubmit={handleSignUpSubmit}>
          <input
            type="text"
            name="signUpName"
            placeholder="Ism"
            value={formData.signUpName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="signUpEmail"
            placeholder="Email"
            value={formData.signUpEmail}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="signUpPhone"
            placeholder="Telefon"
            value={formData.signUpPhone}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="signUpPassword"
            placeholder="Parol"
            value={formData.signUpPassword}
            onChange={handleInputChange}
            required
          />
          {formErrors.signUpPassword && (
            <p style={{ color: "red" }}>{formErrors.signUpPassword}</p>
          )}
          <button type="submit">Royxatdan otish</button>
        </form>
      </section>
    </div>
  );
}

export default App;