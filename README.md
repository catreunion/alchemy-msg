- interact with a local or remote ethereum node using HTTP, IPC or WebSocket

`yarn add ethers`

- node

```js
// in console
var ethers = require("ethers")
const provider = new ethers.providers.AlchemyProvider()
await provider.getBlockNumber()
provider.network

balance = await provider.getBalance("ethers.eth")
ethers.utils.formatUnits(balance)
```

1. Interactive console - Node console
   If you would like to use Node console, run:
   mkdir playeth && cd playeth
   yarn add ethers
   Open Node console by running node.

As web3 developers write smart contracts and DAPPs, we interact with blockchain using Hardhat or Truffle console. Hardhat and Truffle Suite both provide a development environment.

`yarn hardhat console --network mainnet`

```js
ethers.version
const provider = new ethers.providers.AlchemyProvider()
await provider.getBlockNumber()
```

```ts
// playeth.ts:
async function main() {
  const ethers = require("ethers")
  const provider = new ethers.providers.AlchemyProvider()

  const blocknumber = await provider.getBlockNumber()
  console.log("blocknumber", blocknumber)

  const balance = await provider.getBalance("ethers.eth")
  console.log("balance of ethers.eth", ethers.utils.formatEther(balance))
}

main()
```

- `node playeth.ts`

STEP 1: Init Next.js project
We will using next.js framework to start a sample project.
yarn create next-app playeth --typescript
cd playeth
yarn dev
You can visit this project at: http://localhost:3000/

STEP 2: Install ethers
yarn add ethers
STEP 3: Write a page
Change index.tsx to:
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ethers } from "ethers";
import { useEffect,useState } from 'react';

