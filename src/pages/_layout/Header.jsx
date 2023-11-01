import Navbar from './Components/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          <img src="https://cdn.icon-icons.com/icons2/52/PNG/256/signofhealth_medical_10742.png" alt="logo" className='logo'/>
          
        </Link>
        <Navbar />
      </div>
    </header>
    
  );
};

export default Header;