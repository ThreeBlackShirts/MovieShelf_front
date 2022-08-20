import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { BsStar } from "react-icons/bs";

export function MovieRateView({rate}){
    const fullStar = Math.floor(rate)
    let halfStart = false
    if(!Number.isInteger(rate)){
        halfStart = true
    }
    
    if(fullStar === 1){
        if(halfStart){
            return( <div><BsStarFill/> <BsStarHalf/> <BsStar/> <BsStar/> <BsStar/></div>)
        } else{
            return( <div><BsStarFill/> <BsStar/> <BsStar/> <BsStar/> <BsStar/></div>)
        }
    } else if(fullStar === 2){
        if(halfStart){
            return( <div><BsStarFill/> <BsStarFill/> <BsStarHalf/> <BsStar/> <BsStar/></div>)
        } else{
            return( <div><BsStarFill/> <BsStarFill/> <BsStar/> <BsStar/> <BsStar/></div>)
        }
    } else if(fullStar === 3){
        if(halfStart){
            return( <div><BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarHalf/> <BsStar/></div>)
        } else{
            return( <div><BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStar/> <BsStar/></div>)
        }
    } else if(fullStar === 4){
        if(halfStart){
            return( <div><BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarHalf/></div>)
        } else{
            return( <div><BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStar/></div>)
        }
    } else if(fullStar === 5){
        return( <div><BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/> <BsStarFill/></div>)
    } else {
        if(halfStart){
            return( <div><BsStarHalf/> <BsStar/> <BsStar/> <BsStar/> <BsStar/></div>)
        } else{
            return( <div><BsStar/> <BsStar/> <BsStar/> <BsStar/> <BsStar/></div>)
        }
    }
}