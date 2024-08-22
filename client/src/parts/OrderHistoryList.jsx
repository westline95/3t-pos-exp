import React, {useState} from "react";
import { Table , Form, Card, Dropdown, DropdownButton } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Button from "../elements/Button";
import OrderCard from "./OrderCard";
import InvoiceModal from "./InvoiceModal";
import { CustomSelect } from "../elements/CustomSelect";
import FemaleAvatar from "../assets/images/Avatar 1.jpg";

export default function OrderHistoryList (props) {
    const [ isClose, setClose ] = useState(false);
    const [ isModal, showModal ] = useState("");

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

    const handleModal = (e) => {
        switch(e.currentTarget.getAttribute("aria-label")){
            case "invoiceModal":
                showModal("invoiceModal");
                break;
        }
    }

    const handleCloseModal = () => {
        showModal(false);
    }

    return(
        <>
        <Sidebar show={isClose} />
        <main className={`pos-content ${isClose ? "active" : ""}`}>
            <Header onClick={() => isClose ? setClose(false) : setClose(true)} cart={false} />
            <section>
                <div className="lists-content">
                    <Card className="card-table add-on-shadow" style={{marginTop: "2.5rem"}}>
                        <div className="wrapping-table-btn">
                            <span className="selected-row-stat">
                                <p className="total-row-selected"></p>
                                <Button type="button" isDanger={true} className="btn-w-icon"  >
                                    <box-icon name='trash' size="18px" color="#FFFFFF" style={{verticalAlign: "top", marginRight: ".3rem"}}  ></box-icon>
                                    Delete selected row
                                </Button>
                            </span>
                            <Button type="button" isLighter={true} isLight={true}>
                                <box-icon name='filter-alt' color="#344050" size="18px"></box-icon>
                            </Button>
                            <Button type="button" isLighter={true} isLight={true}>
                                <box-icon name='printer' color="#344050" size="18px" ></box-icon>
                            </Button>
                            <div className="btn-group">
                                <Dropdown>
                                    <Dropdown.Toggle variant="primary">
                                        <box-icon name='download' size="18px" color="#FFFFFF" ></box-icon> export
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="">PDF (.pdf)</Dropdown.Item>
                                        <Dropdown.Item href="">Microsodt Excel</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>

                        <p className="card-title">search</p>
                        <div className="filter-area">
                            <div className="table-search">
                                <div className="input-group-right">
                                    <span className="input-group-icon input-icon-right">
                                        <box-icon name='search' size="16px" color="#8f9399"></box-icon>
                                    </span>
                                    <Form.Control type="text" className="input-w-icon" placeholder="Search..."></Form.Control>
                                </div>
                            </div>
                            <CustomSelect options={["Status", "Paid", "Due"]} />
                        </div>
                        <div className="mobile-list-wrap">
                            <div className="mobile-list adv-lists mh-116">
                                <div className="list-item" aria-label="invoiceModal" onClick={(e) => handleModal(e)}>
                                    <div className="modal-area">
                                        <div className="item-detail">
                                            <div className="list-img-adv">
                                                <img src={FemaleAvatar} alt="" />
                                            </div>
                                            <div className="list-content">
                                                <h4 className="list-title">Kiya</h4>
                                                <p className="list-sub-title">SL0001</p>
                                            </div>
                                        </div>
                                        <div className="item-detail-bottom">
                                            <div className="item-detail-wrap">
                                                <p className="detail-sales">Total:</p>
                                                <p className="detail-value">
                                                    <span className="currency">Rp </span>
                                                    896,000
                                                </p>
                                            </div>
                                            <div className="item-detail-wrap">
                                                <p className="detail-sales">Paid:</p>
                                                <p className="detail-value">
                                                    <span className="currency">Rp </span>
                                                    0
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-badge primary">
                                        <p className="badge-text">Paid</p>
                                    </div>
                                    <Dropdown className="more-opt" drop="end">
                                        <Dropdown.Toggle as={CustomToggle}>
                                            <box-icon name='dots-horizontal-rounded' size="18px" color="#344050" ></box-icon>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        <li>
                                                <button className="dropdown-item" type="button" data-bs-toggle="modal"
                                                    data-bs-target="#editInvoice">
                                                    <box-icon name='edit' type='solid' size="16px" style={{marginRight: ".5rem"}} ></box-icon> 
                                                        Edit
                                                </button>
                                            </li>
                                            <li>
                                                <button className="dropdown-item" type="button" data-bs-toggle="modal"
                                                    data-bs-target="#dangerModal">
                                                    <box-icon name='trash' size="16px" style={{marginRight: ".5rem"}}></box-icon>
                                                        Delete
                                                </button>
                                            </li>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div> 
                                <div className="list-item mt-3">
                                    <div className="modal-area">
                                        <div className="item-detail">
                                            <div className="list-img-adv">
                                                <img src={FemaleAvatar} alt="" />
                                            </div>
                                            <div className="list-content">
                                                <h4 className="list-title">Kiya</h4>
                                                <p className="list-sub-title">SL0001</p>
                                            </div>
                                        </div>
                                        <div className="item-detail-bottom">
                                            <div className="item-detail-wrap">
                                                <p className="detail-sales">Total:</p>
                                                <p className="detail-value">
                                                    <span className="currency">Rp </span>
                                                    896,000
                                                </p>
                                            </div>
                                            <div className="item-detail-wrap">
                                                <p className="detail-sales">Paid:</p>
                                                <p className="detail-value">
                                                    <span className="currency">Rp </span>
                                                    0
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-badge primary">
                                        <p className="badge-text">Paid</p>
                                    </div>
                                    <Dropdown className="more-opt" drop="end">
                                        <Dropdown.Toggle as={CustomToggle}>
                                            <box-icon name='dots-horizontal-rounded' size="18px" color="#344050" ></box-icon>
                                        </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                    <li>
                                            <button className="dropdown-item" type="button" data-bs-toggle="modal"
                                                data-bs-target="#editInvoice">
                                                <box-icon name='edit' type='solid' size="16px" style={{marginRight: ".5rem"}} ></box-icon> 
                                                    Edit
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" type="button" data-bs-toggle="modal"
                                                data-bs-target="#dangerModal">
                                                <box-icon name='trash' size="16px" style={{marginRight: ".5rem"}}></box-icon>
                                                    Delete
                                            </button>
                                        </li>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                </div> <div className="list-item mt-3">
                                    <div className="modal-area">
                                        <div className="item-detail">
                                            <div className="list-img-adv">
                                                <img src={FemaleAvatar} alt="" />
                                            </div>
                                            <div className="list-content">
                                                <h4 className="list-title">Kiya</h4>
                                                <p className="list-sub-title">SL0001</p>
                                            </div>
                                        </div>
                                        <div className="item-detail-bottom">
                                            <div className="item-detail-wrap">
                                                <p className="detail-sales">Total:</p>
                                                <p className="detail-value">
                                                    <span className="currency">Rp </span>
                                                    896,000
                                                </p>
                                            </div>
                                            <div className="item-detail-wrap">
                                                <p className="detail-sales">Paid:</p>
                                                <p className="detail-value">
                                                    <span className="currency">Rp </span>
                                                    0
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-badge primary">
                                        <p className="badge-text">Paid</p>
                                    </div>
                                    <Dropdown className="more-opt" drop="end">
                                        <Dropdown.Toggle as={CustomToggle}>
                                            <box-icon name='dots-horizontal-rounded' size="18px" color="#344050" ></box-icon>
                                        </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                    <li>
                                            <button className="dropdown-item" type="button" data-bs-toggle="modal"
                                                data-bs-target="#editInvoice">
                                                <box-icon name='edit' type='solid' size="16px" style={{marginRight: ".5rem"}} ></box-icon> 
                                                    Edit
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" type="button" data-bs-toggle="modal"
                                                data-bs-target="#dangerModal">
                                                <box-icon name='trash' size="16px" style={{marginRight: ".5rem"}}></box-icon>
                                                    Delete
                                            </button>
                                        </li>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                </div> <div className="list-item mt-3">
                                    <div className="modal-area">
                                        <div className="item-detail">
                                            <div className="list-img-adv">
                                                <img src={FemaleAvatar} alt="" />
                                            </div>
                                            <div className="list-content">
                                                <h4 className="list-title">Kiya</h4>
                                                <p className="list-sub-title">SL0001</p>
                                            </div>
                                        </div>
                                        <div className="item-detail-bottom">
                                            <div className="item-detail-wrap">
                                                <p className="detail-sales">Total:</p>
                                                <p className="detail-value">
                                                    <span className="currency">Rp </span>
                                                    896,000
                                                </p>
                                            </div>
                                            <div className="item-detail-wrap">
                                                <p className="detail-sales">Paid:</p>
                                                <p className="detail-value">
                                                    <span className="currency">Rp </span>
                                                    0
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-badge primary">
                                        <p className="badge-text">Paid</p>
                                    </div>
                                    <Dropdown className="more-opt" drop="end">
                                        <Dropdown.Toggle as={CustomToggle}>
                                            <box-icon name='dots-horizontal-rounded' size="18px" color="#344050" ></box-icon>
                                        </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                    <li>
                                            <button className="dropdown-item" type="button" data-bs-toggle="modal"
                                                data-bs-target="#editInvoice">
                                                <box-icon name='edit' type='solid' size="16px" style={{marginRight: ".5rem"}} ></box-icon> 
                                                    Edit
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" type="button" data-bs-toggle="modal"
                                                data-bs-target="#dangerModal">
                                                <box-icon name='trash' size="16px" style={{marginRight: ".5rem"}}></box-icon>
                                                    Delete
                                            </button>
                                        </li>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <OrderCard />
                <InvoiceModal show={isModal === "invoiceModal" ? true:false } onHide={handleCloseModal} />
            </section>
        </main>
        </>
        
    )
}