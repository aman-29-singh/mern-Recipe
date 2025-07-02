import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";
import { useEffect } from 'react';

const EditRecipe = () => {
    const [formData, setFormData] = useState({
        title: "",
        ingredients: [''],
        instructions: "",
        category: "",
        cookingTime: "",
        photoUrl: ""
    })
    
    const {id} = useParams();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...formData.ingredients];//using spread operator we see that this newIngredients will be equal to our existing formData Ingredients
        newIngredients[index] = value;
        handleInputChange("ingredients", newIngredients)
        const lastIngredient = formData.ingredients[formData.ingredients.length - 1];
        if (error && lastIngredient.trim() !== "") {
            setError('');
        }
    }

    const addIngredient = () => {
        const lastIngredient = formData.ingredients[formData.ingredients.length - 1];
        if (lastIngredient.trim() !== "") {
            setError('');
            handleInputChange("ingredients", [...formData.ingredients, ""])
        } else {
            setError("please fill in the lastt ingredient before adding a new one")
        }
    }

    const removeIngredient = (index) => {
        if (formData.ingredients.length > 1) {
            const newIngredients = formData.ingredients.filter((_, i) => i !== index) //_ reprsent ingredients and i its index
            handleInputChange("ingredients", newIngredients)
            const lastIngredient = formData.ingredients[formData.ingredients.length - 1]; //to point last ingredient
            if (error && lastIngredient.trim() !== "") {
                setError("");
            }
        }
    }

    
    const handleSubmit = async (e)=> { //this function use in form to submit the form
        e.preventDefault();//so that after Submittting form our page Refreshes but we want to prevent this so we write preventDefault
        setError("");//if there were some error so we want to reset them
        setLoading(true);

        try{
            await axios.put(`/api/recipes/${id}`, {//axios se request send karna hota hai backend par toh ``backTick ka use kate hai
                title: formData.title,
                ingredients: formData.ingredients.filter((i)=> i.trim() !== ""),
                instructions: formData.instructions,
                category: formData.category,
                photoUrl: formData.photoUrl,
                cookingTime: formData.cookingTime ? Number(formData.cookingTime) : undefined,
            },);
            navigate('/')//navigate to Home page after submitting
        }catch (err) {
            setError("Failed to add recipe")
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=> {
        const fetchRecipe = async ()=> {
            const res = await axios.get(`/api/recipes/${id}`)//so here we provide this ${id} to backend so that backend gave us Recipe data of this ${id}
            setFormData({
                title: res.data.title,
                ingredients: res.data.ingredients,
                instructions: res.data.instructions,
                category: res.data.category,
                photoUrl: res.data.photoUrl,
                cookingTime: res.data.cookingTime ? Number(formData.cookingTime) : undefined
            });
        };
        fetchRecipe();//in backend routes->in res.js file we have router.get('/:id') to get single id in req.params.id
        //and server send recipe as res.json(recipe)
    },[id]);


     if(!formData) return <div>Loading...</div>//to solve error of cannot Read properties of undefined


    return (
        <div className='max-w-2xl mx-auto p-4'>
            <h1 className='text-2xl font-bold'>Edit Recipe</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-gray-700'>Title</label>
                    <input
                        type='text'
                        value={formData.title}//i.e formData.value ki jagah formData.title aayega
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        required
                        className='w-full p-2 border rounded' />
                </div>

                <div>
                    <label className='block text-gray-700'>Ingredients</label>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index}>{/*added key here*/}
                            <input type='text'
                                value={ingredient}
                                onChange={(e) => handleIngredientChange(index, e.target.value)}
                                className='w-full p-2 border rounded'
                                placeholder={'Ingredient '}//placeholder ${index + 1}
                                required
                            />
                            {formData.ingredients.length > 1 && (
                                <button type='button' onClick={() => removeIngredient(index)}
                                    className='ml-2 text-red-500 hover:text-red-700'>Remove</button>
                            )}
                        </div>
                    ))}
                    <button type='button' className='text-blue-500' onClick={addIngredient}>Add Ingredient</button>
                </div>


                <div>
                    <label className='block text-gray-700'>Instructions</label>
                    <textarea
                        type='text'
                        value={formData.instructions}
                        onChange={(e) => handleInputChange('instructions', e.target.value)}
                        required
                        className='w-full p-2 border rounded' />
                </div>


                <div>
                    <label className='block text-gray-700'>Category</label>
                    <select onChange={(e) => handleInputChange("category", e.target.value)}
                        value={formData.category}
                        required
                        className='w-full p-2 border rounded'
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Snack">Snack</option>

                    </select>

                </div>



                <div>
                    <label className='block text-gray-700'>Cooking Time (minutes)</label>
                    <input
                        type='number'
                        value={formData.cookingTime}
                        onChange={(e) => handleInputChange('cookingTime', e.target.value)}
                        required
                        className='w-full p-2 border rounded'
                        placeholder="e.g., 30"
                        min={0} />
                        
                </div>




                <div>
                    <label className='block text-gray-700'>Photo Url</label>
                    <input
                        type='text'
                        value={formData.photoUrl}
                        onChange={(e) => handleInputChange('photoUrl', e.target.value)}//add photoUrl
                        required
                        className='w-full p-2 border rounded'
                        placeholder="Url"
                        min={0} />
                        
                </div>
                <button className={`bg-blue-500 text-white p-2 rounded hover:bg-blue-700
                    ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}
                     type='submit'>
                    {loading ? "Updating...": "Update Recipe"}
                </button>




                

            </form>
        </div>
    )
}

export default EditRecipe