declare let window: any;
const Home: NextPage = () => {
const [balance, setBalance] = useState<String | undefined>()
const [address, setAddress] = useState<String | undefined>()

useEffect(() => {
//client side code
if(!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getBalance("ethers.eth").then((result)=>{
      setBalance(ethers.utils.formatEther(result))
    })

})

function connect(){
//client side code
if(!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    window.ethereum.enable().then(()=>{
      const signer = provider.getSigner()
      signer.getAddress().then((result)=>{setAddress(result)})
    })

}

return (

<div>
<main className={styles.main}>
<h1>Sample DAPP</h1>
<h3>Eth balance: {balance}</h3>
<p><button onClick={connect} >Connect</button></p>
<h3>Address: {address}</h3>
</main>

    </div>

)
}

export default Home
Run yarn dev and in your browser go to: http://localhost:3000/

What does this page do?

This page gets Ethereum provider instance injected by MetaMask by const provider = new ethers.providers.Web3Provider(window.ethereum)

This page will get balance of ethers.eth(address: https://etherscan.io/address/0x643aa0a61eadcc9cc202d1915d942d35d005400c) and show it on the page.

When Connect button is clicked, the page call window.ethereum.enable() to ask MetaMask to enable connect. User needs to athurize connecting in Metamask popup dialog.

When connected, the page gets MetaMask address and displays it.

If this page has been connected to MetaMask, connecting will be done automatically without a popup. You can disconnect it from MetaMask and try clicking Connect button again.

Please note that the above code snippet is just to illustrate the basic flow of using ethers.js and MetaMask together.

If you would like to know more about MetaMask and its injected ethereum provider, you can refer to MetaMask docs:

MetaMask injects a global API into websites visited by its users at window.ethereum. This API allows websites to request users' Ethereum accounts, read data from blockchains the user is connected to, and suggest that the user sign messages and transactions.

Tutorial List:

1. A Concise Hardhat Tutorial(3 parts)
   https://dev.to/yakult/a-concise-hardhat-tutorial-part-1-7eo

2. Understanding Blockchain with ethers.js(5 parts)
   https://dev.to/yakult/01-understanding-blockchain-with-ethersjs-4-tasks-of-basics-and-transfer-5d17

3. Tutorial : build your first DAPP with Remix and Etherscan (7 Tasks)
   https://dev.to/yakult/tutorial-build-your-first-dapp-with-remix-and-etherscan-52kf

4. Tutorial: build DApp with Hardhat, React and ethers.js (6 Tasks)
   https://dev.to/yakult/a-tutorial-build-dapp-with-hardhat-react-and-ethersjs-1gmi

5. Tutorial: build DAPP with Web3-React and SWR
   https://dev.to/yakult/tutorial-build-dapp-with-web3-react-and-swr-1fb0

6. Tutorial: write upgradeable smart contract (proxy) using OpenZeppelin(7 Tasks)
   https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916

7. Tutorial: Build a NFT marketplace DApp like Opensea(5 Tasks)
   https://dev.to/yakult/tutorial-build-a-nft-marketplace-dapp-like-opensea-3ng9

# If you find this tutorial helpful, follow me at Twitter @fjun99

Ethers' various Classes and Functions are available to import manually from sub-packages under the @ethersproject organization but for most projects, the umbrella package is the easiest way to get started.

- `npm install --save ethers`

- node.js : `const { ethers } = require("ethers");`

- ES6 / TypeScript : `import { ethers } from "ethers";`

Provider A Provider (in ethers) is a class which provides an abstraction for a connection to the Ethereum Network. It provides read-only access to the Blockchain and its status.

Signer A Signer is a class which (usually) in some way directly or indirectly has access to a private key, which can sign messages and transactions to authorize the network to charge your account ether to perform operations.

Contract A Contract is an abstraction which represents a connection to a specific contract on the Ethereum Network, so that applications can use it like a normal JavaScript object.
Common Terms

- connect to Ethereum via MetaMask

  - as a **provider** : provide a connection to Ethereum network

  - as a **signer** : hold your private key and can sign things

  - **Web3Provider** wraps **window.ethereum** which is injected by MetaMask

  - `const provider = new ethers.providers.Web3Provider(window.ethereum)`

  - MetaMask requires permission to connect users accounts : `await provider.send("eth_requestAccounts", []);`

  - MetaMask signs transactions to send ether and pay to change state within the blockchain : `const signer = provider.getSigner()`

- connect to Ethereum via JSON-RPC API ( an RPC client ? )

  - `const provider = new ethers.providers.JsonRpcProvider();`

  - `const signer = provider.getSigner()`

- basic queries

  - `await provider.getBlockNumber()`

  - `balance = await provider.getBalance("ethers.eth")`

  - present in ether: `ethers.utils.formatEther(balance)`

  - convert from ether to wei: `ethers.utils.parseEther("1.0")`

- writing to Blockchain

```js
// Send 1 ether to an ens name.
const tx = signer.sendTransaction({
  to: "ricmoo.firefly.eth",
  value: ethers.utils.parseEther("1.0")
})
```

- Application Binary Interface (ABI)

```js
const daiAddress = "dai.tokens.ethers.eth"

const daiAbi = [
  "event Transfer(address indexed from, address indexed to, uint amount)"
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
]

const daiContract = new ethers.Contract(daiAddress, daiAbi, provider)
```

```js
// Read-Only Methods
await daiContract.name()
await daiContract.symbol()
balance = await daiContract.balanceOf("ricmoo.firefly.eth")
ethers.utils.formatUnits(balance, 18)
```

```js
// State Changing Methods
const daiWithSigner = contract.connect(signer)
const dai = ethers.utils.parseUnits("1.0", 18)
tx = daiWithSigner.transfer("ricmoo.firefly.eth", dai)
```

```js
// Listening to Events
// Receive an event when ANY transfer occurs
daiContract.on("Transfer", (from, to, amount, event) => {
    console.log(`${ from } sent ${ formatEther(amount) } to ${ to}`);
    // The event object contains the verbatim log data, the
    // EventFragment and functions to fetch the block,
    // transaction and receipt and event functions
});

// A filter for when a specific address receives tokens
myAddress = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";
filter = daiContract.filters.Transfer(null, myAddress)
// {
//   address: 'dai.tokens.ethers.eth',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     null,
//     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
//   ]
// }

// Receive an event when that filter occurs
daiContract.on(filter, (from, to, amount, event) => {
    // The to will always be "address"
    console.log(`I got ${ formatEther(amount) } from ${ from }.`);
```

===

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

-[repository](https://github.com/alchemyplatform/hello-world-part-four-tutorial)

useEffect- this is a React hook that is called after your component is rendered. Because it has an empty array [] prop passed into it (see line 4), it will only be called on the component's first render. Here we'll load the current message stored in our smart contract, call our smart contract and wallet listeners, and update our UI to reflect whether a wallet is already connected.

- On lines 6-12, if the user's wallet is connected (i.e. walletAddress.length > 0), we display a truncated version of the user walletAddress in the button with ID "walletButton;" otherwise it simply says "Connect Wallet."

- On line 17, we display the current message stored in the smart contract, which is captured in the message string.

- On lines 23-26, we use a conntrolled component to update our newMessage state variable when the input in the text field changes.

- called when the buttons with IDs publishButton and walletButton are clicked respectively.

Finally let's address where is this HelloWorld.js component added.

- If you go to the App.js, which is the main component in React that acts as a container for all other components, you'll see that our HelloWorld.js component is injected on line 7.

## The interact.js file

Because we want to prescribe to the M-V-C paradigm

- contains all our functions to manage the logic, data, and rules of our dApp, and then be able to export those functions to our frontend (our HelloWorld.js component).

- contain all of our smart contract interaction and wallet functions and variables.

- **helloWorldContract**

- **loadCurrentMessage**

  - handles the logic of loading the current message stored in the smart contract

  - make a read call to the Hello World smart contract using the Alchemy Web3 API.

- **connectWallet**

  - connect the user's Metamask to our dApp.

- **getCurrentWalletConnected**

  - check if an Ethereum account is already connected to our dApp on page load and update our UI accordingly.

- **updateMessage**

  - update the message stored in the smart contract

  - make a write call to the Hello World smart contract, so the user's Metamask wallet will have to sign an Ethereum transaction to update the message.

‍# A listener to watch for updates when the data you're reading from the smart contract changes

`npm install @alch/alchemy-web3`

- Alchemy Web3 is a wrapper around Web3.js

`npm install dotenv --save`

- we'll be using our Websockets API key instead of our HTTP API key

- allow us to set up a listener that detects when the message stored in the smart contract changes.

`REACT_APP_ALCHEMY_KEY = wss://eth-ropsten.ws.alchemyapi.io/v2/`

`interact.js`

```js
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

- createAlchemyWeb3 : establish our Alchemy Web3 endpoint

- contract-abi.json should be stored in your src folder

- Armed with our contract address, ABI, and Alchemy Web3 endpoint, we can use the contract method to **load an instance** of our smart contract

`interact.js`

```js
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(contractABI, contractAddress)
```

`interact.js`

- return the message stored in the smart contract:

```js
export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

`HelloWorld.js`

```js
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

addSmartContractListener : will automatically update the UI after the message in the smart contract changes

`http://localhost:3000/`

- there is a smart contract event called UpdatedMessages that is emitted after our smart contract's update function is invoked

```sh
pragma solidity ^0.7.3;

contract HelloWorld {
   // your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.

   event UpdatedMessages(string oldStr, string newStr);
   string public message;
   constructor(string memory _initMessage) { message = _initMessage; }

   function update(string memory _newMessage) public {
      string memory oldMsg = message;
      message = _newMessage;
      emit UpdatedMessages(oldMsg, _newMessage);
   }
}
```

- events are a way for your contract to communicate that something happened (i.e. there was an event) on the blockchain to your front-end application, which can be 'listening' for specific events and take action when they happen.

The addSmartContractListener function is going to specifically listen for our Hello World smart contract's UpdatedMessages event, and update our UI to display the new message.

```js
function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

Let's break down what happens when the listener detects an event:
If an error occurs when the event is emitted, it will be reflected in the UI via our status state variable.

Otherwise, we will use the data object returned. The data.returnValues is an array indexed at zero where the first element in the array stores the previous message and second element stores the updated one. Altogether, on a successful event we'll set our message string to the updated message, clear the newMessage string, and update our status state variable to reflect that a new message has been published on our smart contract.

Finally, let's call our listener in our useEffect function so it is initialized on the HelloWorld.js component first render. Altogether, your useEffect function should look like this:

```js
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

Now that we're able to read from our smart contract, it would be great to figure out how to write to it too! However, to write to our dApp, we must first have an Ethereum wallet connected to it.

So, next we'll tackle setting up our Ethereum wallet (Metamask) and then connecting it to our dApp!

Step 4: Set up your Ethereum wallet

To write anything to the Ethereum chain, users must sign transactions using their virtual wallet's private keys. For this tutorial, we’ll use Metamask, a virtual wallet in the browser used to manage your Ethereum account address, as it makes this transaction signing super easy for the end-user.

If you want to understand more about how transactions on Ethereum work, check out this page from the Ethereum foundation.
Download Metamask
You can download and create a Metamask account for free here. When you are creating an account, or if you already have an account, make sure to switch over to the “Ropsten Test Network” in the upper right (so that we’re not dealing with real money).

NOTE: This result is in wei not eth. Wei is used as the smallest denomination of ether. The conversion from wei to eth is: 1 eth = 10¹⁸ wei. So if we convert 0xde0b6b3a7640000 to decimal we get 1\*10¹⁸ which equals 1 eth.

- connect Metamask wallet to our dApp

The connectWallet function

In our interact.js file, let's implement the connectWallet function, which we can then call in our HelloWorld.js component.

Let's modify connectWallet to the following:

```.js
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
```

{" "} 🦊{" "} You must install Metamask, a virtual Ethereum wallet, in your browser.

), }; } };
So what does this giant block of code do exactly?

