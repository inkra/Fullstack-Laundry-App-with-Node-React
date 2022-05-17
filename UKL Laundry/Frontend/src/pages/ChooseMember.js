import React from 'react';
import Navbar from '../components/Navbar'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { MdAdd, MdEdit, MdDeleteOutline } from 'react-icons/md';

class ChooseMember extends React.Component {
  constructor() {
    super();
    this.state = {
      member: [],
      isModalOpen: false,
      token: "",
      id_member: 0,
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      tlp: "",
      search: "",
      isModalPw: false,
      action: ""

    }
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('role') === "admin" || localStorage.getItem('role') === "kasir") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.id_member = localStorage.getItem('id_member')
      } else {
        window.alert("You are not an admin")
        window.location = '/login'
      }
    } else {
      window.location = "/login"
    }
  }

  handleChoose = (item) => {
    let confirmAction = window.confirm("Choose " + item.nama + " ?")
      if (confirmAction) {
        alert("successfully executed member");
        localStorage.setItem("id_member", item.id_member);
        localStorage.setItem("nama_member", item.nama);
        localStorage.setItem("alamat_member", item.alamat);
        localStorage.setItem("jenis_kelamin", item.jenis_kelamin);
        localStorage.setItem("tlp_member", item.tlp);
        if (localStorage.getItem('role') === "admin"){
          window.location = '/paket'
        } if (localStorage.getItem('role') === "kasir"){
          window.location = '/choosepaket'
        } 
        
      } else {
        alert("Canceled to choose member");
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

  getMember = () => {
    let url = 'http://localhost:8080/member/'
    axios.get(url, this.headerConfig())
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

//   searching = event => {
//     if(event.keyCode === 13){
//     // 13 adalah kode untuk tombol enter
//     let keyword = this.state.keyword.toLowerCase()
//     let tempMember = this.state.member
//     let result = tempMember.filter(item => {
//     return item.tlp.toLowerCase().includes(keyword) ||
//     item.nama.toLowerCase().includes(keyword) ||
//     item.alamat.toLowerCase().includes(keyword)
//     })
//     this.setState({member: result})
//     }
// }

// findMember = (event) => {
// let url = "http://localhost:8080/member/";
// if (event.keyCode === 13) {
// // menampung data keyword pencarian
//     let form = {
//     find: this.state.search
// }
// // mengakses api untuk mengambil data pegawai
// // berdasarkan keyword
// axios.post(url, form)
//     .then(response => {
// // mengisikan data dari respon API ke array pegawai
// this.setState({member: response.data.member});
// })
// .catch(error => {
// console.log(error);
// });
// }
// }


  componentDidMount() {
    this.getMember()
  }



  render() {
    return (
      <div>
        <Navbar />
        <div className="container"> <br></br>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="display-6">Choose Member</span>
                </h4><br></br>
          <div className="row">
            <div className="col-6 md-5">
                <input type="text" name="search" value={this.state.search} onChange={this.handleChange} onKeyUp={this.findMember} class="form-control form-input" placeholder="Find Member"/>
            </div>
          </div>

          <br></br> <br></br>


          <table className="table">
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Gender</th>
                <th>No Telp</th>

              </tr>
            </thead>
            <tbody>
              {this.state.member.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id_member}</td>
                    <td>{item.nama}</td>
                    <td>{item.alamat}</td>
                    <td>{item.jenis_kelamin}</td>
                    <td>{item.tlp}</td>
                    <td>
                      <button className="btn btn-sm btn-primary m-1" onClick={() => this.handleChoose(item)}>Choose</button>
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
            <Modal.Title>Member</Modal.Title>
          </Modal.Header>
          <Form onSubmit={e => this.handleSave(e)}>
            <Modal.Body>
              <Form.Group className="mb-2" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="nama" placeholder="Input name"
                  value={this.state.nama} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="alamat" placeholder="Input address"
                  value={this.state.alamat} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2" controlId="gender">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select type="text" name="jenis_kelamin" onChange={this.handleChange} >
                  <option value={this.state.jenis_kelamin}>{this.state.jenis_kelamin}</option>
                  <option value="L">Laki-Laki</option>
                  <option value="P">Perempuan</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2" controlId="tlp">
                <Form.Label>No Telp</Form.Label>
                <Form.Control type="text" name="tlp" placeholder="Input telp"
                  value={this.state.tlp} onChange={this.handleChange} />
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

export default ChooseMember;