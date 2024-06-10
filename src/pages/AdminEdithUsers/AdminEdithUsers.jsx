import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../../app/slices/userSlice'
import { deleteUserId, editAdminUsersId } from '../../services/apiCalls'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { CustomInput } from '../../components/CustomInput/CustomInput'
import { useNavigate } from 'react-router-dom'

export const AdminEdithUsers = () => {
  const user_id = useSelector(userData).adminEdithUsersId
  const token = useSelector(userData).token
  const navigate = useNavigate();
  const [data_modify, setDataModify] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password:"",
    isActive:"", 
    role: "",
  });


  const inputHandler = (e) => {
    setDataModify((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const modify_user = (token, data, id) =>{
    const data_send = {}
    if(data.firstName !=="")data_send.firstName=data.firstName
    if(data.lastName !=="")data_send.lastName=data.lastName
    if(data.email !=="")data_send.email=data.email
    if(data.password !=="")data_send.password=data.password
    if(data.isActive !==""){
      if(data.isActive==="true")data_send.isActive=true
      if(data.isActive==="false")data_send.isActive=false
    }
    if(data.role!=="")data_send.role=data.role
   
    editAdminUsersId(id, token, data_send)

    .then(()=>{

    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const deleteUsersId = (token, id) => {
    deleteUserId(id, token)
    navigate("/admin")
  }

  return (

    <div>

      <Container className="login_design">
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={4}>
            <CustomInput className="inputLogin"
              type={"text"}
              name={"firstName"}
              handler={inputHandler}
              placeholder={"firstName"}
              value={data_modify.firstName}
              
            />
            <CustomInput className="inputLogin"
              type={"text"}
              name={"lastName"}
              handler={inputHandler}
              placeholder={"lastName"}
              value={data_modify.lastName}
            />
            <CustomInput className="inputLogin"
              type={"text"}
              name={"roleId"}
              handler={inputHandler}
              placeholder={"role"}
              value={data_modify.roleId}
            />
            <CustomInput className="inputLogin"
              type={"email"}
              name={"email"}
              handler={inputHandler}
              placeholder={"Email"}
              value={data_modify.email}
            />
            <CustomInput className="inputLogin"
              type={"password"}
              name={"password"}
              handler={inputHandler}
              placeholder={"Contraseña"}
              value={data_modify.password}
            />

            
          </Col>
        </Row>
        <Row className="d-flex justify-content-center  mt-3">
              <Col md={4}>
                <Button className="botones" onClick={() => modify_user(token, data_modify, user_id ) }>Editar</Button>
              </Col>
              <Col md={4}>
                <Button className="botones" onClick={() => { deleteUsersId(token, user_id ) }}>Borrar</Button>
              </Col>
            </Row>
      </Container>


    </div>
  )
}
