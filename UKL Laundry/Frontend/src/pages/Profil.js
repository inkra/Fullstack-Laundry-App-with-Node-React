import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import Navbar from '../components/Navbar';
import NavbarKasir from '../components/NavbarKasir';
import NavbarOwner from '../components/NavbarOwner';

class Profil extends React.Component {
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
          // }else{
          //   window.alert("You are not an admin")
          //   window.location = '/login'
          // }
        } 
        // else {
        //   window.location = "/login"
        // }
    
      }

    render(){
        return(
            <>
            {this.state.role == "owner" &&
                                    <NavbarOwner />
                                }
                                {this.state.role == "admin" &&
                                    <Navbar />
                                }
                                {this.state.role == "kasir" &&
                                    <NavbarKasir />
                                }
            <div className="container"> <br></br><br></br>
            <div className='col-lg-7 col-sm-10 p-2'>
            <div className="list-book card-body row">
                        {/* menampilkan Gambar / cover */}
                        <div className="img-book col-5">
                            <img src="https://uploads-ssl.webflow.com/6028430f5bfb03421e801410/604e5444f6c965eb504f0477_ToyFaces_Colored_BG_61-p-500.jpeg" className="img"
                            height="250" />
                        </div>
 
                        {/* menampilkan deskripsi */}
                        <div className="col-4">
                            <h5>
                              {this.state.username}
                            </h5>
                            <h6>
                                Role :  {this.state.role}
                            </h6>
                            <h6>
                              {this.state.id_outlet}
                            </h6>
                            <br></br>
                           
                        </div>
                </div>
                </div>
            </div>
            </>
        )
    }
}

export default Profil;