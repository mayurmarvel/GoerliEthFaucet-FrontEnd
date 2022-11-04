import React from 'react'

function LastTransaction({hash}) {
  return (
    <div
    id="gmAUEAFam"
    className=" mt-2 py-3 px-1 text-slate-200  flex flex-col rounded-md "
    >
        <h2 className=" text-1xl ml-3"> Track your Transaction <a className=' underline underline-offset-4' href={`https://goerli.etherscan.io/tx/${hash}`}> on EtherScan 👈</a></h2>
    </div>
  )
}

export default LastTransaction