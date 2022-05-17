import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { MdAdd, MdEdit, MdDeleteOutline } from 'react-icons/md';
import { Badge} from 'react-bootstrap';
import NavbarOwner from '../components/NavbarOwner';


class Laporan extends Component {
  constructor() {
    super();
    this.state = {
      transaksi: [],
      outlet: [],
      member: [],
      user: [],
      isModalOpen: false,
      token: "",
      id_transaksi: 0,
      id_outlet: "",
      kode_invoice: "",
      id_member: "",
      tgl: "",
      batas_waktu: "",
      tgl_bayar: "",
      biaya_tambahan: "",
      diskon: "",
      pajak: "",
      status: "",
      dibayar: "",
      id_user: "",
      search: "",
      userName: "",
      action: "",
      outletname: "",
      membername: "",
      username: "",
      outletid: 0

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "owner") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
        this.state.outletname = localStorage.getItem('outlet')
        this.state.outletid = localStorage.getItem('id_outlet')
        this.state.id_transaksi = localStorage.getItem('id_transaksi')
      } else {
        window.alert("You are not an owner")
        window.location = '/login'
      }
    } 
    // else {
    //   window.location = "/login"
    // }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFile = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  }

  handleClose = () => {
    this.setState({
      isModalOpen: false,
    })
  }

  getTransaksi = () => {
    let url = "http://localhost:8080/transaksi/getByOut/" + this.state.outletid
    axios.get(url)
      .then(res => {
        this.setState({
          transaksi: res.data.transaksi
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  getOutlet = async () => {
    let url = "http://localhost:8080/outlet/"
    axios.get(url)
      .then(res => {
        this.setState({
          outlet: res.data.outlet
        })
        console.log(this.state.outlet)
      })
      .catch(error => {
        console.log(error)
      })
  }

  getMember = async () => {
    let url = "http://localhost:8080/member/"
    axios.get(url)
      .then(res => {
        this.setState({
          member: res.data.member
        })
        console.log(this.state.member)
      })
      .catch(error => {
        console.log(error)
      })
  }

  getUser = async () => {
    let url = "http://localhost:8080/user/"
    axios.get(url)
      .then(res => {
        this.setState({
          user: res.data.user
        })
        console.log(this.state.user)
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  Detail = (id_transaksi) => {
    window.location = '/detail_transaksi/byTransaksi/' + id_transaksi + '/' + this.state.outletid
    localStorage.setItem("id_transaksi", id_transaksi)
  }



  componentDidMount() {
    this.getTransaksi()
    this.getOutlet()
    this.getMember()
    this.getUser()
  }

  render() {
    return (
      <div>
        <NavbarOwner />
        <div className="container"> <br></br>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="display-6">Transaction Data</span>
                </h4><br></br>
          <div className="row">
            <div className="col-4 md-5">
              <div class="alert alert-warning" role="alert">
                Discount 5% and Pajak 10% dari Total Harga
              </div>
                {/* <input type="text" name="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findPaket} class="form-control form-input" placeholder="Find Transaction"/> */}
            </div>
          </div>

          <br></br><br></br>

          <table className="table">
            <thead>
              <tr>
                <th>Kode Invoice</th>
                <th>Member Name</th>
                <th>Tgl Pesan</th>
                <th>Batas Waktu</th>
                <th>Tgl Bayar</th>
                <th>Status</th>
                <th>Dibayar</th>
                <th>Total</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {this.state.transaksi.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.kode_invoice}</td>
                    <td>{item.member.nama}</td>
                    <td>{item.tgl}</td>
                    <td>{item.batas_waktu}</td>
                    <td>{item.tgl_bayar}</td>
                    <td>{item.status == "baru" &&
                                    <Badge bg="danger">{item.status}</Badge>
                                }
                                {item.status == "proses" &&
                                    <Badge bg="warning">{item.status}</Badge>
                                }
                                {item.status == "selesai" &&
                                    <Badge bg="info">{item.status}</Badge>
                                }
                                {item.status == "diambil" &&
                                    <Badge bg="success">{item.status}</Badge>
                                }</td>
                    <td>{item.dibayar == "belum_bayar" &&
                                    <Badge bg="danger">{item.dibayar}</Badge>
                                }
                                {item.dibayar == "dibayar" &&
                                    <Badge bg="success">{item.dibayar}</Badge>
                                }</td>
                                <td>Rp. {item.total}</td>
                    <td>
                    <button className="btn btn-sm btn-primary m-1 col-12" onClick={() => this.Detail(item.id_transaksi)}>Detail</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Transaction Data</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
            {/* <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Member Name</Form.Label>
                <Form.Select type="text" name="id_member" onChange={this.handleChange}>
                  {this.state.action === "update" &&
                    <option value={this.state.id_member}>{this.state.member.nama}</option>
                  }
                  {this.state.action === "insert" &&
                    <option value=""></option>
                  }
                  {this.state.member.map((item, index) => {
                    return (
                      <option value={item.id_member}>{item.nama}</option>
                    )
                  })}
                </Form.Select>
              </Form.Group> */}
           
              <Form.Group className="mb-2" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select type="text" name="status" onChange={this.handleChange} >
                  <option value={this.state.status}>{this.state.status}</option>
                  <option value="baru">baru</option>
                  <option value="proses">proses</option>
                  <option value="selesai">selesai</option>
                  <option value="diambil">diambil</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" controlId="dibayar">
                <Form.Label>Dibayar</Form.Label>
                <Form.Select type="text" name="dibayar" onChange={this.handleChange} >
                  <option value={this.state.dibayar}>{this.state.dibayar}</option>
                  <option value="dibayar">dibayar</option>
                  <option value="belum_bayar">belum_bayar</option>
                </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" id="blue">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>


        <Modal show={this.state.isModalPw} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Update Password</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSavePw(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password_user" value={this.state.password_user} placeholder="Masukkan password"
                  onChange={this.handleChange} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" id="blue">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Laporan;