- checks if window.ethereum is enabled in your browser.

- window.ethereum is a global API injected by Metamask and other wallet providers that allows websites to request users' Ethereum accounts. If approved, it can read data from the blockchains the user is connected to, and suggest that the user sign messages and transactions . Check out the Metamask docs for more info!
  If window.ethereum is not present, then that means Metamask is not installed. This results in a JSON object being returned, where address returned is an empty string, and the status JSX object relays that the user must install Metamask.

- Using a try/catch loop, we'll try to connect to Metamask by calling window.ethereum.request({ method: "eth_requestAccounts" }); Calling this function will open up Metamask in the browser, whereby the user will be prompted to connect their wallet to your dApp.

If the user chooses to connect, method: "eth_requestAccounts" will return an array that contains all of the user's account addresses that connected to the dApp. Altogether, our connectWallet function will return a JSON object that contains the first address in this array (see line 9) and a stats message that prompts the user to write a message to the smart contract.

If the user rejects the connection, then the JSON object will contain an empty string for the address returned and a status message that reflects that the user rejected the connection.

Now that we've written this connectWallet function, the next step is to call it to our HelloWorld.js component.

‍

Add the connectWallet function to your HelloWorld.js UI Component
Navigate to the connectWalletPressed function in the HelloWorld.js, and update it to the following:

