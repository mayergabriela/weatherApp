import React from 'react'
type Props = {
  message: string;
  warning?:boolean;
}

function CalloutCard ({message,warning}: Props){
  return (
    <div>CalloutCard</div>
  )
}

export default CalloutCard