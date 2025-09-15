import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <nav className="bg-slate-100 border-b border-slate-300 p-5">
            <menu className="flex gap-6 list-none m-0 p-0">
                <li>
                    <NavLink
                        to='/signup'
                        className="text-lg font-bold text-slate-700 hover:text-slate-900 transition-colors"
                    >
                        Sign Up
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/'
                        className="text-lg font-bold text-slate-700 hover:text-slate-900 transition-colors"
                    >
                        Lista pizze
                    </NavLink>
                </li>
            </menu>
        </nav>
    )
}

export default Header
