import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import Layout from './components/Layout'
import Register from './pages/Register'
import { ReactElement } from 'react'

const App = (): ReactElement => {
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
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default App
