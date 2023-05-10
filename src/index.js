import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RoomDetails from './components/RoomDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/room/:id" element={<RoomDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
