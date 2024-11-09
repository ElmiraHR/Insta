import { useState } from "react";
import { $api } from "../../api/api.js";
import CustomInput from "../../atoms/customInput/CustomInput.js";  
import CustomButtonSubmit from "../../atoms/customButton/CustomButtonSubmit.js";
import lock from "../../assets/lock.png";
import s from "./ResetForm.module.css";
import { Link } from "react-router-dom";

export const ResetForm = () => {
  const [userObject, setUserObject] = useState({
    email: "",
    password: "",
    username: "",
    full_name: "",
  });

  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  // Проверка пользователя и отображение формы для смены пароля
  const handleCheckUser = async (e) => {
    e.preventDefault();
    try {
      const response = await $api.post("/auth/check-user", {
        email: userObject.email,
      });
      if (response.status === 200) {
        setIsPasswordReset(true); // Показываем инпут для нового пароля
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Error checking user:", error);
      alert("Error checking user");
    }
  };
  
  // Сохранение нового пароля в базе данных
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    console.log("Updating password for:", userObject.email, "New password:", newPassword); // Проверка данных
    try {
      const response = await $api.post("/auth/update-password", {
        email: userObject.email,
        newPassword,
      });
      if (response.status === 200) {
        alert("Password updated successfully");
        setIsPasswordReset(false); // Скрываем инпут для смены пароля
        setNewPassword("");
      } else {
        alert("Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password");
    }
  };
  

  return (
    <>
      <div className={s.resetContainer}>
        <img src={lock} alt="" />
        <p className={s.lockSubTitle}>Trouble logging in?</p>
        <p className={s.resetPar}>
          Enter your email, phone, or username and we'll send you a link to get back into your account.
        </p>
        <form onSubmit={isPasswordReset ? handleUpdatePassword : handleCheckUser}>
          <div className={s.resetInputContainer}>
            <CustomInput
              backgroundColor="#FAFAFA"
              border="1px solid #DBDBDB"
              borderRadius="3px"
              placeholder="Email or username"
              color="#737373"
              width="300px"
              height="36px"
              padding="6px 0px 11px 8px"
              value={userObject.email}
              onChange={(e) =>
                setUserObject({ ...userObject, email: e.target.value })
              }
            />
            {isPasswordReset && (
              <CustomInput
                backgroundColor="#FAFAFA"
                border="1px solid #DBDBDB"
                borderRadius="3px"
                placeholder="New Password"
                color="#737373"
                width="300px"
                height="36px"
                padding="6px 0px 11px 8px"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            )}
            <CustomButtonSubmit
              backgroundColor="#0095f6"
              borderRadius="8px"
              width="300px"
              border="none"
              padding="7px 35px"
              fontSize="14px"
              text={isPasswordReset ? "Save New Password" : "Reset your password"}
              color="#fff"
            />
          </div>
          <div className={s.lineContainer}>
            <div className={s.line}></div>
            <p>OR</p>
            <div className={s.line}></div>
          </div>
          <Link className={s.createAccount} to="/registration">Create new account</Link>
        </form>
      </div>
      <div className={s.logContainer}>
        <Link to="/">Back to login</Link>
      </div>
    </>
  );
};
