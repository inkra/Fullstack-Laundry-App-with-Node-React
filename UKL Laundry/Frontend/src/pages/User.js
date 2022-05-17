import React from 'react';
import Navbar from '../components/Navbar'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MdAdd, MdEdit, MdDeleteOutline } from 'react-icons/md';

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      outlet: [],
      isModalOpen: false,
      token: "",
      id_user: 0,
      nama: "",
      username: "",
      password: "",
      id_outlet: "",
      role: "",
      search: "",
      userName: "",
      outletname: "",
      isModalPw: false,
      action: ""

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
      } else {
        window.alert("You are not an admin")
        window.location = '/login'
      }
    } else {
      window.location = "/login"
    }
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
      isModalPw: false,
    })
  }

  getUser = () => {
    let url = 'http://localhost:8080/user/'
    axios.get(url, this.headerConfig())
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

  // findUser = (event) => {
  //     let url = "http://localhost:8080/user/find";
  //     if (event.keyCode === 13) {
  //         // menampung data keyword pencarian
  //         let form = {
  //             find: this.state.search
  //         }
  //         // mengakses api untuk mengambil data pegawai
  //         // berdasarkan keyword
  //         axios.post(url, form)
  //             .then(response => {
  //                 // mengisikan data dari respon API ke array pegawai
  //                 this.setState({ user: response.data.result });
  //             })
  //             .catch(error => {
  //                 console.log(error);
  //             });
  //     }
  // }

  handleEdit = (item) => {
    let url = "http://localhost:8080/outlet/" + item.id_outlet
    axios.get(url)
      .then(res => {
        this.setState({
          outletname: res.data.outlet.nama,
          isModalOpen: true,
          nama: item.nama,
          username: item.username,
          id_outlet: item.id_outlet,
          role: item.role,
          id_user: item.id_user,
          action: "update"
        })
        console.log(this.state.outletname)
      })
      .catch(error => {
        console.log(error)
      })

  }



  // handleEditPw = (item) => {
  //     this.setState({
  //         isModalPw: true,
  //         id_user: item.id_user,
  //         password_user: item.password_user
  //     })
  // }

  handleAdd = () => {
    this.setState({
      isModalOpen: true,
      nama: "",
      username: "",
      id_outlet: "",
      role: "",
      password: "",
      action: "insert"
    })
  }

  // handleSavePw = (e) => {
  //     e.preventDefault()
  //     let data = {
  //       password_user: this.state.password_user
  //     }
  //     if (window.confirm("Are you sure to change password?")) {
  //       let url = "http://localhost:8000/user/update/" + this.state.id_user
  //       axios.put(url, data)
  //         .then(res => {
  //           window.location = '/user'
  //         })
  //         .catch(err => {
  //           console.log(err)
  //         })
  //     }
  //   }
  handleSave = e => {
    e.preventDefault()
    let form = {
      id_admin: this.state.id_admin,
      nama: this.state.nama,
      username: this.state.username,
      password: this.state.password,
      id_outlet: this.state.id_outlet,
      role: this.state.role
    }
    let url = ""
    if (this.state.action === "insert") {
      url = "http://localhost:8080/user/"
      axios.post(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getUser()
          this.handleColse()
        })
        .catch(error => console.log(error))
    } else if (this.state.action === "update") {
      url = "http://localhost:8080/user/" + this.state.id_user
      axios.put(url, form, this.headerConfig())
        .then(response => {
          // window.alert(response.data.message)
          this.getUser()
          this.handleColse()
        })
        .catch(error => console.log(error))
    }
    this.setState({
      isModalOpen: false
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

  Drop = (id) => {
    let url = "http://localhost:8080/user/" + id
    if (window.confirm("Are you sure to delete this data?")) {
      axios.delete(url)
        .then(res => {
          console.log(res.data.message)
          this.getUser()
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  componentDidMount() {
    this.getUser()
    this.getOutlet()
  }



  render() {
    return (
      <div>
        <Navbar />
        <div className="container"> <br></br>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="display-6">User Data</span>
                </h4><br></br>
          <div className="row">
            {/* <div className="col-6 md-5">
                <input type="text" name="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findUser} class="form-control form-input" placeholder="Find User"/>
            </div> */}
            <div className="col-2 md-5">
              <button className="btn btn-primary form-control form-input" id="btn-blue" onClick={() => this.handleAdd()}><MdAdd />Add New User</button>
            </div>
          </div>

          <br></br> <br></br>


          <table className="table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Outlet</th>
                <th>Role</th>

              </tr>
            </thead>
            <tbody>
              {this.state.user.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id_user}</td>
                    <td>{item.nama}</td>
                    <td>{item.username}</td>
                    <td>{item.outlet.nama}</td>
                    <td>{item.role}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary m-1" onClick={() => this.handleEdit(item)}><MdEdit /></button>
                      <button className="btn btn-sm btn-danger m-1" id="blue" onClick={() => this.Drop(item.id_user)}><MdDeleteOutline /></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <br></br>



        </div>

        <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>User</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" name="nama" placeholder="Input name"
                  value={this.state.nama} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="address">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Input username"
                  value={this.state.username} onChange={this.handleChange} />
              </Form.Group>

              {this.state.action === "insert" &&
                <Form.Group className="mb-2" controlId="address">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Input password"
                    value={this.state.password} onChange={this.handleChange} />
                </Form.Group>
              }
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Role</Form.Label>
                <Form.Select type="text" name="role" onChange={this.handleChange} >
                  <option value={this.state.role}>{this.state.role}</option>
                  <option value="admin">Admin</option>
                  <option value="kasir">Kasir</option>
                  <option value="owner">Owner</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Outlet</Form.Label>
                <Form.Select type="text" name="id_outlet" onChange={this.handleChange}>
                  {this.state.action === "update" &&
                    <option value={this.state.id_outlet}>{this.state.outletname}</option>
                  }
                  {this.state.action === "insert" &&
                    <option value=""></option>
                  }
                  {this.state.outlet.map((item, index) => {
                    return (
                      <option value={item.id_outlet}>{item.nama}</option>
                    )
                  })}
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

export default User;