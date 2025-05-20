import "./ThemeSelector.css"
import icon from '../assets/mode-icon.svg'
import {useTheme} from "../hooks/useTheme"
export default function ThemeSelector() {
    const {changeColor, changeMode, mode} = useTheme()

    const themeColors = ['#58249c', '#249c6b', '#b70233']

    const toggleMode = () => {
        changeMode(mode==="light" ? "dark" : "light")
    }

    return (
        <div className="theme-selector">
            <div className="mode-toggle">
                <img
                    src={icon}
                    alt=""
                    onClick={toggleMode}
                    style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
                />
            </div>
            <div className="theme-buttons">
                {themeColors.map((color, i) => (
                    <div
                        onClick={()=>changeColor(color)}
                        key={color}
                        style={{backgroundColor: color}}
                    />
                ))}
            </div>

        </div>
    )
}