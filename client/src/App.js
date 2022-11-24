import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./component/Layout/Layout";
import Appointments from "./component/Appointments/Appointments";
import AppmentForm from "./component/AppointmentForm/AppmentForm";

import store from "./redux/store";
import { Provider } from 'react-redux'

import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Appointments />} />
              <Route path="/:code" element={<AppmentForm />} />
              <Route path="/newAppointment" element={<AppmentForm />} />
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
    </Provider>
    
  );
}

export default App;
