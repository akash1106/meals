import React,{useContext,useState,useEffect} from "react";
import axios   from "axios";
import Favorites from "./components/Favorites";

const AppContext=React.createContext();

const allMealUrl='https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl='https://www.themealdb.com/api/json/v1/1/random.php'
const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');
    if (favorites) {
      favorites = JSON.parse(localStorage.getItem('favorites'))
    }
    else {
      favorites = []
    }
    return favorites
  }


const AppProvider=({children})=>{
    const[meals,setMeals]=useState([])
    const[loading,setLoading]=useState(false)
    const[searchTerm,setSearchTerm]=useState('')
    const[showModel,setShowModel]=useState(false)
    const[selectedMeal,setSelectedMeal]=useState(null)
    const[favorite,setFavorite]=useState(getFavoritesFromLocalStorage());


    const fetchMeal=async(url)=>{
        setLoading(true)
        try{
            const {data}=await axios(url)
            if(data.meals){
                setMeals(data.meals)
            }else{
                setMeals([])
            }
        }catch(error){
            console.log(error.response);
        }
        setLoading(false)
    }
    const fetchRandomMeal=()=>{
        fetchMeal(randomMealUrl)
    }
    const selectMeal=(idMeal,favoriteMeal)=>{
        let meal;
        if(favoriteMeal){
            meal=favorite.find((meal)=>meal.idMeal === idMeal)
        }else{
            meal = meals.find((meal) => meal.idMeal === idMeal);
        }
        setSelectedMeal(meal)
        setShowModel(true)
    }
    const closeModel=()=>{
        setShowModel(false)
    }
    const addToFavorities=(idMeal)=>{
        const meal=meals.find((meal)=>meal.idMeal===idMeal)
        const alreadyFavorities=favorite.find((meal)=>meal.idMeal===idMeal)
        if(alreadyFavorities) return
        const updateFavorities=[...favorite,meal]
        setFavorite(updateFavorities)
        localStorage.setItem("favorites", JSON.stringify(updateFavorities))
    }
    const removeToFavorities=(idMeal)=>{
        const updateFavorities=favorite.filter((meal)=>meal.idMeal!==idMeal)
        setFavorite(updateFavorities)
        localStorage.setItem("favorites", JSON.stringify(updateFavorities))
    }

    useEffect(()=>{
        fetchMeal(allMealUrl)
    },[])
    useEffect(()=>{
        if(!searchTerm)return
        fetchMeal(`${allMealUrl}${searchTerm}`)
    },[searchTerm])

    return<AppContext.Provider value={{loading,meals,setSearchTerm,showModel,
    fetchRandomMeal,showModel,setSelectedMeal,selectedMeal,closeModel,selectMeal
    ,addToFavorities,removeToFavorities,favorite}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext=()=>{
    return useContext(AppContext);
}

export{AppProvider,AppContext}