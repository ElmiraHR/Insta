import { useState } from "react";
import { $api } from "../api/api";

export const RegisterForm = () => {
  const [userObject, setUserObject] = useState({
    email: "",
    password: "",
    username: "",
    full_name: "",
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    $api.post("/auth/register", userObject);
    // Navigate()
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={(e) =>
          setUserObject({ ...userObject, email: e.target.value })
        }
        type="email"
      />
      <input
        onChange={(e) =>
          setUserObject({ ...userObject, password: e.target.value })
        }
        type="password"
      />
      <input
        onChange={(e) =>
          setUserObject({ ...userObject, username: e.target.value })
        }
        type="text"
      />
      <input
        onChange={(e) =>
          setUserObject({ ...userObject, full_name: e.target.value })
        }
        type="text"
      />
      <button>Register</button>
    </form>
  );
};
