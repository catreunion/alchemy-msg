// https://alchemymsg.netlify.app/
// goerli
import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import alchemylogo from "./alchemylogo.svg"
import abi from "./AlchemyMsg.json"
import "./App.css"

const App = () => {
  const [hasMetamask, setHasMetamask] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [myAddr, setMyAddr] = useState("")
  const contractAddress = "0x5E8668153F30d57036416671E5E9E23F830d51cA"
  const contractABI = abi.abi
  const [msg, setMsg] = useState("")
  const [newMsg, setNewMsg] = useState("")

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true)
    }
  }, [])

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const [account] = await window.ethereum.request({ method: "eth_requestAccounts" })
        setMyAddr(account)
        setIsConnected(true)
        getMessage()
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("Please install MetaMask")
    }
  }

  const getMessage = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contractInstance = new ethers.Contract(contractAddress, contractABI, provider)
        setMsg(await contractInstance.getMsg())
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("Please install MetaMask")
    }
  }

  const updateMessage = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer)
        const tx = await contractInstance.updateMsg(newMsg)
        await tx.wait()
        getMessage()
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("Please install MetaMask")
    }
  }

  return (
    <div className="App">
      <div id="container">
        <img id="logo" src={alchemylogo} alt=""></img>
        <button id="walletButton" onClick={connectWallet}>
          {hasMetamask ? (isConnected ? "Connected " + String(myAddr).substring(0, 6) + "..." + String(myAddr).substring(38) : "Connect MetaMask") : "Please install MetaMask"}
        </button>

        <h2 style={{ paddingTop: "50px" }}>Current Message :</h2>
        <p>{msg}</p>

        <h2 style={{ paddingTop: "18px" }}>New Message :</h2>
        <div>
          <input type="text" placeholder="leave your message" onChange={(e) => setNewMsg(e.target.value)} value={newMsg} />
        </div>

        <button id="publish" onClick={getMessage}>
          Get Message
        </button>
        <button id="publish" onClick={updateMessage}>
          Update Message
        </button>
      </div>
    </div>
  )
}

export default App
