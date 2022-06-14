import React, { useState } from "react";
import painting from "../images/girl-painting.svg";
import ConfirmationModal from "./ConfirmationModal";
import AcknowledgementModal from "./AcknowledgementModal";
import Loading from "./Loading";
import web3 from "web3";
import auctionInstance from "../contract/contractInstance.js";
import ipfs from "../ipfs.js";

function CreateAuction(props) {
  const itemInitialState = {
    name: "",
    description: "",
    baseprice: "",
    incrementby: "",
    deadline: Date.now(),
    images: [],
    imageFiles: [],
  };

  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showAcknowledgementModal, setShowAcknowledgementModal] =
    useState(false);
  const [item, setItem] = useState(itemInitialState);

  const handleFieldChange = (e) => {
    setItem((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setItem((prevState) => ({
        ...prevState,
        images: imageArray,
        imageFiles: e.target.files,
      }));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true);
  };

  const toggleConfirmationModal = () => {
    setShowConfirmationModal((prevState) => !prevState);
  };

  const toggleAcknowledgementModal = () => {
    setShowAcknowledgementModal((prevState) => !prevState);
  };

  const startAuction = async () => {
    toggleConfirmationModal();
    setLoading(true);
    let itemimages = "";
    for (var i = 0; i < item.imageFiles.length; i++) {
      const file = item.imageFiles[i];
      const details = await ipfs.add(file);
      itemimages = itemimages + " " + details.path;
    }
    auctionInstance.methods
      .startAuction(
        item.name,
        item.description,
        itemimages,
        web3.utils.toWei(item.baseprice, "ether"),
        web3.utils.toWei(item.incrementby, "ether"),
        new Date(item.deadline).getTime() / 1000
      )
      .send({ from: props.address, gas: 800000 })
      .then((res) => {
        console.log(res);
        setLoading(false);
        toggleAcknowledgementModal();
        setItem(itemInitialState);
      });
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="m-3">
      <div className="title">
        <h4 className="w900">Enter the product details below!</h4>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div id="create-form">
            <form
              className="f14"
              onSubmit={(e) => handleSubmit(e)}
              encType="multipart/form-data"
            >
              <div className="form-group my-3">
                <label for="name">Item Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm bg-light"
                  id="name"
                  placeholder="Enter item name"
                  onChange={(e) => handleFieldChange(e)}
                />
              </div>
              <div className="form-group my-3">
                <label for="description">Item description</label>
                <textarea
                  className="form-control bg-light"
                  id="description"
                  rows="2"
                  onChange={(e) => handleFieldChange(e)}
                  placeholder="Enter item description"
                ></textarea>
              </div>
              <div className="form-group my-3">
                <div className="row">
                  <div className="col">
                    <label for="baseprice">Item base price</label>
                    <input
                      type="text"
                      className="form-control form-control-sm bg-light"
                      id="baseprice"
                      placeholder="Enter base amount"
                      onChange={(e) => handleFieldChange(e)}
                    />
                  </div>
                  <div className="col">
                    <label for="incrementby">Increment bid by</label>
                    <input
                      type="text"
                      className="form-control form-control-sm bg-light"
                      id="incrementby"
                      placeholder="Enter amount"
                      onChange={(e) => handleFieldChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group my-3">
                <label for="deadline">Enter deadline</label>
                <br />
                <input
                  type="datetime-local"
                  className="form-control form-control-sm bg-light"
                  id="deadline"
                  name="deadline"
                  onChange={(e) => handleFieldChange(e)}
                />
              </div>
              <div className="form-group">
                <label for="images">Product images</label>
                <br />
                <input
                  type="file"
                  className="form-control-file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e)}
                />
              </div>
              <div id="image-preview">
                {item.images &&
                  item.images.map((image) => {
                    return (
                      <img
                        className="m-2 rounded-1"
                        src={image}
                        key={image}
                        alt="preview"
                        width="60px"
                      />
                    );
                  })}
              </div>
              <br />
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-sm btn-outline-dark"
                  name="submit"
                  id="submit"
                  value="Start Auction"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 right-image">
          <img src={painting} alt="painting" width="70%" />
        </div>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          title="Alert!"
          body="Are you sure you want to start auction for this product?"
          toggleModal={toggleConfirmationModal}
          onYesClick={startAuction}
        />
      )}
      {showAcknowledgementModal && (
        <AcknowledgementModal
          title="Success!"
          body="Item has been placed for auction successfully!"
          toggleModal={toggleAcknowledgementModal}
        />
      )}
    </div>
  );
}

export default CreateAuction;
