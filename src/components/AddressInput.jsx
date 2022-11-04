import React, { useRef, useState } from 'react';

import { Welcome, TimeLimit , Impostor, Title , LastTransaction} from './index';

const AddressInput = () => {
  // const userAddress = '0xc64de86f4672262a08a89eaf108f992784334f58';
  let userAddress;

  // const [post, setPost] = React.useState({ body: '' });
  const [kudosData, setKudosData] = useState(null);
  const [isAlchemyFam, setisAlchemyFam] = useState(null);
  const [notAlchemyFam, setnotAlchemyFam] = useState(null);
  const addressInputRef = useRef(null);
  const [isProcessingTransaction, setIsProcessingTransaction] = useState(false);
  const [transactionHash , setTransactionHash] = useState("");
  const [timeEligibility, setTimeEligibilty] = useState(true)

  const claimIntervalInSeconds = 8;

  const checkIntervalEligibilty =  async (userAddress) => {

    const result = await fetch(`http://127.0.0.1:3000/getLastClaimed/${userAddress}`)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data)
    let lastUpdatedTime = Math.floor(data/1000.0)
    let CurrentTime = Math.floor(new Date().getTime()/1000.0)
    return (CurrentTime - lastUpdatedTime) > claimIntervalInSeconds
    // console.log((CurrentTime - lastUpdatedTime) > claimIntervalInSeconds);
    

  });

  return result;

  }

  const checkIsAlchemyFam = (jsonData , userAddress) => {
    if (!jsonData.data.length > 0) return setnotAlchemyFam(true);
    // console.log('Kudos Found');

    for (const token in jsonData.data) {
      // console.log(jsonData.data[token].kudosTokenId);
      if (jsonData.data[token].kudosTokenId == 2698)

      // Send The Transaction 

      setnotAlchemyFam(false);
      setisAlchemyFam(true);
      setIsProcessingTransaction(true);
      
      // sendTransaction(userAddress);
      // checkIntervalEligibilty(userAddress);
      checkIntervalEligibilty(userAddress).then((res) => {
        if (res) {

          
          setTimeEligibilty(true)
          sendTransaction(userAddress);
          // console.log("sending Transaction");
          
          
        } else {
          setTimeEligibilty(false)
          console.log("You have to wait for 24 Hours");
        }
      });

      // console.log(intervalEligibilty);

      return setIsProcessingTransaction(false);
    }

    setnotAlchemyFam(true);
  };





  const sendTransaction = async(userAddress) => {

    // const tempAddress = "0x3d7f37d60264b9070eD6914c7223ED8d5bE38b25"

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'receiverAddress': `${userAddress}` })
    }

    
    fetch('http://127.0.0.1:3000/sendEther', requestOptions).then(response => response.json())
    .then(data =>{
      setTransactionHash(data.hash)
      console.log(data)
    } );

  }



  const handleClick = async () => {
    setisAlchemyFam(false);
    // console.log(addressInputRef.current.value);
    userAddress = addressInputRef.current.value;
    const baseURL = `https://api.mintkudos.xyz/v1/wallets/${userAddress}/tokens`;

    fetch(baseURL)
      .then((res) => res.json())
      .then((jsonData) => {
        setKudosData(() => jsonData);
        checkIsAlchemyFam(jsonData, userAddress);
      });
  };

  return (
    <div>
            <Title />

      <div
        id="claimBox"
        className=" bg-white rounded-md py-10 flex justify-center flex-wrap gap-2 "
      >
        <input
          id="walletAddress"
          ref={addressInputRef}
          className =" py-2 px-2 mx-5 border flex-1 border-slate-300 rounded  "
          type="text"
          placeholder=" Enter Your Wallet address "
        />
        <button
          id="claimEth"
          className =" py-2 px-4 mr-4 bg-blue-500 hover:bg-blue-700 text-slate-50 rounded "
          onClick={handleClick}
        >
          Gimme ETH
        </button>
      </div>


      {isAlchemyFam ? <Welcome /> : <></>}
      {notAlchemyFam ? <Impostor /> : <></>}
      {isProcessingTransaction? <h2> Processing... </h2> : <></>}
      {transactionHash? <LastTransaction hash={transactionHash} /> : <></>}
      {!timeEligibility? <TimeLimit /> : <></>}
    </div>
  );
};

export default AddressInput;
