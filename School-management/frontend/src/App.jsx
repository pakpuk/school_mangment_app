import './App.css'
import {RouterProvider} from "react-router-dom";
import router from './router';
import axios from 'axios';
import StudentContext from "./context/StudentContext.jsx";
import {ThemeProvider} from "./components/theme-provider.jsx";
import {Toaster} from "./components/ui/sonner.jsx";

// Set up axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

// Add token to requests if it exists
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function App() {
  return (
    <>
      <StudentContext>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router}/>
        </ThemeProvider>
      </StudentContext>
      <Toaster/>
    </>
  )
}

export default App
