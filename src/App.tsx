import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import Demo from "./components/Demo"
import "./App.css"

function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider)
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div style={{ width: "80%", margin: "auto" }}>
        <h1>web3-react-demo</h1>
        <Demo />
      </div>
    </Web3ReactProvider>
  )
}

export default App
