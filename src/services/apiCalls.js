
import axios from "axios";

//ruta que nos lleva a nuestro Backend
const API_URL = "http://localhost:3000/api/"

//Esta funcion recibe las credenciales del usuario (data) y se maneja el inicio de sesion como exitoso o no
export const loginUsers = (data) => {
  return axios
    .post(`${API_URL}users/login`, data)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      return error;
    });
}

//En esta funcion me trae los datos datos de mi usuario por ID 
export const editAdminUsersId = (userId, token, data) =>{
  const config = {
    headers: {
      Authorization: (`Bearer ${token}`)
    }
  }
  return axios
  .put(`${API_URL}/admin/editarUsuario/${userId}`, data, config)
  .then((res) => {
    return res.data;
  })
  .catch((error) => {
    return error;
  });
}

//En esta funcion el usuario ingresa los datos para poder registarse, tambien maneja una respuesta exitosa o no
export const registerUsers = (data) => {
  return axios
    .post(`${API_URL}users/create`, data)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      return error;
    });
}

//Esta funcion maneja el token del usuario para su atenticacion, tambien maneja una respuesta exitosa o no
export const getDataUser = (token) => {
  const config = {
    headers: {
      Authorization: (`Bearer ${token}`)
    }
  }
  return axios
    .get(`${API_URL}users/profile`, config)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      return error;
    })
}

// Esta funcion utiliza un token de Autorizacion para actualizar informacion del perfil(borrar)
export const deleteUsers = (userId, token) => {
  const config = {
    headers: {
      Authorization: (`Bearer ${token}`)
    }
  }
  return axios
    .delete(`${API_URL}delete/` + userId , config)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      return error;
    })
}

//funcion que elimina o desactiva al usuario 

export const deleteUserId = (userId, token) => {
  const config = {
    headers: {
      Authorization: (`Bearer ${token}`)
    }
  }
  return axios
  .delete(`${API_URL}users/delete/${userId}` , config)
  .then((res) => {
    return res.data.message;
  })
  .catch((error) => {
    return error;
  })
}




//Esta funcion me modifica y actualiza los datos del usuario
export const updateUsers = (token, data) => {
  const config = {
    headers: {
      Authorization: (`Bearer ${token}`)
    }
  }
  return axios
    .put(`${API_URL}users/profile/update`, data, config)
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      return error;
    })

}

export const doctors =() => {
  return axios
  .get(`${API_URL}doctores`)
  .then((res) => {
    return res.data[0];
  })
  .catch((error) => {
    return error;
  })

}

export const createAppointment = (token, appointmentData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return axios
  .post(`${API_URL}citas/create`, appointmentData, config)
  .then((res) => {
    return res.data; // Retorna los datos de la nueva cita creada
  })
  .catch((error) => {
    return error; // Lanza el error para que pueda ser manejado por quien llama a esta función
  });
};



// Función para obtener todas las citas
export const getAppointments = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return axios
    .get(`${API_URL}citas/admin/listaCitas`, config)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

// Función para obtener todas los datos usuarios 
export const getAllUsers = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return axios
    .get(`${API_URL}users/all`, config)
    .then((res) => {
      return res.data[0];
    })
    .catch((error) => {
      return error;
    });
};


// Funcion para obtener las citas cliente 

export const getAppointmentsCliente = (token) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return axios
    .get(`${API_URL}citas/cliente/cita`, config)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error;
    });

};


// Funcion para obtener las citas doctores

export const getAppointmentsDoctores = (token) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return axios
    .get(`${API_URL}citas/doctor/cita`, config)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error;
    });

};


// Función para actualizar una cita existente
export const updateAppointment = (token, id, citas) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return axios
    .put(`${API_URL}citas/editarCita/${id}`, citas, config) // Hace una solicitud PUT para actualizar la cita con el ID proporcionado
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => {
      console.log("Error updating appointment:", error);
      return error;
    });
};

// Función para eliminar una cita
export const deleteAppointment = (token, citaId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return axios
    .delete(`${API_URL}citas/${citaId}`, config) 
    .then((res) => {
      return res.data.message; 
    })
    .catch((error) => {
      return error; 
    });
};