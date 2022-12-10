import {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import ImageGalleryItemStyled from './ImageGalleryItem.styled';
import ImageGalleryItemImage from './ImageGalleryItemImage/ImageGalleryItemImage'

class ImageGalleryItem extends Component{
  state={
    showModal:false,
  }
showModal = ()=>{
    this.setState(({showModal})=>({
        showModal:!showModal,
    }));
};

openGalleryItemModal = id=>{
    this.showModal();
    const galleryItem = this.props.galleryList.filter(item => item.id === id);
    this.setState({largeImage:galleryItem[0].largeImageURL});
};

render(){
    const {galleryList}= this.props;
    return(
        <>
        {galleryList.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItemStyled
              key={id}
              onClick={() => {
                this.props.onClick(largeImageURL);
                this.showModal();
              }}
            >
              <ImageGalleryItemImage src={webformatURL} />
            </ImageGalleryItemStyled>
          );
        })}
        {this.state.showModal && (
          <Modal src={this.props.imageURL} onClose={this.showModal} />
        )}
        </>
    );
 }
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

