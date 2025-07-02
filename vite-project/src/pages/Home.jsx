
/*here we fetch data of Recipe from Database and show the stored data of Database in Home.jsx page */

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  const [recipes, setRecipes] = useState([]);//[] empty array
  const [category, setCategory] = useState("All");//for filter our Recipes with category

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
  ];

  //useEffect this will Run based on category
  useEffect(()=> {
    const fetchRecipes = async () => {
      const res = await axios.get(`api/recipes/${category && category !== "All" ? `?category=${category}` : "" }`)
      console.log(res.data) //added to show Recipe in console
      setRecipes(res.data)
    }
    fetchRecipes();
  },[category]) //useEffect() will depend upon category
  //In our routes i.e recipe.js mein in a Get receipes we had const query = category ? {category} : {}
  //so we take Recipes dependent on category



  return (
    <div className='max-w-7xl mx-auto p-4'>
      <div className='flex flex-wrap gap-2 mt-2 mb-4'>{/*this <div> will display our categories */}
        {categories.map((cat)=> (
          <button
          onClick={()=> setCategory(cat)} 
          className={`px-4 py-2 rounded-full text-sm font-medium 
          ${category === cat ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`} 
          key={cat}
          > {/*because of this key={cat} each button is unique */}
            
            {cat} 
            {/*here {cat} each element of array categories is button. now we have our buttons to be able to filter our Recipes */}
          
          </button>
        ))}
      </div>


      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {recipes.map((recipe)=> (
          <Link 
          to= {`/recipe/${recipe._id}`}//isse jab particular image par click karenge Home pagwe k toh woh image single page /recipe mein open hoga 
          className='bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg duration-300 cursor-pointer' 
          key={recipe._id} >
            {recipe.photoUrl && (
              <img  src={recipe.photoUrl} alt={recipe.title} /*isse Home page mein image show hoga */ 
              className='w-full h-48 object-cover'/> 
            )}
            <div className='p-4'>
              <h2 className='text-xl font-semibold capitalize'>{recipe.title}</h2>
              <p className='text-gray-600'>{recipe.category}</p>
              <p className='text-gray-600'>{recipe.cookingTime} minutes</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
