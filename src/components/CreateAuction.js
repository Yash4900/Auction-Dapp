import React, { Component } from 'react'
import painting from '../images/girl-painting.svg';
import ConfirmationModal from './ConfirmationModal';
import web3 from 'web3';
import auctionInstance from '../contract/contractInstance.js';
import ipfs from '../ipfs.js';

export class CreateAuction extends Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      name: '',
      description: '',
      baseprice: '',
      incrementby: '',
      deadline: Date.now(),
      images: [],
      imageFiles: []
    }
  }

  handleFieldChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleImageUpload = (e) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      this.setState({ images: imageArray, imageFiles: e.target.files });
      Array.from(e.target.files).map(file => URL.revokeObjectURL(file));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ showModal: !this.state.showModal });
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  startAuction = async () => {
    let itemimages = "";
    for (var i=0; i<this.state.imageFiles.length; i++) {
      const file = this.state.imageFiles[i];
      const details = await ipfs.add(file);
      itemimages = itemimages + " " + details.path;
    }
    auctionInstance.methods.startAuction(
      this.state.name,
      this.state.description,
      itemimages,
      web3.utils.toWei(this.state.baseprice, 'ether'),
      web3.utils.toWei(this.state.incrementby, 'ether'),
      new Date(this.state.deadline).getTime() / 1000
    ).send({ from: this.props.address, gas: 900000 }).then((res) => {
      console.log(res);
    })
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="m-3">
        <div className="title">
          <h1 className="w900">Sell a product</h1>
        </div>
        <div className="row">
          <div className="col-md-6"> 
            <div id="create-form" className="p-4 border rounded-3 shadow">
              <p className="w500">Enter the product details</p>
              <div className="divider border"></div>
              <form className="f14" onSubmit={this.handleSubmit} encType="multipart/form-data">
                <div className="form-group my-3">
                  <label for="name">Item Name</label>
                  <input type="text" className="form-control form-control-sm" id="name" placeholder="Enter item name" onChange={this.handleFieldChange} />
                </div>
                <div className="form-group my-3">
                  <label for="description">Item description</label>
                  <textarea className="form-control" id="description" rows="3" onChange={this.handleFieldChange} ></textarea>
                </div>
                <div className="form-group my-3">
                  <div className="row">
                    <div className="col">
                      <label for="baseprice">Item base price</label>
                      <input type="text" className="form-control form-control-sm" id="baseprice" placeholder="Enter base amount" onChange={this.handleFieldChange} />
                    </div>
                    <div className="col">
                      <label for="incrementby">Increment bid by</label>
                      <input type="text" className="form-control form-control-sm" id="incrementby" placeholder="Enter amount" onChange={this.handleFieldChange} />
                    </div>
                  </div>
                </div>
                <div className="form-group my-3">
                  <label for="deadline">Enter deadline</label>
                  <br />
                  <input type="datetime-local" className="form-control form-control-sm" id="deadline" name="deadline" onChange={this.handleFieldChange} />
                </div>
                <div className="form-group">
                  <label for="images">Product images</label>
                  <br />
                  <input type="file" className="form-control-file" id="images" accept="image/*" multiple onChange={this.handleImageUpload} />
                </div>
                <div id="image-preview">
                  {this.state.images && this.state.images.map((image) => {
                    return (
                      <img className="m-2 rounded-1" src={image} key={image} alt="preview" width="60px" />
                    )
                  })}
                </div>
                <br />
                <br />
                <div className="form-group">
                  <input type="submit" className="btn btn-sm btn-outline-dark rounded-pill" name="submit" id="submit" value="Start Auction" />
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6 right-image">
            <img src={painting} alt="painting" width="70%" />
          </div>
        </div>
        {this.state.showModal && <ConfirmationModal title='Alert!' body='Are you sure you want to start auction for this product?' toggleModal={this.toggleModal} onYesClick={this.startAuction} />}
      </div>
    )
  }
}

export default CreateAuction