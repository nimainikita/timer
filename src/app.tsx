import styles from './components/Navbar.module.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Navbar from './components/Navbar';
import Countdown from './views/Countdown';
import Timer from './views/Timer';

function App() {
    return (
      <Router>
        <Navbar />
        <hr />
        <Route exact path='/' component={Timer}/>
        <Route path='/countdown' component={Countdown}/>
      </Router>
    );
}

export default App;
