import React from 'react'
import Hero from './Hero'
import Banner from './Banner';
import { Link } from 'react-router-dom';

//import RoomsContainer from '../components/RoomsContainer';
const Services = () => {
    return (
    <div>
        <Hero hero="servicesHero">
        </Hero>
        <Banner title="Our Services" subtitle="Best in Town">
                <Link to="/" className="btn btn-warning">
                      RETURN HOME
                </Link>
        </Banner>
        
    </div>
    )
}

export default Services;
