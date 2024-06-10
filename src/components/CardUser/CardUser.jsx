import React from "react";
import "./CardUser.css"

export const CardUser = ({ full_name, photo, email, key, is_active, role_id }) => {

    return (
        <div className="card-worker" key={key} dragable="false"> 
            <img className="worker" src={photo} alt={photo} /> 
            <div className="desc">
                <div className="name">{full_name}</div>
                <div className="email">{email}</div>
                <div className="is_active">{is_active}</div>
                <div className="role_id">{role_id}</div>
            </div> 
        </div>
    )
}