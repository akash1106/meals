import React,{useContext,useState,useEffect} from "react";
import axios   from "axios";
import Favorites from "./components/Favorites";

const AppContext=React.createContext();

const allMealUrl='https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl='https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider=({children})=>{
    const[meals,setMeals]=useState([])
    const[loading,setLoading]=useState(false)
    const[searchTerm,setSearchTerm]=useState('')
    const[showModel,setShowModel]=useState(false)
    const[selectedMeal,setSelectedMeal]=useState(null)

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
        console.log("hello")
        let meal;
        meal=meals.find((meal)=>meal.idMeal===idMeal)
        setSelectedMeal(meal)
        setShowModel(true)
    }


    useEffect(()=>{
        fetchMeal(allMealUrl)
    },[])
    useEffect(()=>{
        if(!searchTerm)return
        fetchMeal(`${allMealUrl}${searchTerm}`)
    },[searchTerm])

    return<AppContext.Provider value={{loading,meals,setSearchTerm,showModel,
    fetchRandomMeal,showModel,setSelectedMeal,selectMeal}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext=()=>{
    return useContext(AppContext);
}

export{AppProvider,AppContext}