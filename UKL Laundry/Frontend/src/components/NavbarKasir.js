import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { BsCart } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

class NavbarKasir extends React.Component {
    out = () => {
        if (window.confirm("Are you sure to logout?")) {
         window.location = '/login'
         localStorage.removeItem("name");
         localStorage.removeItem("user");
         localStorage.removeItem("token");
         localStorage.removeItem("id_user");
         localStorage.removeItem("id_transaksi");
         localStorage.removeItem("id_outlet");
         localStorage.removeItem("role");
        }
       }
    render(){
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-0" bg="dark" variant="dark">
                  <div className="container-fluid">
                      <NavLink className="navbar-brand fs-4" to="/">
                        <p className="btn ms-2"></p>
                          <img src="https://media.istockphoto.com/vectors/washing-and-drying-clothes-design-laundry-room-with-a-washing-machine-vector-id1286932939?b=1&k=20&m=1286932939&s=612x612&w=0&h=1NIDln8v0fuAiJkbeV0icCXQc_LKWrSv1rLNDjW1UAI=" width={150}></img>
                      </NavLink>
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                                  <NavLink className="nav-link" to="/">Home</NavLink>
                              </li>
                              <li className="nav-item">
                                  <NavLink className="nav-link" to="/member">Member</NavLink>
                              </li>
                              <li className="nav-item">
                                  <NavLink className="nav-link" to="/transaksi">Transaksi</NavLink>
                              </li>
                          </ul>
                          <div className="buttons">
                          <NavLink to="/cart" className="btn ms-2"><BsCart /></NavLink>
                                <a className="btn ms-2" onClick={() => this.out()}><FiLogOut /></a>
                                <NavLink to="/profile" className="btn ms-4">
                                <img src='https://uploads-ssl.webflow.com/6028430f5bfb03421e801410/604e5444f6c965eb504f0477_ToyFaces_Colored_BG_61-p-500.jpeg' style={{borderRadius: '75px'}} width={30}/></NavLink>
                                <p className="btn ms-2"></p>
                          </div>
                      </div>
                  </div>
              </nav>
      </div>
    );
    }
  }
  
  export default NavbarKasir;