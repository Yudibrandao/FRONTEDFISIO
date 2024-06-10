import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import { getAllUsers, getAppointments, updateAppointment, deleteAppointment } from "../../services/apiCalls"; // Asegúrate de importar deleteAppointment
import { useDispatch, useSelector } from "react-redux";
import { userData, userLogin } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export const Admin = () => {
    const [adminVista, setAdminVista] = useState("");
    const userToken = useSelector(userData).token;
    const [users, setUsers] = useState([]);
    const [citas, setCitas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCita, setSelectedCita] = useState(null);
    const [formValues, setFormValues] = useState({ day_date: "", time: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userToken) {
            navigate("/");
        }
    }, [userToken, navigate]);

    useEffect(() => {
        if (adminVista === "citas") {
            citas_data();
        } else if (adminVista === "user") {
            users_data();
        }
    }, [adminVista]);

    const users_data = () => {
        getAllUsers(userToken)
            .then((res) => {
                setUsers(res);
            })
            .catch(() => { });
    };

    const citas_data = () => {
        getAppointments(userToken)
            .then((res) => {
                setCitas(res);
            })
            .catch(() => { });
    };

    const handleEditClick = (userId) => {
        dispatch(userLogin({ adminEdithUsersId: userId }));
        navigate("/edithPerfilAdmin");
    };

    const handleEditAppointmentClick = (cita) => {
        setSelectedCita(cita);
        setFormValues({ day_date: cita.day_date.split("T")[0], time: cita.day_date.split("T")[1].substring(0, 5) }); // Extraer la fecha en formato YYYY-MM-DD y la hora
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const updatedDateTime = new Date(formValues.day_date + "T" + formValues.time);
        
        updatedDateTime.setMinutes(updatedDateTime.getMinutes() + updatedDateTime.getTimezoneOffset());

        updateAppointment(userToken, selectedCita.id, { day_date: updatedDateTime.toISOString() })
            .then(() => {
                setShowModal(false);
                citas_data();
            })
            .catch((error) => {
                console.error("Error updating appointment:", error);
            });
    };

    const handleDeleteAppointment = () => {
        deleteAppointment(userToken, selectedCita.id)
            .then(() => {
                setShowModal(false);
                citas_data();
            })
            .catch((error) => {
                console.error("Error deleting appointment:", error);
            });
    };

    return (
        <Container className="admin_design">
            {adminVista === "user" ? (
                <>
                    <Row className="d-flex justify-content-center m-5">
                        <Col>
                            <Row className="d-flex justify-content-center">
                                <Col md={2}>
                                    <Button className="botones" onClick={() => setAdminVista("")}>
                                        Cerrar
                                    </Button>
                                </Col>
                                <Col md={2}>
                                    <Button className="botones" onClick={() => setAdminVista("citas")}>
                                        Citas
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        {users.map((user) => (
                            <Col md={12} key={user.id}>
                                <Row className="text-light justify-content-center fila_users">
                                    <Col md={1}>{user.id}</Col>
                                    <Col md={2}>{user.firstName}</Col>
                                    <Col md={3}>{user.lastName}</Col>
                                    <Col md={3}>{user.email}</Col>
                                    <Col md={1}>{user.isActive ? "Activo" : "Inactivo"}</Col>
                                    <Col md={2}>
                                        <Button className="botones" onClick={() => handleEditClick(user.id)}>
                                            Editar
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                    </Row>
                </>
                
            ) : adminVista === "citas" ? (
                <>
                    <Row className="d-flex justify-content-center m-5">
                        <Col>
                            <Row className="d-flex justify-content-center">
                                <Col md={2}>
                                    <Button className="botones" onClick={() => setAdminVista("")}>
                                        Cerrar
                                    </Button>
                                </Col>
                                <Col md={2}>
                                    <Button className="botones" onClick={() => setAdminVista("user")}>
                                        Usuarios
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Row className="text-light justify-content-center fila_users pt-4 pb-4">
                            <Col md={1}>Id</Col>
                            <Col md={1}>Cliente</Col>
                            <Col md={3}>Email Cliente</Col>
                            <Col md={2}>Doctor</Col>
                            <Col md={3}>Fecha Cita</Col>
                            <Col md={2}></Col>
                        </Row>
                        {citas.map((cita) => (
                            <Col md={12} key={cita.id}>
                                <Row className="text-light justify-content-center fila_users pt-2">
                                    <Col md={1}>{cita.id}</Col>
                                    <Col md={1}>{cita.cliente?.user?.firstName}</Col>
                                    <Col md={3}>{cita.cliente?.user?.email}</Col>
                                    <Col md={2}>{cita.doctor?.user?.firstName}</Col>
                                    <Col md={3}>{cita.day_date}</Col>
                                    <Col md={2}>
                                        <Button className="botones" onClick={() => handleEditAppointmentClick(cita)}>
                                            Editar
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                    </Row>
                </>
            ) : (
                <Row className="d-flex justify-content-center botones_principales">
                    <Col>
                        <Row className="d-flex justify-content-center">
                            <Col md={2}>
                                <Button className="botones" onClick={() => setAdminVista("user")}>
                                    Usuarios
                                </Button>
                            </Col>
                            <Col md={2}>
                                <Button className="botones" onClick={() => setAdminVista("citas")}>
                                    Citas
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha de la Cita</Form.Label>
                            <Form.Control
                                type="date"
                                name="day_date"
                                value={formValues.day_date}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Hora de la Cita</Form.Label>
                            <Form.Control
                                type="time"
                                name="time"
                                value={formValues.time}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Guardar cambios
                        </Button>
                        <Button variant="danger" onClick={handleDeleteAppointment} className="ms-2">
                            Eliminar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};
