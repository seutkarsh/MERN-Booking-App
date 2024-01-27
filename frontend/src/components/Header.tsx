import { Link } from 'react-router-dom'
import { ReactElement } from 'react'
import { useAppContext } from '../contexts/AppContext'
const Header = (): ReactElement => {
    const { isLoggedIn } = useAppContext()
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">Holidays.com</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/my-bookings"
                                className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100"
                            >
                                My Bookings
                            </Link>
                            <Link
                                to="/my-hotels"
                                className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100"
                            >
                                My Hotels
                            </Link>
                            <Link
                                to="/sign-out"
                                className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100"
                            >
                                Sign Out
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-100"
                        >
                            Sign In
                        </Link>
                    )}
                </span>
            </div>
        </div>
    )
}

export default Header
