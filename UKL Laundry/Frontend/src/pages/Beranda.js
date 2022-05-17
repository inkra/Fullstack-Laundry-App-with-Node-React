import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import Navbar from '../components/Navbar';
import NavbarOwner from '../components/NavbarOwner';
import NavbarKasir from '../components/NavbarKasir';

class Beranda extends React.Component {
    constructor() {
        super()
        this.state = {
          token: "",
          username: "",
          userId: 0,
          role: ""
        }
    
        if (localStorage.getItem('token')) {
          // if (localStorage.getItem('role') === "admin") {
            this.state.role = localStorage.getItem('role')
            this.state.token = localStorage.getItem('token')
            this.state.username = localStorage.getItem('name')
            this.state.id_outlet = localStorage.getItem('id_outlet')
          // }else{
          //   window.alert("You are not an admin")
          //   window.location = '/login'
          // }
        } 
        else {
          window.location = "/login"
        }
    
      }

    render(){
        return(
            <>
            {this.state.role == "kasir" &&
                                    <NavbarKasir />
                                }
            {this.state.role == "owner" &&
                                    <NavbarOwner />
                                }
                                {this.state.role == "admin" &&
                                    <Navbar />
                                }
                                
            <div className="container"> <br></br><br></br><br></br><br></br><br></br>
                <div className="row">
                    <div className="col-6">
                        <h4 className="d-flex justify-content-between align-items-center mb-2">
                            <span className="display-6">Welcome back {this.state.username} <br></br> to Laundry App. You <br></br> are logged in as {this.state.role}</span>
                        </h4><br></br>
                        <h6 className='desc'>We will use all our strength, to shorten <br></br> the time. It takes for the laundry to take place.</h6>
                       
                        <br></br><br></br>
                        {this.state.role == "owner" &&
                                    <NavLink to='/laporan' className="btn btn-primary btn-lg w-10" type="submit">Generate Laporan Transaksi<MdArrowForwardIos />
                                    </NavLink>
                                }
                                {this.state.role == "admin" &&
                                    <NavLink to='/transaksi' className="btn btn-primary btn-lg w-10" type="submit">Management All Laundry Data <MdArrowForwardIos />
                                    </NavLink>
                                }
                                {this.state.role == "kasir" &&
                                    <NavLink to='/transaksi' className="btn btn-primary btn-lg w-10" type="submit">Management All Laundry Data <MdArrowForwardIos />
                                    </NavLink>
                                }
                        
                    </div>
                    <div className="col-4">
                        <img src='https://cdn.dribbble.com/users/1104799/screenshots/3034886/microfiber_towels_d_2x.png?compress=1&resize=800x600&vertical=top' height="80%"></img>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Beranda;