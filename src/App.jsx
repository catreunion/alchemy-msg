import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
// import { helloWorldContract, connectWallet, updateMessage, loadCurrentMessage, getCurrentWalletConnected } from "./utilities"
import alchemylogo from "./alchemylogo.svg"
import abi from "./AlchemyMsg.json"
import "./App.css"

const App = () => {
  const [hasMetamask, setHasMetamask] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddr, setWalletAddr] = useState("")
  const contractAddress = "0x893879E882763f781eB948FDB4561D02908D28aa"
  const contractABI = abi.abi
  // const [signer, setSigner] = useState(undefined)
  // const [status, setStatus] = useState("")
  const [msg, setMsg] = useState("( Please connect MetaMask )")
  const [newMsg, setNewMsg] = useState("")

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true)
    }
  }, [])

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setWalletAddr(accounts[0])
        setIsConnected(true)
      } catch (e) {
        console.log("cannot connect MetaMask")
      }
    } else {
      setIsConnected(false)
    }
  }

  const getMessage = async () => {
    // const { ethereum } = window
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer)

      try {
        // console.log("fetching message...")
        // const test = await contractInstance.getMsg()
        setMsg(await contractInstance.getMsg())
        // console.log("message fetched:", test)
        // setMsg(test)
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("Please install MetaMask")
    }
  }

  const updateMessage = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer)

      try {
        await contractInstance.updateMsg(newMsg)
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
          {hasMetamask ? isConnected ? "Connected " + String(walletAddr).substring(0, 6) + "..." + String(walletAddr).substring(38) : <span>Connect MetaMask</span> : "Please install MetaMask"}
        </button>

        <h2 style={{ paddingTop: "50px" }}>Current Message :</h2>
        <p>{msg}</p>

        <h2 style={{ paddingTop: "18px" }}>New Message :</h2>
        <div>
          <input type="text" placeholder="leave your message" onChange={(e) => setNewMsg(e.target.value)} value={newMsg} />
          {/* <p id="status">{status}</p> */}
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

// ❯ yarn hardhat run scripts/Alchemy/AlchemyMsg.js --network goerli
// contract address: 0x893879E882763f781eB948FDB4561D02908D28aa
