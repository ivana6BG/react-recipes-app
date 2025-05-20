import "./Navbar.css"
import {Link, NavLink} from "react-router-dom";
import SearchBar from "./SearchBar";
import {useTheme} from "../hooks/useTheme";
import ThemeSelector from "./ThemeSelector";


export default function Navbar() {
    const {color} =useTheme();
    return (
        <div className="navbar" style={{backgroundColor: color}}>
            <nav>
                <Link to="/" className="brand">
                    <h1>My TOP Recipes</h1>
                </Link>
                <SearchBar/>
                <Link to="/create">Create</Link>
            </nav>
        </div>
    )
}