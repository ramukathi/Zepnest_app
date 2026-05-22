import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';

import Login from './pages/Login';

import Register from './pages/Register';

import Dashboard from './pages/Dashboard';

import RequestList from './pages/RequestList';

import CreateRequest from './pages/CreateRequest';

import EditRequest from './pages/EditRequest';

const ProtectedRoute = ({ children }) => {

  const token =
    localStorage.getItem('token');

  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};

const PublicRoute = ({ children }) => {

  const token =
    localStorage.getItem('token');

  if (token) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
};

function App() {

  return (

    <Router>

      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />

      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <RequestList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-request"
          element={
            <ProtectedRoute>
              <CreateRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/requests/:id/edit"
          element={
            <ProtectedRoute>
              <EditRequest />
            </ProtectedRoute>
          }
        />

      </Routes>

    </Router>
  );
}

export default App;