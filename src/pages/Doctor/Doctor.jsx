import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAppointmentsDoctores } from "../../services/apiCalls";
import { Col, Container, Row } from "react-bootstrap";
import { userData } from "../../app/slices/userSlice";
import "./Doctor.css";

export const Doctor = () => {
    const [citasDoctor, setCitasDoctor] = useState([]);
    const userToken = useSelector(userData).token;
    const userLogued = useSelector(userData).decodificado;
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        if (userLogued.userRole === '2') {
            getAppointmentsDoctores(userToken)
                .then((citasDoctor) => {
                    setCitasDoctor(citasDoctor);
                })
                .catch((error) => {
                    console.error("Error al obtener citas del doctor:", error);
                });
        }
    }, [userToken, userLogued.userRole]);

    return (
        <Container className="doctor_design">
            {userLogued.userRole === "2" && (
                <Row>
                    {citasDoctor.map((cita) => (
                        <Col key={cita.id} className="d-flex justify-content-center" md={5}>
                            <Row className="justify-content-center">
                                <Col className="card_design" md={10}>
                                    <Row>
                                        <Col md={12}>
                                            <h6>Cita : {cita.description}</h6>
                                        </Col>
                                        <Col md={12}>
                                            <h6>Fecha : {cita.day_date}</h6>
                                        </Col>
                                        <Col md={12}>
                                            <h6>Precio : {cita.price}$</h6>
                                        </Col>
                                        <Col md={12}>
                                            <h6>Doctor : {cita.doctor.user.firstName}</h6>
                                        </Col>
                                        <Col md={12}>
                                            <h6>Cliente : {cita.cliente.user.firstName}</h6>
                                        </Col>
                                    
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};
