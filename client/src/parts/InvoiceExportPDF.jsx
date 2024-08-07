import React from 'react';
import Brand from "../assets/images/Brand.png";
import { Card, Modal, Table, Dropdown } from 'react-bootstrap';

import Button from '../elements/Button';



export default function TestInv(props){
    return (
        <div>
            <div className="invoice-header">
                <div className="invoice-detail">
                    <h3 className="invoice-title">invoice: #INV0001</h3>
                    <div className="invoice-info-group">
                        <p className="label-text">nomor invoice</p>
                        <p className="invoice-text">#INV0001</p>
                    </div>
                    <div className="invoice-info-group">
                        <p className="label-text">tanggal</p>
                        <p className="invoice-text">16/05/2024</p>
                    </div>
                </div>
                <div className="company-detail">
                    <div className="company-img">
                        <img src={Brand} alt="company-logo" />
                    </div>
                    <div className="company-profile">
                        <p className="label-text">tahu tempe tauge</p>
                        <p className="label-text">+6281234567890</p>
                        <p className="label-text">pangururan, samosir</p>
                    </div>
                </div>
            </div>
            <div className="invoice-content">
                <div className="invoice-cust-info">
                    <div className="invoice-info-group">
                        <p className="label-text">nama pelanggan</p>
                        <p className="invoice-text">Kiya</p>
                    </div>
                    <div className="invoice-info-group">
                        <p className="label-text">status</p>
                        <span className="badge badge-primary light">Lunas</span>
                    </div>
                </div>
                <div className="invoice-amount">
                    <div className="card-amount">
                        <div className="invoice-info-group">
                            <p className="label-text">total transaksi</p>
                            <p className="invoice-text"><span className='currency'>Rp </span>1,456,000</p>
                        </div>
                    </div>
                    <div className="card-amount">
                        <div className="invoice-info-group">
                            <p className="label-text">total bayar</p>
                            <p className="invoice-text"><span className='currency'>Rp </span>1,456,000</p>
                        </div>
                    </div>
                        <div className="card-amount">
                        <div className="invoice-info-group">
                            <p className="label-text">sisa bon</p>
                            <p className="invoice-text"><span className='currency'>Rp </span>0</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="invoice-transaction">
                <p className="inv-table-title">detail transaksi</p>
                <div className="table-responsive">
                    <Table>
                        <thead>
                            <tr>
                                <th>tanggal</th>
                                <th>item</th>
                                <th>qty</th>
                                <th>satuan</th>
                                <th>jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowSpan="2">15/05/2024</td>
                                <td>Tahu (14 x 14)</td>
                                <td>14</td>
                                <td><span className="currency">Rp </span>50,000</td>
                                <td><span className="currency">Rp </span>700,000</td>
                            </tr>
                            <tr>
                                <td>Tempe Plastik</td>    
                                <td>70</td>    
                                <td><span className="currency">Rp </span>2,000</td>    
                                <td><span className="currency">Rp </span>140,000</td>    
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <td className="each-total-title">Total</td>
                                <td className="each-total-text"><span className="currency">Rp </span>840,000</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table>
                        <thead>
                            <tr>
                                <th>tanggal</th>
                                <th>item</th>
                                <th>qty</th>
                                <th>satuan</th>
                                <th>jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowSpan="2">14/05/2024</td>
                                <td>Tahu (14 x 14)</td>
                                <td>14</td>
                                <td><span className="currency">Rp </span>50,000</td>
                                <td><span className="currency">Rp </span>700,000</td>
                            </tr>
                            <tr>
                                <td>Tempe Plastik</td>    
                                <td>70</td>    
                                <td><span className="currency">Rp </span>2,000</td>    
                                <td><span className="currency">Rp </span>140,000</td>    
                            </tr>
                            <tr>
                                <td colSpan="3"></td>
                                <td className="each-total-title">Total</td>
                                <td className="each-total-text"><span className="currency">Rp </span>840,000</td>
                            </tr>
                            <tr className="grand-total">
                                <td colSpan="3"></td>
                                <td className="each-total-title">Total transaksi</td>
                                <td className="each-total-text"><span className="currency">Rp</span> 1.680.000</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className="invoice-payment">
                <p className="inv-table-title">detail pembayaran</p>
                <div className="table-responsive">
                    <Table>
                        <thead>
                            <tr>
                                <th colSpan="4">tanggal</th>
                                <th>jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>15/05/2024</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><span className="currency">Rp </span>840,000</td>
                            </tr>
                            <tr>
                                <td>14/05/2024</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><span className="currency">Rp </span>840,000</td>
                            </tr>
                            <tr className='grand-total'>
                                <td colSpan="3"></td>
                                <td className="each-total-title">Total bayar</td>
                                <td className="each-total-text"><span className="currency">Rp </span>1,680,000</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className="invoice-footer">
                <p className="invoice-footer-text">Thank you for your business!</p>
            </div>
        </div>
    )
}