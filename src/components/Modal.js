// import React from 'react';
import {createPortal} from 'react-dom'

const modalRoot = document.getElementById('modal-root');

export default function Modal({children}) {
  return  createPortal(children,modalRoot);
}
