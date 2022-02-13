import logo from '../images/logo.svg';

function Header(props) {
    return (
      <header className={`header ${props.isOpen ? "header_menu_opened" : ""}`}>
          <img className="header__logo" src={logo} alt="Место" />
          {props.children}
          <div className={`header__text-container ${props.isOpen ? "header__text-container_visible" : ""}`}>
            <p className="header__email">{props.email}</p>
            <button onClick={props.onClick} className={`header__link header__link_color_${props.color}`}>{props.text}</button>
          </div>

      </header>
    );
  }
  
export default Header;