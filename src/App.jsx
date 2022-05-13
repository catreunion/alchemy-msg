import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
// import { helloWorldContract, connectWallet, updateMessage, loadCurrentMessage, getCurrentWalletConnected } from "./utilities"
import alchemylogo from "./alchemylogo.svg"
import abi from "./HHSimpleStorage.json"
import "./App.css"

const App = () => {
  const contractAddress = "0xdA5B8A7db2d47F593C8217c4e9A65a35A4C17a6F"
  const contractABI = abi.abi
  const [hasMetamask, setHasMetamask] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  // const [signer, setSigner] = useState(undefined)

  const [walletAddr, setWalletAddr] = useState("")
  // const [status, setStatus] = useState("")
  // const [msg, setMsg] = useState("( Please connect MetaMask )")
  const msg = "( Please connect MetaMask )"
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

  const execute = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // setSigner(provider.getSigner())
      const signer = provider.getSigner()
      console.log(signer)
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer)
      try {
        await contractInstance.store(42)
      } catch (e) {
        console.log(e)
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

        <button id="publish" onClick={execute}>
          Update
        </button>
      </div>
    </div>
  )
}

export default App
