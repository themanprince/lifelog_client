import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Register from "./pages/Register";
import Login from "./pages/Login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

//styling
import './bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<>
		<Router>
			<Routes>
				<Route exact path="/register" Component={Register} />
				<Route exact path="/login" Component={Login} />
			</Routes>
		</Router>
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();