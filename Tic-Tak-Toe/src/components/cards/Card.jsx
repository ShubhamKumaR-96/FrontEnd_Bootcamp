import Icons from "../icons/icons"
import './Card.css'

function Card({player}){
    let icon=<Icons />
    if (player=="X"){
        icon= <Icons name="cross" />
    }else if (player=="O"){
        icon =<Icons name="circle" />
    }

    return (
        <div className="card">
             {icon}
        </div>
    )
}

export default Card;