```js
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Notice how most of our functionality is abstracted away to our HelloWorld.js component from the interact.js file? This is so we comply with the M-V-C paradigm!

In connectWalletPressed we simple make an await call to our imported connectWallet function, and using its response, we update our status and walletAddress variables via their state hooks.

Now, let's save both files (HelloWorld.js and interact.js) and test out our UI so far.

Open your browser on the http://localhost:3000/ page, and press the "Connect Wallet" button on the top right of the page.

If you have Metamask installed, you should be prompted to connect your wallet to your dApp. Accept the invitation to connect.

You should see that the wallet button now reflects that your address is connected! Yasssss 🔥

Next, try refreshing the page... this is strange. Our wallet button is prompting us to connect Metamask, even though it is already connected...

The problem page on reload
However, have no fear! We easily can address that (get it? 😅) by implementing getCurrentWalletConnected, which will check if an address is already connected to our dApp and update our UI accordingly!

The getCurrentWalletConnected function
Update your getCurrentWalletConnected function in the interact.js file to the following:

```js
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
```

{" "} 🦊{" "} You must install Metamask, a virtual Ethereum wallet, in your browser.

), }; } };
This code is very similar to the connectWallet function we just wrote up in the previous step.

The main difference is that instead of calling the method eth_requestAccounts, which opens Metamask for the user to connect their wallet, here we call the method eth_accounts, which simply returns an array containing the Metamask addresses currently connected to our dApp.

The main difference is that instead of calling the method eth_requestAccounts, which opens Metamask for the user to connect their wallet, here we call the method eth_accounts, which simply returns an array containing the Metamask addresses currently connected to our dApp.

```js
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Notice we use the response of our call to getCurrentWalletConnected to update our walletAddress and status state variables.

Now that you've added this code, let's try refreshing our browser window.

It's working!!!!!
Niceeeee! The button should say that you're connected, and show a preview of your connected wallet's address - even after you refresh!

Implement addWalletListener
The final step in our dApp wallet setup is implementing the wallet listener so our UI updates when our wallet's state changes, such as when the user disconnects or switches accounts.

