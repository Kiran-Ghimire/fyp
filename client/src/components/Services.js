import React from "react";
import Hero from "./Hero";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import BookService from "./Booking/BookService";

//import RoomsContainer from '../components/RoomsContainer';
const Services = () => {
  return (
    <div>
      <Hero hero="servicesHero"></Hero>
      <Banner title="Our Services" subtitle="Best in Town">
        <Link to="/" className="btn btn-warning">
          RETURN HOME
        </Link>
      </Banner>
      <BookService />
    </div>
  );
};

export default Services;
