import React, { Component } from "react";
import Title from "./Title";
import { FaShuttleVan } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import { MdLocalCarWash } from "react-icons/md";
export default class Serv extends Component {
  state = {
    services: [
      {
        icon: <AiFillCar />,
        title: "Vehicle Servicing",
        info: "Service your vehicle at lowest cost.",
      },
      {
        icon: <GiAutoRepair />,
        title: "Vehicle Repair",
        info: "Repair your vehicle if there is a problem.",
      },
      {
        icon: <FaShuttleVan />,
        title: "Ceramic Coating ",
        info: "Use ceramic coating for your vehicle.",
      },
      {
        icon: <MdLocalCarWash />,
        title: "Vehicle Wash",
        info: "Wash your vehicle and make it clean,",
      },
    ],
  };
  render() {
    return (
      <div className="container-fluid services">
        <Title title="What do we do?" />
        <div className="row">
          {this.state.services.map((item, index) => {
            return (
              <div
                className="col-md-4 col-lg-3 col-12 mx-auto my-3"
                key={index}
              >
                <div className="card shadow-lg border-0 p-4">
                  <article className="service">
                    <span>{item.icon}</span>
                    <h6>{item.title}</h6>
                    <p>{item.info}</p>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
