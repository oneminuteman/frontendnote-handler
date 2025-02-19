import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import NotesList from './NotesList';
import {nanoid} from "nanoid";
import Header from './Header';



function App() {
    return (
        <Router>
            <div>
                {/* Navigation Links */}
                <nav>
                    <ul>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </ul>
                </nav>

                {/* Route Definitions */}
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/notes" element={<NotesList />} /> {/* Added NotesList Route */}
                    
                    
                    

                </Routes>
            </div>
        </Router>
    );
}

export default App;