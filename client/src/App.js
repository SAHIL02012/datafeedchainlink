import React, { useState, useEffect } from 'react';
import './App.css';
import {Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ChainlinkAbi from './Chainlinkdata.json';
import { ChainlinkContractAddress } from './config.js';
import SendIcon from '@mui/icons-material/Send';



const { ethers, Result } = require("ethers");
 
function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [currentprice, setcurrentprice] = useState(0);
  var checkpair=0;
  var rawprice=0;
  var decimal=0;
  
  
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('Metamask not detected.');
        return;
      }
      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log('Connected to chain: ' + chainId);
      const sepoliaChainId = '0xaa36a7'; // 11155111
      if (chainId !== sepoliaChainId) {
        alert('You are not connected to the Sepolia Testnet.');
        return;
      } else {
        setCorrectNetwork(true);
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
      console.log('MetaMask Account: ' + accounts[0]);
    } catch (error) {
      console.log('Error connecting to MetaMask.', error);
    }
  }

  function setbtcusd()
  {
    checkpair=0;
  }
  function setbtceth()
  {
    checkpair=1;
  }
  function setethusd()
  {
    checkpair=2;
  }
  function setlinkusd()
  {
    checkpair=3;
  }
  const getprices = async () => {
    
    try { 
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const ChainlinkAddress = new ethers.Contract(
          ChainlinkContractAddress,
          ChainlinkAbi.abi,
          signer
        );
        console.log(checkpair)
        let price= await ChainlinkAddress.getChainLinkDataFeedLatestAnswer(checkpair)
            rawprice=Number(price[0])
            decimal=Number(price[1])
            console.log(rawprice);
            setcurrentprice(rawprice/(10**decimal))
            
                } else {
        console.log("Ethereum object does not exist.");
      }
    } catch (error) {
      console.log("Error Getting price ", error);
    }
  };

 
 
  return (
<div>
      {currentAccount === '' ? (<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
<Button
          variant="contained" color="info" style={{ justifyContent: "center", margin: "50px", fontSize: "28px", fontWeight: "bold" }}
          onClick={connectWallet}
>Connect 🦊 MetaMask Wallet ➡ Sepolia Testnet</Button></div>
      ) : correctNetwork ? (
<div className="App">
<div>
      <header className="App-header">
      <img src="chainlink.png" alt="top-center-img" className="centered-image" width="300px"/>
      
      </header>
      </div>
      <br/><br/><br/>

      <div style={{display:'flex', alignItems:'start', textAlign:'left', width:'100%'}}>
        
      <FormControl>
        
      <FormLabel id="radiobuttongroup"> Select the Pair for which you want to know the Price </FormLabel>
      <RadioGroup
        aria-labelledby="radiobuttongroup"
        defaultValue="BTCUSD"
        name="radio-buttons-group"
      >
        <FormControlLabel value="BTCUSD" control={<Radio />} label="BTC / USD" onClick={setbtcusd}/>
        <FormControlLabel value="BTCETH" control={<Radio />} label="BTC / ETH" onClick={setbtceth}/>
        <FormControlLabel value="ETHUSD" control={<Radio />} label="ETH / USD" onClick={setethusd}/>
        <FormControlLabel value="LINKUSD" control={<Radio />} label="LINK / USD" onClick={setlinkusd}/>
      </RadioGroup>
    </FormControl>
    </div>
    <br/>
    <Button variant="contained" endIcon={<SendIcon />} onClick={getprices}>
  Check Price
</Button>
<p><b>Price : {currentprice.toFixed(2)}</b></p>
</div>
      ) : (
<div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
<div>Connect to the Ethereum Sepolia Testnet and reload the page.</div>
</div>
          )
      }
</div >
  );
}
export default App;