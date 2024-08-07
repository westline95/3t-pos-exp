import React from 'react';
import { Card, Modal, Table, Dropdown } from 'react-bootstrap';
import generatePDF, { Resolution, Margin } from "react-to-pdf";
// import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import Button from '../elements/Button';
import Brand from "../assets/images/Brand.png"
import html2canvas from "html2canvas"
import TestInv from './InvoiceExportPDF';
// import InvDocBlob from './InvoiceExportPDF';

export default function InvoiceModal({show, onHide}) {
    
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
        </a>
    ));
    // console.log(InvDocBlob)
    const handleDownloadImage = async(e) => {
        const element = document.getElementById('invoiceContent');
        const elementWidth = document.getElementById('invoiceContent').offsetHeight;
        const elementHeight = document.getElementById('invoiceContent').offsetHeight;
        const canvas = await html2canvas(element, {
            width: elementWidth,
            height: elementHeight,
            // scale: ,
            scrollY: elementHeight
        });
        const data = canvas.toDataURL('./assets/image'),
        link = document.getElementById("invoiceDownload");
    
        link.href = data;
        link.download = 'downloaded-image.jpg';
    
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
      };

      const options = {
        filename: "invoice.pdf",
        method: "save",
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        resolution: Resolution.HIGH,
        page: {
          // margin is in MM, default is Margin.NONE = 0
          margin: Margin.MEDIUM,
          // default is 'A4'
          format: "A4",
          // default is 'portrait'
          orientation: "portrait",
        //   devicePixelRatio: 2
        },
        canvas: {
          // default is 'image/jpeg' for better size performance
          mimeType: "image/jpeg",
        //   qualityRatio: 2,
          
        },
        // Customize any value passed to the jsPDF instance and html2canvas
        // function. You probably will not need this and things can break,
        // so use with caution.
        overrides: {
          // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
          pdf: {
            compress: false,
            
          },
          // see https://html2canvas.hertzen.com/configuration for more options
          canvas: {
            useCORS: true,
            scale: 10
          }
        }
      };

      
      const getTargetElFunc = () => document.getElementById("tes");
      const handleConvertPdf = () => {
        const getTargetElement = document.getElementById("tes");
        getTargetElement.style.overflowY = "unset !important";
        generatePDF(getTargetElFunc, options);
        getTargetElement.style.overflowY = "auto";
    }
    // const downloadPdf = () => ;
    
    return (
        <Modal 
        size="xl" show={show} onHide={onHide} scrollable={true} id="invoiceDetailModal">
            <Modal.Header closeButton>
                <Modal.Title>Invoice detail: #INV0001</Modal.Title>
                <Dropdown className="invoice-btn-mobile">
                    <Dropdown.Toggle as={CustomToggle}>
                        <box-icon name='dots-vertical-rounded' size="18px" color="#344050" ></box-icon>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <li>

                            <button className="dropdown-item" type="button" onClick={handleConvertPdf}>
                                <box-icon name='file-pdf' type='solid' size="16px" style={{marginRight: ".5rem"}} ></box-icon> 
                                    Download PDF
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" type="button" data-bs-toggle="modal"
                                data-bs-target="#dangerModal">
                                <box-icon name='printer' size="16px" style={{marginRight: ".5rem"}}></box-icon>
                                    Download xlsx
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" type="button" data-bs-toggle="modal"
                                data-bs-target="#dangerModal">
                                <box-icon name='printer' size="16px" style={{marginRight: ".5rem"}}></box-icon>
                                   Print
                            </button>
                        </li>
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Header>
            {/* <Modal.Body id="invoiceContent">
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
            </Modal.Body> */}
            {/* <section id='tes'> */}
            <Modal.Body id='tes'>
                <TestInv />

            </Modal.Body>
                {/* </section>             */}
            <Modal.Footer>
                <Button type="button" isSecondary={true} isLight={true} onClick={onHide}>cancel</Button>
                <Button type="button" isPrimary={true}>ok</Button>
            </Modal.Footer>
        </Modal>
    )
}