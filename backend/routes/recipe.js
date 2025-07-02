import express from 'express';
import Recipe from '../models/Recipe.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

//this route for create recipe
router.post('/', protect, async(req,res)=>{
    //when User trying to create a Recipe we will take all this input from user or client
    const {title, ingredients, instructions, category, photoUrl, cookingTime} = req.body;

    try{
        if(!title || !ingredients || !instructions || !category || !photoUrl || !cookingTime){
            //if atleast one of these isn't provided then return below
            return res.status(400).json({message: 'pleased filled all fields!'})
        }

        //User filled all fields so create in recipe
        const recipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            category,
            cookingTime,
            photoUrl,
            createdBy: req.user._id,//add this since it is in model so by doing this we can identify who created a certain Recipe
        })
        
            res.status(201).json(recipe)
        
    }catch(error){
      res.status(500).json({message: "server error"})
    }
})


// this route for  Get recipes
router.get('/', async (req,res)=>{
    const {category} = req.query;
    try{
        //if user sends a category in url then we want to use this category anf if not then we just writge {}empty object
        const query = category ? {category} : {};
        //so if user sends a categeory we want to show Recipes based on categories and if not then we want to show all the Recipes
        const recipes = await Recipe.find(query);
        res.json(recipes)

    } catch (error){
        res.status(500).json({message: 'Server error'})
    }
})

// route to get a single recipe means jab koi single item par click karega
router.get('/:id', async (req, res)=>{
    try{
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe){//if we can't find a Recipe
            return res.status(404).json({message:"Recipe not found"})
        }

        res.json(recipe);//if we manage to find recipe then in json we can show or send this recipe
    } catch(error){
        return res.status(500).json({message:"Server error"})
    }
}) 


//route to update a recipe
router.put("/:id", protect, async(req, res)=>{
    //ye jo user update k liye recipe data bhej raha hai woh hai in req.body
    const {title, ingredients, instructions, category, photoUrl, cookingTime} = req.body;

    
    try{
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe){//if we can't find a Recipe
            return res.status(404).json({message:"Recipe not found"})
        }


        //by doing this we make sure that only the one who created a Recipe can Update that Recipe
        if(recipe.createdBy.toString() !== req.user._id.toString()){
            return res.status(401).json({message:"Not autorized"})
        }

        recipe.title = title || recipe.title;//first title jo user ne update k liye title bheja hai woh hai or recipe.title means old purana wala title
        //here tthis title comes from req.body upar ka jismein user update k liye recipe data bhej raha hai
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.category = category || recipe.category;
        recipe.photoUrl = photoUrl || recipe.photoUrl;
        recipe.cookingTime = cookingTime || recipe.cookingTime;

        const updateRecipe = await recipe.save();
        res.json(updateRecipe);//updated recipe json  form mein send kar diya

    } catch(error){
        return res.status(500).json({message:"Server error"})
    }
    
})

//route for Delete a recipe
router.delete('/:id', protect, async (req,res)=>{
    try{
        const recipe = await Recipe.findById(req.params.id);
        if(!recipe){
            return res.status(404).json({ message: "Recipe not found"});
        }


        //by doing this we make sure that only the one who created a Recipe can delete that Recipe
        if(recipe.createdBy.toString() !== req.user._id.toString()){
            return res.status(401).json({message:"Not autorized"})
        }

        await recipe.deleteOne();
        res.json({message:"Recipe deleted"})

    } catch (error){
        res.status(500).json({ message: "server error"});
    }
})

export default router;