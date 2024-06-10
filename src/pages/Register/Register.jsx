import { useNavigate } from "react-router-dom"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { ButtonC } from "../../components/ButtonC/ButtonC"
import { Col, Row, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { loginUsers, registerUsers } from "../../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userData, userLogin } from "../../app/slices/userSlice";
import "./Register.css"


export const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogued = useSelector(userData).token
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (userLogued && userLogued.length > 5) {
            navigate("/")
        }

    }, [userLogued])

    const inputHandler = (e) => {

        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const register = (data) => {
        registerUsers(data)
            .then((res) => {
                const dataLogin = {
                    email: data.email,
                    password: data.password
                }
                loginUsers(dataLogin)
                    .then((token) => {
                        const user = decodeToken(token)
                        dispatch(userLogin({ token: token, decodificado: user }))
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
    };

    return (
        <Container className="register_design">

            <Row className="d-flex justify-content-center align-items-center">
                <Col md={4}>

                    <CustomInput className="inputLogin"
                        type={"text"}
                        name={"firstName"}
                        handler={inputHandler}
                        placeholder={"Nombre"}
                    />

                    <CustomInput className="inputLogin"
                        type={"text"}
                        name={"lastName"}
                        handler={inputHandler}
                        placeholder={"Apellidos"}
                    />

                    <CustomInput className="inputLogin"
                        type={"email"}
                        name={"email"}
                        handler={inputHandler}
                        placeholder={"Email"}
                    />
                    <CustomInput className="inputLogin"
                        type={"password"}
                        name={"password"}
                        handler={inputHandler}
                        placeholder={"Contraseña"}
                    />

                    <ButtonC
                        title={"Register"}
                        className={"regularButtonClass button_register_design"}
                        funtionEmit={() => register(credentials)}
                    />
                </Col>

            </Row>

        </Container>
    )

}