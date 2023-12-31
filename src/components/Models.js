import {useGlobalContext} from "../context";

const Models=()=>{
    const{closeModel,selectedMeal}=useGlobalContext()
    const{strMealThumb:image,strMeal:title,strInstructions:text,strSource:source}=selectedMeal


    return<aside className="modal-overlay">
        <div className="modal-container">
            <img src={image} alt={title} className="img modal-img"/>
            <div className="modal-content">
                <h4>{title}</h4>
                <p>Cooking Instructions</p>
                <p>{text}</p>
                <a href={source} target="_blank">Original source</a>
            </div>
            <button className="btn btn-hipster close-btn" onClick={closeModel}>close</button>
        </div>
    </aside>
}
export default Models