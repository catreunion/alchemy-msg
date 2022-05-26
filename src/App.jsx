// https://alchemymsg.netlify.app/
// goerli
import React, { useState, useEffect } from "react"
import { ethers } from "ethers"

import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Box, Paper, TextField, Stack } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import SearchIcon from "@mui/icons-material/Search"

import alchemylogo from "./alchemylogo.svg"
import abi from "./AlchemyMsg.json"
import "./App.css"

const theme = createTheme()

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem"
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem"
  }
}

const App = () => {
  const [hasMetamask, setHasMetamask] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [myAddr, setMyAddr] = useState("")
  const contractAddress = "0x5E8668153F30d57036416671E5E9E23F830d51cA"
  const contractABI = abi.abi
  const [msg, setMsg] = useState("")
  const [newMsg, setNewMsg] = useState("")
  const [loading, setLoading] = useState(false)

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

  const handleClick = () => {
    setLoading(true)
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
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("Please install MetaMask")
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="App">
        <div id="container">
          <img id="logo" src={alchemylogo} alt=""></img>
          <button id="walletButton" onClick={connectWallet}>
            {hasMetamask ? (isConnected ? "Connected " + String(myAddr).substring(0, 6) + "..." + String(myAddr).substring(38) : "Connect MetaMask") : "Please install MetaMask"}
          </button>

          <h2 style={{ paddingTop: "50px" }}>Current Message :</h2>
          <p>{msg}</p>

          <h2 style={{ paddingTop: "18px" }}>New Message :</h2>

          <TextField
            onChange={(e) => {
              setNewMsg(e.target.value)
            }}
            sx={{ width: 420 }}
            id="newMsg"
            label="leave your message"
          />

          <Stack direction="row" spacing={5} alignItems="center">
            <button id="publish" onClick={getMessage}>
              Get Message
            </button>

            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<SearchIcon />}
              onClick={() => {
                handleClick()
                updateMessage()
              }}
              size="large"
              variant="contained"
            >
              Update Message
            </LoadingButton>
          </Stack>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
