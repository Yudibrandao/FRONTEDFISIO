import "./ButtonC.css"

export  const ButtonC = ({title, funtionEmit, className}) => {

    return(
        <div className={className} onClick={funtionEmit}>{title} </div>
    )


}

