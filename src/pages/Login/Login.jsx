import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUsers } from "../../services/apiCalls";
import { userData, userLogin } from "../../app/slices/userSlice";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogued = useSelector(userData).token
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userLogued && userLogued.length > 5) {
      navigate("/")
    }

  }, [userLogued])

  //guardo los datos de los inputs
  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //hacemos login y guardamos el token en una variable 
  const login = async (data) => {
    loginUsers(data)
      .then((token) => {
        if (token && token.length > 10) {
          const decoded = decodeToken(token)
          dispatch(userLogin({ token: token, decodificado: decoded }))
        }
        else {
          console.log("Usuario no encontrado")
        }
      })
      .catch((error) => {
        console.log(error)
      })



  }
  return (

    <Container className="login_design">
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={4}>
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

          <div className="text-center">
            <Button type="submit" variant="secondary" onClick={() => login(credentials)}>
              Enviar
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};