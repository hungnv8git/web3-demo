import { useEffect, useState } from "react"

import { useWeb3React } from "@web3-react/core"
import { BigNumber } from "bignumber.js"

import { injected } from "../dapp/connectors"

export default function Demo() {
  const { active, account, chainId, library, activate, deactivate } =
    useWeb3React()

  const [balance, setBalance] = useState<any>()

  async function connect() {
    try {
      await activate(injected)
    } catch (error) {
      console.log(error)
    }
  }

  async function disconnect() {
    try {
      await deactivate()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(undefined)
      }
    }
  }, [account, library, chainId])

  return (
    <>
      {active ? (
        <>
          <div>
            Connected with <b>{account}</b>
          </div>
          <button onClick={disconnect}>Disconnect</button>
        </>
      ) : (
        <>
          <div>Not connected</div>
          <button onClick={connect}>Connect to wallet</button>
        </>
      )}

      <div>
        <span>Balance</span>
        <span role="img" aria-label="gold">
          💰
        </span>
        <span>
          {balance === null
            ? "Error"
            : balance
            ? `${new BigNumber(balance)}`
            : ""}
        </span>
      </div>
    </>
  )
}
