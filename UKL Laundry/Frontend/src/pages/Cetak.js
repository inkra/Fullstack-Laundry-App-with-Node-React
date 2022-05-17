import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { AiFillPrinter } from 'react-icons/ai';
import { Badge} from 'react-bootstrap';


class Cetak extends Component {
  constructor() {
    super();
    this.state = {
      transaksi: [],
            isModalOpen: false,
            token: "",
            id_outlet: 0,
            search: "",
            userName: "",
            isModalPw: false,
            action: "",
            outletName: "",
            id_transaksi: 0,
            member: [],
            outlet: [],
            detail_transaksi: [],
            user: []
    }
    if (localStorage.getItem('token')) {
      // if (localStorage.getItem('role') === "admin") {
        this.state.role = localStorage.getItem('role')
        this.state.token = localStorage.getItem('token')
        this.state.userName = localStorage.getItem('name')
        this.state.outletname = localStorage.getItem('outlet')
        this.state.id_transaksi = localStorage.getItem('id_transaksi')
        this.state.id_outlet = localStorage.getItem('id_outlet')
      // } else {
      //   window.alert("You are not an admin")
      //   window.location = '/login'
      // }
    } 
    // else {
    //   window.location = "/login"
    // }
  }

  getTransaksi = () => {
    let url = `http://localhost:8080/transaksi/byTransaksi/` + this.state.id_transaksi + '/' + this.state.id_outlet
    axios.get(url)
        .then(res => {
            this.setState({
                transaksi: res.data.transaksi,
                member: res.data.transaksi.member,
                outlet: res.data.transaksi.outlet,
                user: res.data.transaksi.user,
                detail_transaksi: res.data.transaksi.detail_transaksi
            })
            console.log(this.state.outlet)
            console.log(this.state.detail_transaksi)
        })
        .catch(error => {
            console.log(error)
        })
}

convertTime = (time) => {
    let date = new Date(time)
    return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
}

componentDidMount() {
    this.getTransaksi()
}



  render() {
    window.print();
    return (
      <div>
        <div className="container"> <br></br>
        <img className='header-print' src="https://media.istockphoto.com/vectors/washing-and-drying-clothes-design-laundry-room-with-a-washing-machine-vector-id1286932939?b=1&k=20&m=1286932939&s=612x612&w=0&h=1NIDln8v0fuAiJkbeV0icCXQc_LKWrSv1rLNDjW1UAI=" width={150}></img>
        <div className='header-cetak'>
        <h2 class="align-center">REPORT TRANSACTION LAUNDRY</h2>
            <p>{this.state.outlet.nama} <br></br> Email: simpliclean@gmail.com</p>
        </div><br></br>
        <div style={{ borderTop: "3px solid #000 ", marginLeft: 0, marginRight: 0 }}></div>
        <div style={{ borderTop: "2px solid #000 ", marginLeft: 0, marginRight: 0 }}></div>

                <br></br><br></br>
          <div className="row">
            <div>
            
            
            <table className='table'>
   
										<tbody>	
										<tr>
											<td>Invoice Code</td>
											<td>{this.state.transaksi.kode_invoice}</td>
										</tr>
                    <tr>
                      <td>Outlet Name</td>
											<td>{this.state.outlet.nama}</td>
										</tr>
										<tr>
                      <td>Member Name</td>
											<td>{this.state.member.nama}</td>
										</tr>
										<tr>
                      <td>Address Member</td>
											<td>{this.state.member.alamat}</td>
										</tr>
										<tr>
                      <td>Gender</td>
											<td>{this.state.member.jenis_kelamin}</td>
										</tr>
										<tr>
                      <td>No Telp.</td>
											<td>{this.state.member.tlp}</td>
										</tr>
                    <tr>
                      <td>Order Date</td>
											<td>{this.convertTime(this.state.transaksi.tgl)}</td>
										</tr>
										<tr>
                      <td>Order Status</td>
											<td>{this.state.transaksi.status}</td>
										</tr>
                    <tr>
                      <td>Payment Date</td>
											<td>{this.convertTime(this.state.transaksi.tgl_bayar)}</td>
										</tr>
										<tr>
                      <td>Payment Status</td>
											<td>{this.state.transaksi.dibayar}</td>
										</tr>
                    <tr>
                      <td>Deadline</td>
											<td>{this.convertTime(this.state.transaksi.batas_waktu)}</td>
										</tr>
                    <tr>
                      <td>User Name</td>
											<td>{this.state.user.nama} ({this.state.user.role})</td>
										</tr>
		 							</tbody>
									</table>

                                    <br></br><br></br>

                                    <h4>Order Data :</h4><br></br>
                                    <table className="table table-bordered text-black">
                        <thead>
                            <tr>
                                <th>Package</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.detail_transaksi.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.paket.nama_paket}</td>
                                    <td>Rp {item.paket.harga}</td>
                                    <td>{item.qty}</td>
                                    <td className="text-right">Rp { item.paket.harga * item.qty } </td>

                                </tr>
                            ))}
                            <tr>
                                <td colSpan="3">Discount 5%</td>
                                <td className="text-right" colSpan={2}>Rp {this.state.transaksi.diskon}</td>
                            </tr>
                            <tr>
                                <td colSpan="3">Pajak 10%</td>
                                <td className="text-right" colSpan={2}>Rp {this.state.transaksi.pajak}</td>
                            </tr>
                            
                            <tr>
                                <td colSpan="3">Biaya Tambahan</td>
                                <td className="text-right" colSpan={2}>Rp {this.state.transaksi.biaya_tambahan}</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="align-self-end">Initial Total</td>
                                <td className="text-right" colSpan={2}>Rp {this.state.transaksi.total}</td>
                            </tr>

                        </tbody>
                    </table>

                    <br></br><br></br>
                    <h4>Keterangan :</h4>
                                                <ol>
                                                    <li>Pekerjaan dilakukan sesuai jam kerja yaitu hari Senin – Sabtu dari pukul 07:00 – 19:00.  Diluar jam tersebut, maka pekerjaan tidak dilakukan. Hari minggu tidak dihitung sebagai hari layanan.</li>
                                                    <li>Jumlah berat yang ditimbang dan dijadikan nota adalah jumlah berat yang diterima pada saat diterima baik basah maupun kering</li>
                                                    <li>Bukti tagihan yang sah di dalam transaksi kami adalah melalui nota digital atau nota fisik</li>
                                                    <li>Kami tidak bertanggung jawab apabila terjadi kehilangan / kerusakan pada laundry bersih yang tidak diambil selama 1 bulan di workshop kami.</li>
                                                    <li>Kami menggunakan bahan detergent dan parfum dengan standar laundry tanpa mengetahui jenis alergi yang anda miliki. Segala jenis penggunaan sabun atau parfum milik pribadi tidak diperkenankan untuk digunakan di laundry kami dan apabila terjadi reaksi alergi pada kulit bukan menjadi tanggung jawab FamilyLaundry</li>
                                                    <li>Pengaduan harap disampaikan secara tertulis di ke email simplyclean@gmail.com dengan melampirkan nomor nota, video unboxing serta keluhan yang dialami.</li>
                                                </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cetak;