import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import '../index.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import NavbarKasir from '../components/NavbarKasir';
import NavbarOwner from '../components/NavbarOwner';
import { MdAdd, MdEdit, MdDeleteOutline } from 'react-icons/md';

class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            cart: [], // untuk menyimpan list cart
            user: "", // untuk menyimpan data nama user
            total: 0, // untuk menyimpan data total belanja
        }

        if (localStorage.getItem('token')) {
          if (localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "kasir") {
            this.state.role = localStorage.getItem('role')
            this.state.token = localStorage.getItem('token')
            this.state.userName = localStorage.getItem('name')
            this.state.id_member = localStorage.getItem('id_member')
            this.state.id_outlet = localStorage.getItem('id_outlet')
            this.state.id_user = localStorage.getItem('id_user')
            this.state.nama = localStorage.getItem('nama_member')
            this.state.alamat = localStorage.getItem('alamat_member')
            this.state.jenis_kelamin = localStorage.getItem('jenis_kelamin')
            this.state.tlp = localStorage.getItem('tlp_member')
          } else {
            window.alert("You are not an admin/kasir")
            window.location = '/login'
          }
        } else {
          window.location = "/login"
        }
      }

      checkOut = () => {
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        let data = {
            id_outlet: this.state.id_outlet,
            id_member: this.state.id_member,
            biaya_tambahan: this.state.total *(10/100) - this.state.total *(5/100),
            diskon: this.state.total *(5/100),
            pajak: this.state.total *(10/100),
            status: "baru",
            total: this.state.total + (this.state.total *(10/100) - this.state.total *(5/100)),
            dibayar: "belum_bayar",
            id_user: this.state.id_user,
            detail_transaksi: tempCart
        }
        let url = "http://localhost:8080/transaksi"
        axios.post(url, data)
            .then(res => {
                // clear cart
                window.alert("Success Checkout")
                localStorage.removeItem("cart")
                localStorage.removeItem("id_member")
                localStorage.removeItem("alamat_member")
                localStorage.removeItem("nama_member")
                localStorage.removeItem("tlp_member")
                localStorage.removeItem("jenis_kelamin")
                window.location = "/transaksi"
                
            })
            .catch(error => {
                // if (error.res) {
                //     if (error.res.status) {
                //         window.alert(error.res.data.message)
                //         this.props.history.push("/login")
                //     }
                // } else {
                //     console.log(error);
                // }
                window.alert("Failed Checkout")
            })
    }

    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        // memanggil data user pada localStorage
        let userName = localStorage.getItem("user")
        // kalkulasi total harga
        let totalHarga = 0;
        let keterangan;
        tempCart.map(item => {
            totalHarga += (item.harga*item.qty)
            keterangan = "belum_lunas"
        })
        // memasukkan data cart, user, dan total harga pada state
        this.setState({
            cart: tempCart,
            user: userName,
            total: totalHarga
        })
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Do you want to delete this class from your cart")) {
            // menghapus data
            let tempCart = this.state.cart
            // posisi index data yg akan dihapus
            let index = tempCart.indexOf(item)

            // hapus data
            tempCart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(tempCart))

            this.setState({ cart: tempCart })
        }
    }

    componentDidMount(){
        this.initCart()   
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
           
        <div className="container">
            <div className="col-md-8 col-lg-12 order-md-last"><br></br><br></br>
                <h4 className="d-flex justify-content-between align-items-center mb-4">
                    <span className="display-6">Order summary {this.state.nama}</span>
                            <span className="badge bg-dark rounded-pill"></span>
                        </h4>
                        <div className="col-4">
                            <h6>
                                Member Name : {this.state.nama}
                            </h6>
                            <h6>
                                Address     : {this.state.alamat}
                            </h6>
                            <h6>
                                Gender      : {this.state.jenis_kelamin}
                            </h6>
                            <h6>
                                No Telp     : {this.state.tlp}
                            </h6>
                            <br></br>
                        </div>
                        <ul className="list-group ">
                        { this.state.cart.map( (item, index) =>
                            (
                            <li className="list-group-item d-flex justify-content-between">
                                {item.nama_paket}<br></br>
                                {item.qty} x Rp {item.harga} 
                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-light"><p className='subTotal'>Rp { item.harga * item.qty }</p></button>
                                <button className='btn btn-danger' id="blue" onClick={() => this.Drop(item)}><MdDeleteOutline /></button>
                                </div>
                            </li>
                                ) ) }
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total</span>Rp. {this.state.total} 
                            </li>
                        </ul>
                    <br></br>
                <NavLink to='/paket' className="btn btn-light btn-lg w-100" type="submit"><MdAdd /> Add New Laundry Packet</NavLink><br></br>
                <button className="btn btn-primary btn-lg w-100" id="blue" onClick={() => this.checkOut()}>Continue to checkout</button>
            </div>
        </div>
        </>
        )
        }
}

export default Cart;