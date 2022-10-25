import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';

const page = ReactDOM.createRoot(document.getElementById('page'));
page.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

reportWebVitals();
