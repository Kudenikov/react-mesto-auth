import AuthForm from "./AuthForm";
import Header from "./Header";
import InfoToolTip from './InfoToolTip';
import React from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {

    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
          [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
          return;
        }
        props.handleLogin(formData);
        setFormData({ email: '', password: '' });
      }

    const navigate = useNavigate();

    function handleClick() {
        navigate("/sign-up")
    }

    return (
        <>
            <Header 
                onClick={ handleClick } 
                text="Регистрация" 
                email=""
                color="white"
                isOpen={false}
            />
            <AuthForm 
                title="Вход" 
                buttonText="Войти" 
                visibility="_invisible" 
                onSubmit={handleSubmit}
                emailValue={formData.email}
                passwordValue={formData.password}
                onChange={handleChange}
            />
            <InfoToolTip 
                onClose={props.onClose} 
                isOpen={props.isOpen} 
                title="Что-то пошло не так! Попробуйте еще раз." 
                image={props.imageToolTip}
            />
        </>
    )
}

export default Login;