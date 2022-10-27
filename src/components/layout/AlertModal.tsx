
import React, { useContext, useEffect } from 'react';
import { AlertContext } from '../../context/alert/AlertContext'

const AlertModal = () => {
    const { alert } = useContext(AlertContext);
    const clickButtonAuto = () => {
        
        if (alert && alert?.show === true) {
            
        }
        const elemRef = document.getElementById('showButtonID');
            elemRef?.click();

    }

    (function () {
        clickButtonAuto()
    })()

  return (
      <div >
          <label htmlFor="my-modal" id='showButtonID' style={{ visibility: 'collapse' }}
              className="btn modal-button">open modal</label>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Sorry!</h3>
                  <p className="py-4">{ alert?.message }!</p>
                <div className="modal-action">
                <label htmlFor="my-modal" className="btn">OK</label>
                </div>
            </div>
            </div>
          
    </div>
  )
}

export default AlertModal