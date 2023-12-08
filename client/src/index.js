import { StrictMode } from'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import "./index.css"
import App from './App';
import { UserProvider } from './UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <UserProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserProvider>
);

// ReactDOM.render(<App />, document.getElementById('root'));