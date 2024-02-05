import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import Layout from './components/Layout'
import Register from './pages/Register'
import { ReactElement } from 'react'
import Login from './pages/Login'
import AddHotel from './pages/AddHotel'
import { useAppContext } from './contexts/AppContext'
import MyHotels from './pages/MyHotels'

const App = (): ReactElement => {
    const { isLoggedIn } = useAppContext()
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <p>HomePage</p>
                        </Layout>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <Layout>
                            <p>Search page</p>
                        </Layout>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Layout>
                            <Register />
                        </Layout>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Layout>
                            <Login />
                        </Layout>
                    }
                />

                {isLoggedIn && (
                    <>
                        <Route
                            path="/add-hotel"
                            element={
                                <Layout>
                                    <AddHotel />
                                </Layout>
                            }
                        />
                        <Route
                            path="/my-hotels"
                            element={
                                <Layout>
                                    <MyHotels />
                                </Layout>
                            }
                        />
                    </>
                )}

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default App
