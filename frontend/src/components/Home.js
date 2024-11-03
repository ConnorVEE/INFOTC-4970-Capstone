import React from 'react';
import Navbar from './Navbar';

const Home = () => {
    return (
        <div className="home-container">
            <Navbar /> {/* Include the Navbar here */}
            <div>
            {/*<button className="button1" type="submit">Register</button>*/}
            {/*<button className="button2" type="submit">Login</button>*/}
            <button className="button3" type="submit" onClick={logout}>Log out</button>
            </div>
        </div>
    );
};

export default Home;