In your HelloWorld.js file, modify your addWalletListener function as following:

I bet you don't even need our help to understand what's going on here at this point 😉, but for thoroughness purposes, let's quickly break it down:

First, our function checks if window.ethereum is enabled (i.e. Metamask is installed).

If it's not, we simply set our status state variable to a JSX string that prompts the user to install Metamask.

If it is enabled, we set up the listener window.ethereum.on("accountsChanged") on line 3 that listens for state changes in the Metamask wallet, which include when the user connects an additional account to the dApp, switches accounts, or disconnects an account. If there is at least one account connected, the walletAddress state variable is updated as the first account in the accounts array returned by the listener. Otherwise, walletAddress is set as an empty string.

Last but not least, we must call it in our useEffect function:

```js
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

And that's it! We've successfully completed programming all of our wallet functionality! Now onto our last task: updating the message stored in our smart contract!

Step 6: Implement the updateMessage function
Alrighty fam, we've arrived at the home stretch! In the updateMessage of your interact.js file, we're going to do the following:

Make sure the message we wish to publish in our smart contact is valid

Sign our transaction using Metamask

Call this function from our HelloWorld.js frontend component

Input error handling
Naturally, it makes sense to have some sort of input error handling at the start of the function.

We'll want our function to return early if there is no Metamask extension installed, there is no wallet connected (i.e. the address passed in is an empty string), or the message is an empty string. Let's add the following error handling to updateMessage:

```js
export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status: "💡 Connect your Metamask wallet to update the message on the blockchain."
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string."
    }
  }
}
```

Now that it have proper input error handling, it's time to sign the transaction via Metamask!

Signing our transaction
If you're already comfortable with traditional web3 Ethereum transactions, the code we write next will be very familiar. Below your input error handling code, add the following to updateMessage:

```js
//set up transaction parameters
 const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: helloWorldContract.methods.update(message).encodeABI(),
  };

//sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (

          ✅{" "}

            View the status of your transaction on Etherscan!


          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.

      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
```

Let's breakdown what's happening. First, we set up our transactions parameters, where:

to specifies the recipient address (our smart contract)

from specifies the signer of the transaction, the address variable we passed into our function

data contains the call to our Hello World smart contract's update method, receiving our messagestring variable as input

Then, we make an await call, window.ethereum.request, where we ask Metamask to sign the transaction. Notice, on lines 11 and 12, we're specifying our eth method, eth_sendTransaction and passing in our transactionParameters.

‍

At this point, Metamask will open up in the browser, and prompt the user to sign or reject the transaction.

If the transaction is successful, the function will return a JSON object where the status JSX string prompts the user to check out Etherscan for more information about their transaction.
If the transaction fails, the function will return a JSON object where the status string relays the error message.
Altogether, our updateMessage functon should look like this:

```js
export const updateMessage = async (address, message) => {

  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to update the message on the blockchain.",
    };
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    };
  }

  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: helloWorldContract.methods.update(message).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (

          ✅{" "}

            View the status of your transaction on Etherscan!


          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.

      ),
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};
```

Last but not least, we need to connect our updateMessage functon to our HelloWorld.js component.

Connect updateMessage to the HelloWorld.js frontend
Our onUpdatePressed function should make an await call to the imported updateMessage function and modify the status state variable to reflect whether our transaction succeeded or failed:

```js
const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

It's super clean and simple. 😌 And guess what...YOUR DAPP IS COMPLETE!!!

Let's test out the "Update" button!

DApp "Update" button demo
Step 7: Make your own custom dApp 🚀
Wooooo, you made it to the end of the tutorial! To recap, you learned how to:

Connect a Metamask wallet to your dApp project
Read data from your smart contract using the Alchemy Web3 API
Sign Ethereum transactions using Metamask
Now you're fully equipped to apply the skills from this tutorial to build out your own custom dApp project! As always, if you have any questions, don't hesitate to reach out to us for help in the Alchemy Discord. 🧙‍♂️

====

# 🗃 Hello World Part 4 Tutorial Starter Files

This project contains the starter files for [Hello World Part 4 tutorial](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/creating-a-full-stack-dapp), in which we teach you how to create a full stack dApp by connecting your Hello World smart contract to a React frontend using Metamask and Web3 tools.
