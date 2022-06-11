import React, { useState, useEffect } from "react";
import back from "../images/back.svg";
import { Link, useParams } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import AcknowledgementModal from "./AcknowledgementModal";
import Loading from "./Loading";
import auctionInstance from "../contract/contractInstance.js";
import itemInstance from "../contract/itemInstance.js";
import Timer from "./Timer";
import web3 from "web3";

function ItemDetails(props) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePtr, setImagePtr] = useState(0);
  const [showPlaceBidModal, setShowPlaceBidModal] = useState(false);
  const [showClaimAmountModal, setShowClaimAmountModal] = useState(false);
  const [showAcknowledgementModal, setShowAcknowledgementModal] =
    useState(false);
  const [acknowledgementMessage, setAcknowledgementMessage] = useState("");
  const now = Date.now();
  const { id } = useParams();

  const changePreviewImage = (index) => setImagePtr(index);

  const togglePlaceBidModal = () => setShowPlaceBidModal(!showPlaceBidModal);

  const toggleClaimAmountModal = () =>
    setShowClaimAmountModal(!showClaimAmountModal);

  const toggleAcknowledgementModal = () =>
    setShowAcknowledgementModal(!showAcknowledgementModal);

  const fetchItemDetails = () => {
    auctionInstance.methods
      .items(id)
      .call()
      .then((itemAddress) => {
        const instance = itemInstance(itemAddress);
        instance.methods
          .getItemDetails()
          .call()
          .then((itemData) => {
            var date = new Date(0);
            date.setUTCSeconds(itemData.itemDeadline);
            const images = itemData.itemImages.split(" ");
            images.shift();
            setItem({
              address: itemAddress,
              name: itemData.itemName,
              description: itemData.itemDesc,
              images: images,
              basePrice: web3.utils.fromWei(itemData.basePrice, "ether"),
              currentBid: web3.utils.fromWei(itemData.currentBid, "ether"),
              nextBid:
                itemData.currentBid === "0"
                  ? web3.utils.fromWei(itemData.basePrice, "ether")
                  : web3.utils.fromWei(
                      (
                        parseInt(itemData.currentBid) + parseInt(itemData.incBy)
                      ).toString(),
                      "ether"
                    ),
              incBy: web3.utils.fromWei(itemData.incBy, "ether"),
              highestBidder: itemData.highestBidder,
              deadline: date,
              epochTime: itemData.itemDeadline,
              owner: itemData.itemOwner,
              amountClaimed: itemData.amountClaimed,
            });
            setLoading(false);
          });
      });
  };

  const placeBid = () => {
    togglePlaceBidModal();
    setLoading(true);
    const instance = itemInstance(item.address);
    instance.methods
      .bid(web3.utils.toWei(item.nextBid, "ether"))
      .send({
        from: props.address,
        value: web3.utils.toWei(item.nextBid, "ether"),
      })
      .then((itemData) => {
        setItem(null);
        setAcknowledgementMessage("Your bid has been placed successfully!");
        setShowAcknowledgementModal(true);
      });
  };

  const disableBidButton = () => {
    if (item.owner === props.address) return true;
    if (item.highestBidder === props.address) return true;
    if (now > item.deadline.getTime()) return true;
    return false;
  };

  const getStatus = () => {
    if (now < item.deadline.getTime()) {
      return "Active";
    } else if (item.currentBid === "0") {
      return "Unsold";
    } else {
      return "Sold";
    }
  };

  const showClaimAmount = () => {
    if (
      props.address === item.owner &&
      item.amountClaimed === false &&
      getStatus() === "Sold"
    )
      return true;
    return false;
  };

  const claimAmount = () => {
    toggleClaimAmountModal();
    setLoading(true);
    auctionInstance.methods
      .items(id)
      .call()
      .then((itemAddress) => {
        const instance = itemInstance(itemAddress);
        instance.methods
          .claimAmount()
          .send({ from: props.address })
          .then((res) => {
            console.log(res);
            setLoading(false);
            setAcknowledgementMessage("Amount has been claimed successfully!");
            setShowAcknowledgementModal(true);
          });
      });
  };

  useEffect(() => {
    if (item === null) {
      fetchItemDetails();
    }
  }, [item]);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div id="back" className="py-3">
        <Link id="back-link" to="/">
          <img src={back} alt="back" height="15vh" /> Back
        </Link>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div id="item-images" className="m-3">
            <div className="row">
              <div className="col-md-2" id="left-images">
                {item.images.map((image, index) => {
                  return (
                    <img
                      onClick={() => changePreviewImage(index)}
                      className="left-img m-1 p-1 rounded"
                      key={index}
                      id={imagePtr === index ? "selected" : "unselected"}
                      src={"https://ipfs.infura.io/ipfs/" + image}
                      alt="left"
                    />
                  );
                })}
              </div>
              <div className="col-md-10 border p-1">
                <img
                  src={"https://ipfs.infura.io/ipfs/" + item.images[imagePtr]}
                  alt="main"
                  height="100%"
                />
              </div>
            </div>
            <p className="center m-2 text-muted f12 w500">Preview</p>
            <div>
              <div
                id="status"
                className={`${getStatus()} w500 center py-1 rounded`}
              >
                {getStatus()}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <p className="w500" id="item-name">
            {item.name}
          </p>
          <p>{item.description}</p>
          <br />
          <div className="col">
            <b className="text-muted">Base Price</b>
            <p id="price" className="w500">
              {item.basePrice} ETH
            </p>
          </div>
          <div className="row">
            <div className="col">
              <b className="text-muted">Highest Bid</b>
              <p id="price" className="w500">
                {item.currentBid} ETH
              </p>
            </div>
            <div className="col">
              <b className="text-muted">Next Bid</b>
              <p id="price" className="w500">
                {item.nextBid} ETH
              </p>
            </div>
          </div>
          <div className="f14 w500">
            <Timer seconds={item.epochTime - parseInt(now / 1000)}></Timer>
          </div>
          <br />
          <button
            id="place-bid-btn"
            disabled={disableBidButton()}
            className="rounded py-2 px-5"
            onClick={() => togglePlaceBidModal()}
          >
            Place a bid
          </button>
          <br />
          <br />
          {showClaimAmount() && (
            <button
              id="claim-amount-btn"
              className="rounded py-2 px-5"
              onClick={() => toggleClaimAmountModal()}
            >
              Claim Amount
            </button>
          )}
          {props.address === item.highestBidder && (
            <p className="f14"> You are the highest bidder </p>
          )}
        </div>
      </div>
      {showPlaceBidModal && (
        <ConfirmationModal
          title="Alert!"
          body={`The bid value is ${item.nextBid} ETH. Are you sure you want to place the bid?`}
          toggleModal={togglePlaceBidModal}
          onYesClick={placeBid}
        />
      )}
      {showClaimAmountModal && (
        <ConfirmationModal
          title="Alert!"
          body={`Your item has been sold at ${item.currentBid} ETH. Are you sure you want to claim this amount?`}
          toggleModal={toggleClaimAmountModal}
          onYesClick={claimAmount}
        />
      )}
      {showAcknowledgementModal && (
        <AcknowledgementModal
          title="Success!"
          body={acknowledgementMessage}
          toggleModal={toggleAcknowledgementModal}
        />
      )}
    </>
  );
}

export default ItemDetails;
