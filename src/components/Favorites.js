import { useGlobalContext } from "../context"

const Favorites=()=>{
    const { favorite, selectMeal, removeToFavorities } = useGlobalContext()
    return<section className="favorites">
        <div className="favorites-content">
            <h5>Favorites</h5>
            <div className="favorites-container">
                {favorite.map((item)=>{
                    const {idMeal,strMealThumb:image}=item;
                    return<div key={idMeal} className="favorite-item">
                        <img src={image} className="favorite-img img" onClick={()=>selectMeal(idMeal,true)}/>
                        <button className="remove-btn" onClick={()=>removeToFavorities(idMeal)}>remove</button>
                    </div>
                })}
            </div>
        </div>
    </section>
}
export default Favorites