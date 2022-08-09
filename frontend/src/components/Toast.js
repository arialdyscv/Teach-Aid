import React from 'react'
import { Toast } from 'bootstrap'

export default function MyToast() {
    const toastCss = {
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex:'1'
    }
  return (

    <Toast style={toastCss} className={"border border-success bg-success text-white"}>
        <Toast.Header className={"bg-success text-white"} closeButton={false}>
            <strong className='mr-auto'>Success</strong>
        </Toast.Header>
        <Toast.Body>
            Book Saved Successfully.
        </Toast.Body>
    </Toast>
  )
}
