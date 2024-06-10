import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { userData } from '../../app/slices/userSlice';
import fisioterapeuta from '../../img/fisioterapeutaCarmen.jpg';
import fisioterapia_tecnicas from '../../img/fisioterapia_tecnicas.jpg';
import masaje from '../../img/masaje.gif';
import "./Home.css";



export const Home = () => {
  const userLogued = useSelector(userData).decodificado
  const userToken = useSelector(userData).token

  return (
    <>

      <div className='homeDesign'>
        <img src={fisioterapeuta } alt="fisioterapia" />
        <img src={ masaje} alt="masaje" />
        <img src={ fisioterapia_tecnicas} alt="fisioterapia_tecnicas" />
      </div>
    </>
  )
}











