import React from 'react'
import { Oval } from 'react-loader-spinner'
import "../Loading/Loading.css";

const Loading = () => {
  return (
    <div className='loader'>
        <Oval
            height={80}
            width={80}
            color="#d4473d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="white"
            strokeWidth={2}
            strokeWidthSecondary={2}
            />
    </div>
  )
}

export default Loading
