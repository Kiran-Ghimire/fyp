import React from "react";
import Hero from "./Hero";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import Serv from "./Serv";
import UserReview from "./UserReview";

export default function Home() {
  return (
    <>
      <Hero hero="defaultHero"></Hero>
      <Banner title="Repair Your Vehicle" subtitle="Get Quality Service">
        <Link to="/hamro/services" className="btn btn-primary">
          Our Services
        </Link>
      </Banner>
      <Serv />
      <UserReview />
    </>
  );
}
