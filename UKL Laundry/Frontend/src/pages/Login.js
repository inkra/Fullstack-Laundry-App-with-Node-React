import React, { Component } from 'react'
import axios from 'axios'
import './login.css'

export default class SignIn extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      isModalOpen: false,
      user: [],
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault()
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    let url = "http://localhost:8080/user/auth"
    axios.post(url, data)
      .then(res => {
        if (res.data.logged === true) {
          let name = res.data.data.nama
          let user = res.data.data
          let token = res.data.token
          let id_user = res.data.data.id_user
          let id_outlet = res.data.data.id_outlet
          let role = res.data.data.role
          let url1 = "http://localhost:8000/transaksi/myclass/" + id_user
          localStorage.setItem("name", name)
          localStorage.setItem("id_user", id_user)
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("token", token)
          localStorage.setItem("role", role)
          localStorage.setItem("id_outlet", id_outlet)
          axios.get(url1)
            .then(res => {
              this.setState({
                class: res.data.data
              })
              localStorage.setItem("class", JSON.stringify(this.state.class))
            })
            .catch(error => {
              console.log(error)
            })
          // if(role == "admin"){
            window.location = "/"
          // }
        }
        else {
          window.alert(res.data.message)
        }
      })
  }
  
  render() {
    return (
      <div className='login'>
        <div className='col-md-15 col-lg-6 order-md-last'><br></br>
        <form className='form' onSubmit={(e) => this.handleLogin(e)}>
        <img src="https://media.istockphoto.com/vectors/washing-and-drying-clothes-design-laundry-room-with-a-washing-machine-vector-id1286932939?b=1&k=20&m=1286932939&s=612x612&w=0&h=1NIDln8v0fuAiJkbeV0icCXQc_LKWrSv1rLNDjW1UAI=" width={150}></img><br></br><br></br><br></br>
          <h1 className='display-6'>Login</h1><br></br>
          <div class="mb-3">
            <label for="exampleInputText1" class="form-label">Username</label>
            <input type="text" className='form-control' value={this.state.username} onChange={this.handleChange} name="username"/>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" className='form-control' value={this.state.password} onChange={this.handleChange} name="password"/>
          </div>
          <input type="submit" className='btn btn-primary w-100' value="Login"/>
        </form>
      </div>
      
      </div>
    )
  }
}