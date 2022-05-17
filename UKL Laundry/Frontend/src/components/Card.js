import React from "react";
import { MdAdd, MdEdit, MdDeleteOutline } from 'react-icons/md';

class Card extends React.Component {
    render() {
        return (
            <div className="col-lg-6 col-sm-12 p-2" key={this.props.key}>
                <div id="card">
                    <div className="list-book card-body row" id="crd">
                        {/* menampilkan Gambar / cover */}
                        <div className="col-5 mt-3">
                            <img src={this.props.cover} width={200} className="img"
                                id="buku" />
                        </div>

                        {/* menampilkan deskripsi */}
                        <div className="col-7 mt-3" id="text">
                            <h4 className="judul fs-3">
                                {this.props.judul}
                            </h4>
                            <h6 className="fw-lighter">
                                 Type : {this.props.jenis}
                            </h6>
                            <h6 className="fw-lighter">
                                Package at {this.props.outlet} Outlet
                            </h6>
                            <h6 className="harga">
                                Rp {this.props.harga},00
                            </h6>
                            <br></br>
                            {/* button untuk mengedit */}
                            <button className="btn btn-sm btn-primary m-1" 
                                onClick={this.props.onEdit} data-toggle="modal" data-target="#modal" id="brown">
                               <MdEdit />
                            </button>

                            {/* button untuk menghapus */}
                            <button className="btn btn-sm btn-danger m-1" id="blue"
                                onClick={this.props.onDrop}><MdDeleteOutline />
                            </button>

                             {/* button untuk choose package */}
                             <button className="btn btn-sm btn-outline-secondary m-1" 
                                onClick={this.props.onChoose}>Choose
                            </button>

                            {/* <button className="btn btn-sm btn-outline-dark m-1"
                                onClick={this.props.onCart}>
                                Add to cart
                            </button> */}

                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
export default Card;