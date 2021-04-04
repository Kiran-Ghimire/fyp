
import React, { Component } from 'react'
import Title from './Title'
import {   FaShuttleVan} from 'react-icons/fa'
import {GiAutoRepair} from 'react-icons/gi'
import {AiFillCar} from 'react-icons/ai'
import {MdLocalCarWash} from 'react-icons/md'
export default class Serv extends Component {
    state={
        services:[
            {
                icon:<AiFillCar/>,
                title: "Vehicle Servicing",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur"
            },
            {
                icon:<GiAutoRepair/>,
                title: "Vehicle Repair",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur"
            },
            {
                icon:<FaShuttleVan/>,
                title: "Ceramic Coating ",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur"
            },
            {
                icon:<MdLocalCarWash/>,
                title: "Car Wash",
                info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur"
            },

        ]
    }
    render() {
        return (
            <div className="container-fluid services">
             <Title  title="Services" />
                <div className="row">
                   {this.state.services.map((item, index) => {
                      return(
                        <div className="col-md-4 col-lg-3 col-12 mx-auto my-3" key={index}>
                            <div className="card shadow-lg border-0 p-4">
                                <article className="service">
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                                </article>              
                           </div>
                        </div>
                      )
                   })}
                </div>
            </div>
        )
    }
}
