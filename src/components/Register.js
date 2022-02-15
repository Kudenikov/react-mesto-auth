import Header from "./Header";
import AuthForm from "./AuthForm";
import InfoToolTip from './InfoToolTip';
import React from "react";
import { useNavigate } from "react-router-dom";

function Register(props) {

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
        props.handleRegistration(formData);
        setFormData({ email: '', password: '' });
      }

    const navigate=useNavigate();

    function handleClick() {
        navigate("/sign_in")
    }

    return (
        <>
            <Header 
                onClick={handleClick} 
                text="Войти" 
                email=""
                color="white"
                isOpen={false}
            />
            <AuthForm 
                title="Регистрация" 
                buttonText="Зарегистрироваться" 
                visibility="" 
                onSubmit={handleSubmit}
                emailValue={formData.email}
                passwordValue={formData.password}
                onChange={handleChange}
            />
            <InfoToolTip 
                onClose={props.onClose} 
                isOpen={props.isOpen} 
                title={props.message} 
                image={props.imageToolTip}
            />
        </>
    )
}

export default Register;