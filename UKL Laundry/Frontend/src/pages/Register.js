import React from 'react';
import '../index.css';

export default function Register() {
  return (
    <div className='container col-md-15 col-lg-5 order-md-last'>
      <br></br><br></br>
      <form>
        <div class="mb-3">
          <label for="exampleInputName1" class="form-label">Name</label>
          <input type="text" class="form-control" id="exampleInputName1"/>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Username</label>
          <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1"/>
        </div>
        <div class="mb-3">
          <label for="exampleInputOutlet1" class="form-label">ID Outlet</label>
          <input type="text" class="form-control" id="exampleInputOutlet1"/>
        </div>
        <div class="mb-3">
          <label for="exampleInputRole1" class="form-label">Role</label>
          <input type="text" class="form-control" id="exampleInputRole1"/>
        </div>
        <button type="submit" className="btn btn-primary btn-lg w-100">Register</button>
      </form>
    </div>
  )
}
