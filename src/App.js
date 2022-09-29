import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext.js';
//pages and components
import Navbar from './components/Navbar.js'
import Movies from './pages/Movies.js'
import MovieForm from './components/MovieForm.js'
import Categories from './pages/Categories'
import MovieDetails from './components/MovieDetails.js';
import MoviesInCategory from './components/MoviesInCategory.js';
import Login from './pages/Login.js'
import Signup from './pages/Signup.js';

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
     <BrowserRouter>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route path='/' element={ user ? <Movies /> : <Navigate to='https://reeldiary.herokuapp.com/user/login' />} />
          <Route path='/movies' element={ user ? <Movies /> : <Navigate to='https://reeldiary.herokuapp.com/user/login' />} />
          <Route path='/movies/create' element={user ? <MovieForm /> : <Navigate to='https://reeldiary.herokuapp.com/user/login' />} />
          <Route path='/categories' element={user ? <Categories /> : <Navigate to='https://reeldiary.herokuapp.com/user/login' />} />
          <Route path='/movies/:id' element={user ? <MovieDetails /> : <Navigate to='https://reeldiary.herokuapp.com/user/login' />} />
          <Route path='/categories/:genre' element={user ? <MoviesInCategory /> : <Navigate to='https://reeldiary.herokuapp.com/user/login' />} />
          <Route path='/user/login' element={!user ? <Login /> : <Navigate to='https://reeldiary.herokuapp.com/movies' />} />
          <Route path='/user/signup' element={!user ? <Signup /> : <Navigate to='https://reeldiary.herokuapp.com/movies' />} />
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
