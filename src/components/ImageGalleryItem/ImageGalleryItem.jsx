import {useState} from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import ImageGalleryItemStyled from './ImageGalleryItem.styled';
import ImageGalleryItemImage from './ImageGalleryItemImage/ImageGalleryItemImage'

const ImageGalleryItem = ({onClick,galleryList,imageURL})=> {
 const [showModal, setShowModal] = useState(false);
  

const showModalonClick = ()=>{
  setShowModal(prevState => !prevState);
};

// openGalleryItemModal = id=>{
//     this.showModal();
//     const galleryItem = this.props.galleryList.filter(item => item.id === id);
//     this.setState({largeImage:galleryItem[0].largeImageURL});
// };


    // const {galleryList}= this.props;
    return(
        <>
        {galleryList.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItemStyled
              key={id}
              onClick={() => {
                onClick(largeImageURL);
                showModalonClick();
              }}
            >
              <ImageGalleryItemImage src={webformatURL} />
            </ImageGalleryItemStyled>
          );
        })}
        {showModal && (
          <Modal src={imageURL} onClose={showModalonClick} />
        )}
        </>
    );
 
}

export default ImageGalleryItem;

ImageGalleryItem.propType ={
    galleryList:PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string.isRequired,
            webformatURL:PropTypes.string.isRequired,
            largeImageURL:PropTypes.string.isRequired,
        })
    ),
};

