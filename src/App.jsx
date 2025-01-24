import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import ErrorBoundary from './components/ErrorBoundary';
    import GlobalErrorHandler from './components/GlobalErrorHandler';
    import NotificationCenter from './components/NotificationCenter';
    import LazyComponent from './components/LazyComponent';
    import './App.css';

    function App() {
      return (
        <ErrorBoundary>
          <BrowserRouter>
            <GlobalErrorHandler />
            <Routes>
              <Route path="/" element={
                <LazyComponent component="Home.jsx" fallback={<div>Loading...</div>} />
              } />
              <Route path="/login" element={
                <LazyComponent component="Login.jsx" fallback={<div>Loading...</div>} />
              } />
              <Route path="/register" element={
                <LazyComponent component="Register.jsx" fallback={<div>Loading...</div>} />
              } />
              <Route path="/admin" element={
                <LazyComponent component="Admin.jsx" fallback={<div>Loading...</div>} />
              } />
              <Route path="/profile" element={
                <LazyComponent component="Profile.jsx" fallback={<div>Loading...</div>} />
              } />
              <Route path="/error" element={
                <LazyComponent component="Error.jsx" fallback={<div>Loading...</div>} />
              } />
            </Routes>
            <NotificationCenter />
          </BrowserRouter>
        </ErrorBoundary>
      );
    }

    export default App;
