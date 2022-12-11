import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {ModalStyled,OverlayStyled} from './Modal.styled';

const Modal = ()=> {

  useEffect(()=>{
    window.addEventListener('keydown', this.handleKeyDown);
    return ()=>{
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  })
  

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  
    return (
      <OverlayStyled onClick={handleKeyDown}>
        <ModalStyled>
          <img src={this.props.src} alt="" />
        </ModalStyled>
      </OverlayStyled>
    );
  
}

export default Modal;

Modal.propType = {
  src: PropTypes.string.isRequired,
};