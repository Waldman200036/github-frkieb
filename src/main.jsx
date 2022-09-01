import * as React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import App from './App';
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";
import './main.css';

let rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />}>
        <Route path="expenses" element={<Expenses />} />
        <Route path="invoices" element={<Invoices />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
