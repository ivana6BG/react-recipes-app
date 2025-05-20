import "./Search.css"
import {useLocation} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import {useTheme} from "../../hooks/useTheme";

export default function Search() {
    const {mode} = useTheme()
    const queryString=useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get("q")

    const url = 'http://localhost:3000/recipes?q=' + query

    const {data:recipes, isPending, error} = useFetch(url)

    return (
        <div className={mode}>
            <h2 className="page-title">Recipes including "{query}"</h2>
            {isPending && <p className='loading'>Loading...</p>}
            {error && <p className='error'>{error.message}</p>}
            {recipes && <RecipeList recipes={recipes}/>}
        </div>
    )
}