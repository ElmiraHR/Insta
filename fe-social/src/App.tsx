// import { useState } from "react";
// import { Home } from "./atoms/Home";
// import { LoginForm } from "./molecules/LoginForm";
// import { RegisterForm } from "./molecules/RegisterForm";
// import { ImageForm } from "./molecules/ImageForm";
// import PostsList from "./molecules/PostsList";
// import { HomePage } from "./pages/homePage/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ContextProvider } from "./context/ContextPrivider"; 
//import ProtectedRoutes from "./routes/ProtectedRoutes"; 
import ProtectedRoute from "./ProtectedRoute";
import { ResetForm } from "./molecules/resetForm/ResetForm"; 
import { RegisterForm } from "./molecules/registerForm/RegisterForm";
import { HomePage } from "./pages/homePage/HomePage";
import { Explore } from "./pages/explorePage/ExplorePage";
import { Profile } from "./pages/myProfilePage/Profile";
// import { LoginForm } from "./molecules/LoginForm";
import Login from "./molecules/loginForm/LoginForm";
import { FC } from "react";
import Sidebar from "./molecules/sidebar/sidebarHome/SidebarMain";
import Footer from "./molecules/footer/Footer";


const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <div className="sidebar"><Sidebar /></div>
      <main>{children}</main>
      <footer><Footer navLinks={['Home', 'Search', 'Explore']} /></footer>
    </div>
  );
};

const App: FC = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Страница входа без сайдбара и футера */}
          <Route path="/signin" element={<Login />} />

          {/* Страница регистрации без сайдбара и футера */}
          <Route path="/registration" element={<RegisterForm />} />

          {/* Страница сброса пароля без сайдбара и футера */}
          <Route path="/reset" element={<ResetForm />} />

          {/* Защищённая домашняя страница с сайдбаром и футером */}
          <Route
            path="/homePage"
            element={
              <ProtectedRoute element={<Layout><HomePage /></Layout>} />
            }
          />

          {/* Страница Explore с сайдбаром и футером */}
          <Route
            path="/explore"
            element={<Layout><Explore /></Layout>}
          />

            {/* Страница профиля с сайдбаром и футером */}
            <Route
            path="/profile"
            element={<Layout><Profile /></Layout>}
          />

          {/* Редирект на страницу входа по умолчанию */}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default App;















// router
// Context
//

// function App() {
//   return (
//     <>
//     <HomePage/>
//       <span>Login</span>
//       <LoginForm />
//       <span>Register</span>
//       <RegisterForm />
//       <span>File Uploder</span>
//       <ImageForm />
//       <span>Posts</span>
//       <PostsList />
//     </>
//   );
// }

// function App() {
//   return (
//     <>
//       {/* <ContextProvider>
//         <BrowserRouter>
//           <ProtectedRoutes>
//             <Main />
//           </ProtectedRoutes>
//           <SignIn />
//           <Registration />
//         </BrowserRouter>
//       </ContextProvider> */}
//     </>
//   );
// }

// function App() {
//   const [state, setState] = useState(0);
//   const handleClick = () => {
//     setState(0);
//   };
//   const handleClickOther = () => {
//     setState(1);
//   };
//   return (
//     <>
//       <button onClick={handleClick}>
//         <Home state={state == 0} />
//         <span>Home</span>
//       </button>
//       <button onClick={handleClickOther}>
//         <Home state={state == 1} />
//         <span>Other Home</span>
//       </button>
//     </>
//   );
// }


