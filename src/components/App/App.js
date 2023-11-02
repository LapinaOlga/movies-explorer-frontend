import Main from "../Main/Main";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {Route, Routes, useNavigate} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import MainApi from "../../utils/MainApi";
import {useEffect, useState} from "react";
import NotFound from "../NotFound/NotFound";
import EditProfile from "../EditProfile/EditProfile";
import Toast from "../../utils/Toast";
import Toasts from "../Toasts/Toasts";
import Favorites from "../Favorites/Favorites";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (token) => {
    MainApi.setToken(token);
    localStorage.setItem('token', token);
    loadInfoAboutCurrentUser();
    navigate('/movies')
  }

  const loadInfoAboutCurrentUser = () => {
    setIsLoading(true);
    MainApi.getMe()
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        addToast(new Toast('red', error.message));
        handleLogout();
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleEditProfile = (data) => {
    setCurrentUser({
      ...currentUser,
      ...data,
    })
  }

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('query');
    localStorage.removeItem('isShortMovie');
    navigate('/')
  }

  const addToast = (toast) => {
    setToasts([...toasts, toast])

    setTimeout(() => {
      setToasts(toasts.filter((item) => item.getId() !== toast.getId()))
    }, 5000)
  }

  useEffect(() => {
    // Временно отключено для проверки верстки
    const token = localStorage.getItem('token');

    if (token) {
      MainApi.setToken(token);
      loadInfoAboutCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, [])

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/signup"
            element={
              <Register onSuccess={handleLogin}/>
            }
          />
          <Route
            path="/signin"
            element={
              <Login onSuccess={handleLogin}/>
            }
          />
          <Route
            path="/"
            element={
              <Main/>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <Movies addToast={addToast}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <Favorites addToast={addToast}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <Profile onLogout={handleLogout}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <EditProfile onSuccess={handleEditProfile} addToast={addToast}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <NotFound/>
            }
          />
        </Routes>
      </CurrentUserContext.Provider>
      <Toasts list={toasts}/>
    </div>
  );
}

export default App;
