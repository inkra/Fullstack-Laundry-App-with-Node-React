import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Beranda from './Beranda';
import Profil from './Profil';
import Outlet from './Outlet';
import Paket from './Paket';
import User from './User';
import Member from './Member';
import ChooseMember from './ChooseMember';
import Login from './Login';
import Register from './Register';
import Cart from './Cart';
import Transaksi from './Transaksi';
import Detail_transaksi from './Detail_transaksi';
import Cetak from './Cetak';
import Laporan from './Laporan';
import ChoosePaket from './ChoosePaket';

const Main = () => (
    
    <Switch>
        <Route exact path="/" component={Beranda} />
        <Route path="/profile" component={Profil} />
        <Route path="/outlet" component={Outlet} />
        <Route path="/paket" component={Paket} />
        <Route path="/user" component={User} />
        <Route path="/member" component={Member} />
        <Route path="/choosemember" component={ChooseMember} />
        <Route path="/choosepaket" component={ChoosePaket} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/cart" component={Cart} />
        <Route path="/transaksi" component={Transaksi} />
        <Route path="/laporan" component={Laporan} />
        <Route path="/detail_transaksi" component={Detail_transaksi} />
        <Route path="/cetak" component={Cetak} />
    </Switch>
    
    
)

export default Main;