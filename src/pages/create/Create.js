import "./Create.css"
import {useEffect, useRef, useState} from "react";
import {useFetch} from "../../hooks/useFetch";
import {useNavigate} from "react-router-dom";
import  {projectFirestore} from "../../firebase/config";

export default function Create() {
    const [title, setTitle] = useState("")
    const[cookingTime, setCookingTime] = useState("")
    const[method, setMethod] = useState("")
    const [newIngredient, setNewIngredient] = useState("")
    const[ingredients, setIngredients] = useState([])
    const ingredientsInput=useRef(null)

    const navigate=useNavigate()

    const {postData, data, error}= useFetch("http://localhost:3000/recipes", 'POST')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const doc = {
            title,
            method,
            ingredients,
            cookingTime: cookingTime + " minutes"
        }

        try {
            await projectFirestore.collection('recipes').add(doc)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    const handleAdd =(e)=>{
        e.preventDefault()
        const ingr=newIngredient.trim()

        if(ingr && !ingredients.includes(ingr)){
            setIngredients(prevIngr=>[...prevIngr, ingr])
        }
        setNewIngredient('')
        ingredientsInput.current.focus()
        console.log(ingredients)
    }
    return (
        <div className="create">
            <h2 className="page-title">Add new recipe</h2>
            <form onSubmit={handleSubmit}>

                <label>
                    <span>Recipe title:</span>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required={true}
                    />
                </label>

                <label>
                    <span>Recipe ingredients:</span>
                    <div className="ingredients">
                        <input
                            type='text'
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            required={ingredients.length===0}
                            ref={ingredientsInput}
                        />
                        <button onClick={handleAdd} className="btn">add</button>
                    </div>
                </label>
                <p>Current ingredients: {ingredients.map((ingr)=><em key={ingr}>{ingr}, </em>)}</p>

                <label>
                <span>Recipe method:</span>
                    <textarea
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        required={true}
                    />
                </label>

                <label>
                    <span>Cooking time (minutes):</span>
                    <input
                        type='number'
                        value={cookingTime}
                        onChange={(e) => setCookingTime(e.target.value)}
                        required={true}
                    />
                </label>

                <button className="btn">Submit</button>

            </form>
        </div>
    )
}