import React from 'react'
import Navbar from '../Navbar/NavBar'
import Footer from '../Footer/Footer'
import Newsletter from '../Newsletter/Newsletter'
import './aboutUs.css'

const linkedin = <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 448 512" fill='#000'><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>

const github = <svg xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 448 512" fill='#000'><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z" /></svg>
const AboutUs = () => {
    return (
        <>
            <Navbar />
            <section className='container flex-column text-white'>
                {/* <div>
                    <p className='mt-5 fs-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptates asperiores earum maxime, nulla quis necessitatibus ad blanditiis animi officiis autem repellendus nam amet ea voluptatum voluptatem? Veniam, commodi doloremque.</p>
                </div> */}
                <h1 className='py-2 text-center text-black'>Nuestro Equipo</h1>
                <div >
                    <div className="cards-container">
                        <div className='card-container'>
                            <img src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                            <div className='card-info'>
                                <p className='card-name'>Alexander Torres</p>
                                <div className='card-social'>
                                    <p className='fs-5'>Full Stack Developer</p>
                                    <div className='card-link'>
                                        <a className='me-3' href="https://www.linkedin.com/in/dev-alexander-torres/" target='_blank'>{linkedin}</a>
                                        <a className='me-3' href="https://github.com/websterAJ" target='_blank'>{github}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-container'>
                            <img src="https://st4allthings4p4ci.blob.core.windows.net/allthingshair/allthingshair/wp-content/uploads/sites/11/2021/12/14152331/corte-de-pelo-degradado.jpg" alt="" />
                            <div className='card-info'>
                                <p className='card-name'>Federico Carusso</p>
                                <div className='card-social'>
                                    <p className='fs-5'>Full Stack Developer</p>
                                    <div className='card-link'>
                                        <a className='me-3' href="https://www.linkedin.com/in/flaviamelissalopez/" target='_blank'>{linkedin}</a>
                                        <a className='me-3' href="https://github.com/MelLopez22" target='_blank'>{github}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-container'>
                            <img src="https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                            <div className='card-info'>
                                <p className='card-name'>Matias Tari</p>
                                <div className='card-social'>
                                    <p className='fs-5'>Full Stack Developer</p>
                                    <div className='card-link'>
                                        <a className='me-3' href="https://www.linkedin.com/in/matias-tari-299a10211/" target='_blank'>{linkedin}</a>
                                        <a className='me-3' href="https://github.com/MatiTarl " target='_blank'>{github}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-container'>
                            <img src="https://images.pexels.com/photos/716411/pexels-photo-716411.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                            <div className='card-info'>
                                <p className='card-name'>Thiago Fernandez</p>
                                <div className='card-social'>
                                    <p className='fs-5'>Full Stack Developer</p>
                                    <div className='card-link'>
                                        <a className='me-3' href="">{linkedin}</a>
                                        <a className='me-3' href="">{github}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-container'>
                            <img src="https://images.pexels.com/photos/840916/pexels-photo-840916.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                            <div className='card-info'>
                                <p className='card-name'>Miguel tello</p>
                                <div className='card-social'>
                                    <p className='fs-5'>Full Stack Developer</p>
                                    <div className='card-link'>
                                        <a className='me-3' href="https://www.linkedin.com/in/agustin-almonacid-1431851bb/" target='_blank'>{linkedin}</a>
                                        <a className='me-3' href="https://github.com/Turco777 " target='_blank'>{github}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-container'>
                            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <div className='card-info'>
                                <p className='card-name'>Maximiliano Marquez</p>
                                <div className='card-social'>
                                    <p className='fs-5'>Full Stack Developer</p>
                                    <div className='card-link'>
                                        <a className='me-3' href="https://www.linkedin.com/in/maximiliano-marquez-519274183/" target='_blank'>{linkedin}</a>
                                        <a className='me-3' href="https://github.com/MaxyMarquez" target='_blank'>{github}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-container'>
                            <img src="https://img.freepik.com/foto-gratis/personas-que-sonrie-alegre-hombres-guapos_1187-6057.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699228800&semt=ais" alt="" />
                            <div className='card-info'>
                                <p className='card-name'>Joaquin Medina</p>
                                <div className='card-social'>
                                    <p className='fs-5'>Full Stack Developer</p>
                                    <div className='card-link'>
                                        <a className='me-3' href="https://www.linkedin.com/in/maximiliano-marquez-519274183/" target='_blank'>{linkedin}</a>
                                        <a className='me-3' href="https://github.com/MaxyMarquez" target='_blank'>{github}</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <footer>
                <Newsletter />
                <Footer />
            </footer>
        </>
    )
}

export default AboutUs