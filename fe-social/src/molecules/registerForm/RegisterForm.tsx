import { useState } from "react";
import { $api } from "../../api/api.js";
import CustomInput from "../../atoms/customInput/CustomInput.js"; 
import CustomButtonSubmit from "../../atoms/customButton/CustomButtonSubmit.js";  
import logo from "../../assets/ICHGRA2.png";
import s from "./RegisterForm.module.css"; 
import { Link, useNavigate } from "react-router-dom"; 

export const RegisterForm = () => {
  const [userObject, setUserObject] = useState({
    email: "",
    password: "",
    username: "",
    full_name: "",
  });
  
  const [error, setError] = useState({
    email: "",
    username: "",
    general: ""
  });

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ email: "", username: "", general: "" });

    try {
      const response = await $api.post("/auth/register", userObject);
      if (response.status === 201) {
        navigate("/"); 
      }
    } catch (error) {
      console.error("Ошибка регистрации:", error);

      if (error.response) {
        const errorData = error.response.data;

        if (error.response.status === 400) {
          // Обработка конкретных ошибок email и username
          setError((prevState) => ({
            ...prevState,
            email: errorData.errors?.email || "",
            username: errorData.errors?.username || "",
            general: !errorData.errors ? errorData.message : "",
          }));
        } else {
          setError((prevState) => ({
            ...prevState,
            general: "Произошла непредсказуемая ошибка."
          }));
        }
      } else {
        setError((prevState) => ({
          ...prevState,
          general: "Произошла непредсказуемая ошибка."
        }));
      }
    }
  };

  return (
    <>
      <div className={s.registerContainer}>
        <img src={logo} alt="" />
        <p className={s.registerPar}>Sign up to see photos and videos from your friends.</p>
        <form onSubmit={handleSubmit}>
          <div className={s.inputContainer}>
            <CustomInput
              backgroundColor="#FAFAFA"
              border="1px solid #DBDBDB"
              borderRadius="3px"
              placeholder="Email"
              color="#737373"
              width="280px"
              height="36px"
              padding="6px 0px 11px 8px"
              value={userObject.email}
              onChange={(e) =>
                setUserObject({ ...userObject, email: e.target.value })
              }
            />
            {error.email && <p className={s.errorMessage}>{error.email}</p>} 

            <CustomInput
              backgroundColor="#FAFAFA"
              border="1px solid #DBDBDB"
              borderRadius="3px"
              placeholder="Password"
              color="#737373"
              width="280px"
              height="36px"
              padding="11px 0px 11px 8px"
              margin="0"
              type="password"
              value={userObject.password}
              onChange={(e) =>
                setUserObject({ ...userObject, password: e.target.value })
              }
            />

            <CustomInput
              backgroundColor="#FAFAFA"
              border="1px solid #DBDBDB"
              borderRadius="3px"
              placeholder="Username"
              color="#737373"
              width="280px"
              height="36px"
              padding="11px 0px 11px 8px"
              value={userObject.username}
              onChange={(e) =>
                setUserObject({ ...userObject, username: e.target.value })
              }
            />
            {error.username && <p className={s.errorMessage}>{error.username}</p>}
            {error.general && <p className={s.errorMessage}>{error.general}</p>} 

            <CustomInput
              backgroundColor="#FAFAFA"
              border="1px solid #DBDBDB"
              borderRadius="3px"
              placeholder="Full Name"
              color="#737373"
              width="280px"
              height="36px"
              padding="11px 0px 11px 8px"
              value={userObject.full_name}
              onChange={(e) =>
                setUserObject({ ...userObject, full_name: e.target.value })
              }
            />
           
            <div className={s.privacy}>
              <p>
                People who use our service may have uploaded your contact information to Instagram.{" "}
                <a href="#">Learn More</a>
              </p>
              <p>
                By signing up, you agree to our <a href="">Terms,</a> <a href="">Policy,</a> <a href="">Cookies Policy</a>
              </p>
            </div>
            <CustomButtonSubmit
              backgroundColor="#0095f6"
              borderRadius="8px"
              width="268"
              border="none"
              padding="7px 113px"
              fontSize="14px"
              text="Register"
              color="#fff"
            />
          </div>
        </form>
      </div>
      <div className={s.logContainer}>
        <p>
          Have an account? <Link to="/">Log in</Link>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;
