import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';  // Import AuthContext

const Home = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div className="home-container">
            <div>
                <h1>Mizzou Marketplace</h1>
            </div>
            <div>
            <button className="button1" type="submit">Register</button>
            <button className="button2" type="submit">Login</button>
            <button className="button3" type="submit" onClick={logout}>Log out</button>
            </div>
        </div>
    );
};

export default Home;