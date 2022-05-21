export const connectWallet = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts"
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0]
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            🦊 <a href={`https://metamask.io/download.html`}>Please install Metamask</a>
          </p>
        </span>
      )
    }
  }
}
