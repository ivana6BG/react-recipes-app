import "./RecipeList.css"
import {Link} from "react-router-dom";
import {useTheme} from "../hooks/useTheme";
import Trashcan from '../assets/trashcan.svg'
import {projectFirestore} from "../firebase/config";

export default function RecipeList({recipes}) {
    const { mode } = useTheme()

    const handleDelete =(id)=>{
        try{
            projectFirestore.collection("recipes")
                .doc(id).delete()
        }catch(err){
            console.log(err)
        }

    }

    if(recipes.length === 0) {
        return <div className="error">No recipes to load...</div>
    }

    return(
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <div className={`card ${mode}`} key={recipe.id}>
                    <h3 >{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make</p>
                    <div>{recipe.method.slice(0, 100)+"..."}</div>
                    <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
                    <img
                        src={Trashcan}
                        alt="delete icon"
                        className="delete"
                        onClick={()=>handleDelete(recipe.id)}

                    />
                </div>
            ))}
        </div>
    )
}