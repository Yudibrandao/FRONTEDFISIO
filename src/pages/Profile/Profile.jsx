import { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { IsInputError } from "../../utils/validators";
import { BootstrapModal } from "../../components/Modal/BootstrapModal"
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import { userData, userLogout } from "../../app/slices/userSlice";
import { deleteUsers, getDataUser, updateUsers } from "../../services/apiCalls";
import { isAction } from "redux";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";
import "./Profile.css";

export const Profile = () => {
  const userLogued = useSelector(userData).decodificado;
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    role: "",
  })
  const userToken = useSelector(userData).token// Almacena el token del usuario logueado
  const [modify, setModify] = useState(false)//Si el perfil se modifica o no 

  //Aqui se almacenaran los datos del perfil
  const [data_modify, setDataModify] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  //Traigo los datos de usuario logueado
  useEffect(() => {
    get_user()
  }, [userToken])

  const get_user = () => {
    if (userToken) {
      getDataUser(userToken)
        .then((userData) => {
          setUser(userData)
        })
        .catch(() => {
        })
    }
  }

  useEffect(() => {
    if (!userToken) {
      navigate("/")
    }

  }, [userToken])

  //Funcion para eliminar el usuario
  const deleteUser = (token) => {

    deleteUsers(token)
    dispatch(userLogout())
  }

  //Saco los datos de los input y los guardo 
  const inputHandler = (e) => {
    setDataModify((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //Modificar datos del usuario
  const modify_user = (data, token) => {
    let data_mod = {}
    if (data.firstName) {
      data_mod.firstName = data.firstName
    }
    if (data.lastName) {
      data_mod.lastName = data.lastName
    }
    if (data.email) {
      data_mod.email = data.email
    }

    updateUsers(token, data_mod)
      .then((res) => {
        if (res) {
          get_user()
          setModify(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }

  return (
    <Container fluid className="profileDesign">
      {modify ? (
        <Row className="d-flex justify-content-center">
          <Col className="card_design" md={4}>
            <Row >
              <Col md={12} className="m-2 text-center">
                Id : {user.id}
              </Col>
            </Row>
            <Row >
              <Col md={12} className="m-2">
                Nombre :
                <CustomInput className="inputLogin"
                  type={"text"}
                  name={"firstName"}
                  handler={inputHandler}
                />
              </Col>
            </Row>
            <Row >
              <Col md={12} className="m-2">
                Apellido :
                <CustomInput className="inputLogin"
                  type={"text"}
                  name={"lastName"}
                  handler={inputHandler}
                />
              </Col>
            </Row>
            <Row >
              <Col md={12} className="m-2">
                Email :
                <CustomInput className="inputLogin"
                  type={"email"}
                  name={"email"}
                  handler={inputHandler}
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-3">
              <Col md={4}>
                <Button onClick={() => modify_user(data_modify, userToken)}>Modificar</Button>
              </Col>
              <Col md={4}>
                <Button onClick={() => { setModify(false) }}>Cancelar</Button>
              </Col>
            </Row>
          </Col>

        </Row>

      ) : (
        <Row className="d-flex justify-content-center">
          <Col className="card_design" md={4}>
            <Row >
              <Col md={12} className="m-2">
                Nombre : {user.firstName}
              </Col>
            </Row>
            <Row >
              <Col md={12} className="m-2">
                Apellido : {user.lastName}
              </Col>
            </Row>
            <Row >
              <Col md={12} className="m-2">
                Email : {user.email}
              </Col>
            </Row>
            <Row >
              <Col md={12} className="m-2">
                Id : {user.id}
              </Col>
            </Row>
            <Row >
              <Col md={12} className="m-2">
                Rol : {user.role === "1" ? ("Admin") : user.role === "2" ? ("Doctor") : ("Cliente")}
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mt-3">
              <Col md={4}>
                <Button onClick={() => { setModify(true) }}>Modificar</Button>
              </Col>
              <Col md={4}>
                <Button onClick={() => deleteUser(userToken)}>Borrar</Button>
              </Col>
            </Row>
          </Col>

        </Row>
      )}
    </Container>
  );
};