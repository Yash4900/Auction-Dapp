import React, { Component } from 'react'
import back from '../images/back.svg';
import { Link } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import Loading from './Loading';

export class ItemDetails extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
      description: '',
      baseprice: '',
      incBy: '',
      deadline: '',
      showModal: false,
      imagePtr: 0,
      images: ["https://rukminim1.flixcart.com/image/416/416/ku4ezrk0/painting/3/m/i/30-5-ms-6mm-5p-1730-16227-masstone-original-imag7bnqhsu65cps.jpeg?q=70", "https://rukminim1.flixcart.com/image/416/416/ku4ezrk0/painting/b/g/j/30-5-ms-6mm-5p-1730-16227-masstone-original-imag7bnqspbbq8cx.jpeg?q=70", "https://rukminim1.flixcart.com/image/416/416/ku4ezrk0/painting/g/l/l/30-5-ms-6mm-5p-1730-16227-masstone-original-imag7bnqqfdaqpqj.jpeg?q=70"]
    }
  }

  componentDidMount() {
    this.fetchItemData();
  }

  changePreviewImage(index) {
    this.setState({ imagePtr: index });
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    if (this.state.loading) return <Loading />
    return (
      <>
        <div id="back" className="bg-light py-3">
          <Link id="back-link" to="/">
            <img src={back} alt="back" height="15vh" /> Back
          </Link>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div id="item-images" className="m-3">
              <div className="row">
                <div className="col-md-2" id="left-images">
                  {
                    this.state.images.map((image, index) => {
                      return (
                        <img onClick={() => this.changePreviewImage(index)} className="left-img m-1 p-1 rounded" key={index} id={this.state.imagePtr === index ? "selected" : "unselected"} src={image} alt="left" />
                      )
                    })
                  }
                </div>
                <div className="col-md-10 border p-1">
                  <img src={this.state.images[this.state.imagePtr]} alt="main" width="100%" />
                </div>
              </div>
              <p className="center m-2 text-muted f12 w500">Preview</p>
            </div>
          </div>
          <div className="col-md-6">
            <p className="w500" id="item-name">
              Wall Painting Set
            </p>
            <br />
            <div className="row">
              <div className="col">
                <b className="text-muted">Highest Bid</b>
                <p id="price" className="w500">₹ 1,50,00</p>
              </div>
              <div className="col">
                <b className="text-muted">Next Bid</b>
                <p id="price" className="w500">₹ 1,70,00</p>
              </div>
            </div>
            <div className="custom-control custom-switch">
              <input type="checkbox" className="custom-control-input" id="customSwitch1" /> &nbsp;
              <label className="custom-control-label f14" for="customSwitch1">Display price in ETH</label>
            </div>
            <br />
            <button id="place-bid-btn" className="rounded py-2 px-5" onClick={this.toggleModal}>Place a bid</button>
          </div>
        </div>
        { this.state.showModal && <ConfirmationModal title='Alert!' body='Are you sure you want to place the bid?' toggleModal={this.toggleModal} /> }
      </>
    )
  }
}

export default ItemDetails