import '../../assets/css/home.css';

import { Link } from 'react-router-dom';

export default function Home(){
    return <div className="body centered">
        <Link className="pbtn docu-link centered" to={{ pathname: 'https://discord.gg/uunFtahqSp' }} target="_blank">Documentation</Link>
    </div>
}