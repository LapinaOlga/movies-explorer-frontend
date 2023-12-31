import './App.scss';
import Main from "../Main/Main";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Api from "../../utils/api";
import {useEffect, useState} from "react";
import NotFound from "../NotFound/NotFound";
import EditProfile from "../EditProfile/EditProfile";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogin = ({email, password}, onError) => {
    Api.login(email, password)
      .then((response) => {
        Api.setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        loadInfoAboutCurrentUser();
        navigate('/')
      })
      .catch((error) => {
        onError(error.message);
      })
  }

  const handleRegister = ({email, password, name}, onError) => {
    Api.register(email, password, name)
      .then(() => {
        navigate('/sign-in')
      })
      .catch((error) => {
        onError(error.message);
      });
  }

  const loadInfoAboutCurrentUser = () => {
    setIsLoading(true);
    Api.getCurrentUser()
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        alert(error.message);
        handleLogout();
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleEditProfile = () => {
    console.log('save user info');
  }

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
  }

  useEffect(() => {
    // Временно отключено для проверки верстки
    // const token = localStorage.getItem('token');
    //
    // if (token) {
    //   Api.setToken(token);
      loadInfoAboutCurrentUser();
    // } else {
    //   setIsLoading(false);
    // }
  }, [])

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/sign-up" element={
          <Register onSubmit={handleRegister}/>
        }/>
        <Route path="/sign-in" element={
          <Login onSubmit={handleLogin}/>
        }/>
        <Route path="/" element={
          <Main/>
        }/>
        <Route path="/movies" element={
          <ProtectedRoute currentUser={currentUser}>
            <Movies/>
          </ProtectedRoute>
        }/>
        <Route path="/movies/favorites" element={
          <ProtectedRoute currentUser={currentUser}>
            <Movies/>
          </ProtectedRoute>
        }/>
        <Route path="/profile" element={
          <ProtectedRoute currentUser={currentUser}>
            <Profile onLogout={handleLogout}/>
          </ProtectedRoute>
        }/>
        <Route path="/profile/edit" element={
          <ProtectedRoute currentUser={currentUser}>
            <EditProfile onSubmit={handleEditProfile}/>
          </ProtectedRoute>
        }/>
        <Route path="*" element={
          <NotFound />
        }/>
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
