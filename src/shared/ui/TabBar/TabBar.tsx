import { NavLink, /* useNavigate */ } from 'react-router-dom';
import './TabBar.css';
// import menu from "../../assets/Document.svg";
// import cart from "../../assets/Path.svg";
// import profile from "../../assets/Vector.svg";
// import close from "../../assets/close.svg";
// import { useAuth } from '../../../app/providers/AuthProvider';



interface LinkModel {
    name: string;
    to: string;
    // icon: string;
}

const TabBar: React.FC = () => {

    // const { isAuth } = useAuth();
    // const navigate = useNavigate();

    const links: LinkModel[] = [
        { name: 'Каталог', to: '/products' /* icon: menu */ },
        { name: 'Корзина', to: '/cart'  /* icon: cart */ }
        // { name: 'Профиль', to: '/profile', icon: profile },
    ]

    return (
        <aside className="aside">
            {
                // isAuth ? <div className="info">
                //     <div className="circle-avatar">

                //     </div>

                //     <p>Антон Ларичев</p>
                //     <span>alaricode@ya.ru</span>
                // </div> : <button className='auth' onClick={() => navigate('/auth')} >
                //     Войти
                // </button>

            }

            <ul className="list">
                {
                    links.map((link, i) => (
                        <li key={i}>

                            <NavLink to={link.to} className='list-link'>
                                {/* <img src='{link.icon}' alt="" /> */}
                                {link.name}
                            </NavLink>

                        </li>
                    ))
                }

            </ul>

            {/* <button className='close'>
                <div className="circle-button">
                    <img src={close} alt="" />
                </div>
                <span>Выйти</span>
            </button> */}
        </aside>
    );
}

export default TabBar;