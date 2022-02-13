import { Link } from 'react-router-dom';

function AuthForm(props) {
    return (
        <div className="auth">
            <h2 className="auth__title">{props.title}</h2>
            <form className="auth__form" onSubmit={props.onSubmit}>
                <input 
                    id="email-input"
                    name="email" 
                    type="email" 
                    className="auth__input" 
                    placeholder="Email" 
                    required
                    value={props.emailValue}
                    onChange={props.onChange}
                    />
                <input 
                    id="password-input"
                    name="password"
                    type="password" 
                    className="auth__input" 
                    placeholder="Пароль" 
                    required 
                    minLength="6" 
                    maxLength="12"
                    value={props.passwordValue}
                    onChange={props.onChange}
                />
                <button className="auth__button" type="submit">{props.buttonText}</button>
                <div className={`auth__registered${props.visibility}`}>
                    <p className="auth__text">Уже зарегистрированы?</p><Link className="auth__link" to="/sign-in">Войти</Link>
                </div>
            </form>
        </div>
    );
  }
  
export default AuthForm;