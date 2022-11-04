import React from 'react'

function Title() {
  return (
    <div
    id="title"
    className=" my-5 py-3 px-2 text-slate-200 flex flex-col items-center rounded-md "
    >
        <h2 className=" md:text-4xl text-3xl ml-3 "> GOERLI FAUCET</h2>
        <p className=" mt-1 md:text-lg text-xs text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 "> For ALCHEMY UNIVERSITY EARLY ACCESS HODLERS{" "}</p>
    </div>
  )
}

export default Title