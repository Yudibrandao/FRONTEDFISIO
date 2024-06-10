import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { doctors, createAppointment, getAppointmentsCliente, getAppointmentsDoctores} from "../../services/apiCalls";
import { userData, userLogout } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import "./Appointment.css";

export const Appointments = () => {
    const [modify_citas, setModify_citas] = useState(false);
    const userToken = useSelector(userData).token
    const userLogued = useSelector(userData).decodificado
    const [doctores, setDoctores] = useState([])
    const [citas, setCitas] = useState([])
    const [modify, setModify] = useState(false)//Si el perfil se modifica o no
    const [citasDoctor, setCitasDoctor] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        title: "",
        date: "",
        time: "",
        type: "",
        Doctor: ""
    });


    useEffect(() => {
        doctors()
            .then((doctors) => {
                setDoctores(doctors)
            })
            .catch(() => {
            })

    }, [userToken])

    useEffect(() => {
        getAppointmentsCliente(userToken)
            .then((citas) => {
                setCitas(citas)
            })
            .catch(() => {
            })

    }, [userToken])


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


    const handleCreateAppointment = () => {

        if (newAppointment.title === "" || newAppointment.date === "" || newAppointment.time === "" || newAppointment.type === "") return console.log("Ningun campo puede estar vacio")
        let data_to_send = {}
        data_to_send.day_date = newAppointment.date
        data_to_send.description = newAppointment.title
        data_to_send.price = 150
        data_to_send.Doctor = newAppointment.Doctor
        console.log(data_to_send)
        createAppointment(userToken, data_to_send)
            .then((res) => {
                console.log(res)
                setNewAppointment({
                    title: "",
                    date: "",
                    time: "",
                    type: ""
                });

                getAppointmentsCliente(userToken)
                    .then((citas) => {
                        setCitas(citas)
                    })
                    .catch(() => {
                    })

                setShowCreateForm(false);
            })
            .catch(() => {

            })
    };

    return (
        <Container className="appointmentsDesign">
            {userLogued.userRole === "3" ? (
                <>
                    {!showCreateForm && (
                        <Row>
                            <Col className="d-flex justify-content-center col_button_create" md={2}>
                                <Button className="button_create_design" onClick={() => setShowCreateForm(true)}>Crear Cita</Button>
                            </Col>
                            {citas.map((cita) => {
                                return (
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
                                                        <h6>Precio : {cita.price}</h6>
                                                    </Col>
                                                    <Col md={12}>
                                                        <h6>Doctor : {cita.doctor.user.firstName}</h6>
                                                    </Col>
                                                    <Col md={12}>
                                                        <h6>Email : {cita.doctor.user.email}</h6>
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Row>

                                    </Col>
                                )

                            })}
                        </Row>
                    )}

                    {showCreateForm && (
                        <Row className="d-flex justify-content-center">
                            <Col className="card_design" md={4}>
                                <CustomInput
                                    type="text"
                                    placeholder="Título de la cita"
                                    value={newAppointment.title}
                                    handler={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                                />
                                <CustomInput
                                    type="date"
                                    placeholder="Fecha"
                                    value={newAppointment.date}
                                    handler={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                                />
                                <CustomInput
                                    type="time"
                                    placeholder="Hora"
                                    value={newAppointment.time}
                                    handler={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                                />
                                <div>
                                    {doctores.map((doctor) => {

                                        return (
                                            <div key={doctor.id}>

                                                <label ><input onClick={() => setNewAppointment({ ...newAppointment, Doctor: doctor.id })} type="radio" name="doctor" value={doctor.id} />{doctor.user.firstName}</label>
                                                
                                            </div>
                                        )
                                    })}
                                </div>
                                <div>
                                    <Button
                                        variant={newAppointment.type === "Masaje" ? "primary" : "outline-primary"}
                                        onClick={() => setNewAppointment({ ...newAppointment, type: "Masaje" })}
                                    >
                                        Masaje
                                    </Button>
                                    <Button
                                        variant={newAppointment.type === "Terapia" ? "primary" : "outline-primary"}
                                        onClick={() => setNewAppointment({ ...newAppointment, type: "Terapia" })}
                                    >
                                        Terapia
                                    </Button>
                                </div>
                                <Button className="botones" onClick={handleCreateAppointment}>Guardar</Button>
                                <Button className="botones" onClick={() => setShowCreateForm(false)}>Cancelar</Button>
                            </Col>

                        </Row>
                    )}
                </>
            ) : (
                <>
                    <Row>

                        {citasDoctor.map((cita) => (
                            <Col key={cita.id} className="d-flex justify-content-center" md={5}>

                                <Row className="justify-content-center">
                                    <Col className="card_design" md={10}>
                                        <Row>

                                            <Col md={12}>
                                                <h6>Fecha : {cita.id}</h6>
                                            </Col>
                                            <Col md={12}>
                                                <h6>Precio : {cita.price}</h6>
                                            </Col>
                                            <Col md={12}>
                                                <h6>Precio : {cita.day_date}</h6>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        ))}
                    </Row>
                </>
            )
            };


        </Container>
    );

};
