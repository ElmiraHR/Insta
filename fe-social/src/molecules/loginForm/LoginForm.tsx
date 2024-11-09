import { useState } from "react";
import { $api } from "../../api/api.js";
import CustomInput from "../../atoms/customInput/CustomInput.js";
import CustomButtonSubmit from "../../atoms/customButton/CustomButtonSubmit.js";
import logo from "../../assets/ICHGRA2.png";
import s from "./LoginForm.module.css";
import phone from "../../assets/Background.png";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  // const token: string | null = localStorage.getItem("token");

  const navigate = useNavigate();
  const [userObject, setUserObject] = useState({ email: "", password: "" });
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(""); // Для ошибки авторизации

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    $api
    .post("/auth/login", userObject)
    .then((res) => localStorage.setItem("token", res.data.token));
    let hasError = false;

    // Валидация email
    if (userObject.email === "") {
      setShowEmailError(true);
      setEmailErrorMessage("Email is required");
      hasError = true;
    } else if (!validateEmail(userObject.email)) {
      setShowEmailError(true);
      setEmailErrorMessage("Invalid email format");
      hasError = true;
    } else {
      setShowEmailError(false);
      setEmailErrorMessage("");
    }

    // Валидация пароля
    if (userObject.password === "") {
      setShowPasswordError(true);
      setPasswordErrorMessage("Password is required");
      hasError = true;
    } else if (userObject.password.length < 4) {
      setShowPasswordError(true);
      setPasswordErrorMessage("Password must be at least 4 characters long");
      hasError = true;
    } else {
      setShowPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!hasError) {
      setIsSubmitting(true);
      setAuthError(""); // Сброс ошибки авторизации перед новым запросом
      try {
        const response = await $api.post("/auth/login", userObject);
        if (response.status === 200) {
          // Успешная авторизация
          navigate("/homePage");
        } else {
          // Ошибка при авторизации
          setAuthError("Invalid login credentials");
        }
      } catch (error) {
        console.error("Ошибка авторизации:", error);
        setAuthError("Invalid email or password.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleButtonClick = () => {
    // Обертка для handleSubmit без параметров
    document.querySelector("form")?.dispatchEvent(new Event("submit"));
  };

  return (
    <div className={s.loginPageContainer}>
      <div className={s.phone}>
        <img src={phone} alt="" />
      </div>
      <div>
        <div className={s.loginContainer}>
          <img src={logo} alt="" />
          <form onSubmit={handleSubmit}>
            <CustomInput
              backgroundColor="#FAFAFA"
              border="1px solid #DBDBDB"
              borderRadius="3px"
              placeholder="Username, or email"
              color="#737373"
              width="260px"
              height="38px"
              padding="11px 0px 11px 8px"
              errorMessage={emailErrorMessage}
              showError={showEmailError}
              value={userObject.email}
              onChange={(e) =>
                setUserObject({ ...userObject, email: e.target.value })
              }
            />
            <CustomInput
              backgroundColor="#FAFAFA"
              border="1px solid #DBDBDB"
              borderRadius="3px"
              placeholder="Password"
              color="#737373"
              width="260px"
              height="38px"
              padding="11px 0px 11px 8px"
              errorMessage={passwordErrorMessage}
              showError={showPasswordError}
              type="password"
              value={userObject.password}
              onChange={(e) =>
                setUserObject({ ...userObject, password: e.target.value })
              }
            />
            <CustomButtonSubmit
              backgroundColor="#0095f6"
              borderRadius="8px"
              width="268"
              border="none"
              padding="7px 113px"
              fontSize="14px"
              text="Log In"
              color="#fff"
              disabled={isSubmitting}
              onClick={handleButtonClick} // Теперь onClick вызывает handleButtonClick
            />
            {authError && <div className={s.errorMessage}>{authError}</div>}
          </form>

          <div className={s.lineContainer}>
            <div className={s.line}></div>
            <p>OR</p>
            <div className={s.line}></div>
          </div>
          <Link to="/reset" className={s.forgot}>Forgot password</Link>
        </div>
        <div className={s.signupContainer}>
          <p>Don't have an account? <Link className={s.loginLink} to="/registration"> Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
