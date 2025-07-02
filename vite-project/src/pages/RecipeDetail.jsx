import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();
    const {user} = useContext(AuthContext);//get access to our user from AuthContext    
    useEffect(()=> {
        const fetchRecipe = async ()=> {
            const res = await axios.get(`/api/recipes/${id}`)//so here we provide this ${id} to backend so that backend gave us Recipe data of this ${id}
            setRecipe(res.data);
        };
        fetchRecipe();//in backend routes->in res.js file we have router.get('/:id') to get single id in req.params.id
        //and server send recipe as res.json(recipe)
    },[id]);

    const navigate = useNavigate();
   
    const handleDelete = async ()=>{
      try{
        const res =await axios.delete(`/api/recipes/${id}`);
        setRecipe(res.data);
        //console.log(res.data); 
        navigate('/');//Everthing goes Right then navigate to Home page using '/
      } catch(error){
         console.error("Error Deleting recipe",error)
      }
    }


    if(!recipe) return <div>Loading...</div>

  return (
    <div className='max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg'>
      {recipe.photoUrl && (
        <img src={recipe.photoUrl} alt={recipe.title}
        className='w-full h-96 object-cover rounded-lg mb-4' />
      )}

      <h1 className='capitalize text-3xl font-bold mb-4'>{recipe.title}</h1>
      <p className='text-gray-600 mb-4'>Category: {recipe.category}</p>
      <p className='text-gray-600 mb-4'>Cooking time: {recipe.cookingTime} minutes</p>
      <h2 className='text-xl font-semibold mb-2'>Ingredients</h2>
      <ul className='pl-6 mb-4 list-disc'>
        {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
                {ingredient}
            </li>
        ))}
      </ul>

      <h2 className='text-xl font-semibold mb-2'>Instructions</h2>
      <p className='text-gray-700 mb-4'>{recipe.instructions}</p>
       {/*/Now we should show 2 button i.e Edit and Delete but these button should shown to a person who created this those Recipe*/}
       
       {user && user._id === recipe.createdBy && (
        <div className='flex space-x-4'>
          <Link to={`/edit-recipe/${id}`}>
            <button className='bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600'>Edit</button>
          </Link>
          <button className='bg-red-500 text-white p-2 rounded hover:bg-red-600' 
          onClick={handleDelete}>Delete</button>
        </div>
       )}


    </div>
    //Now we should show 2 button i.e Edit and Delete but these button should shown to a person who created this those Recipe
  );;
}

export default RecipeDetail
