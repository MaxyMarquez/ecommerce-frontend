import React from 'react'
import NavBar from '../Navbar/NavBar'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Newsletter from '../Newsletter/Newsletter'
import Menu from '../Menu/Menu'
import Reviews from '../Reviews/Reviews'



const Home = () => {
    return (
        <>
            <NavBar />
            <div className='container'>
                <Header />
                <Menu />
            </div>
            <Reviews />
            <Newsletter />
            <Footer />
        </>
    )
}

export default Home