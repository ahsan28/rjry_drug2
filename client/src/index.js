import { StrictMode } from'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import "./index.css"
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);

// ReactDOM.render(<App />, document.getElementById('root'));