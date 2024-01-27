import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import React, { ReactElement } from 'react'

interface ILayoutProps {
    children: React.ReactNode
}
const Layout = ({ children }: ILayoutProps): ReactElement => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Hero />
            <div className="container py-10 mx-auto flex-1">{children}</div>
            <Footer />
        </div>
    )
}

export default Layout
