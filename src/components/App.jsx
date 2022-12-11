
import {useState, useEffect } from 'react';
import getImage from 'request-api/request-api';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchForm from './Form/SearchForm';
import Searchbar from './Searchbar/Searchbar';
import AppStyled from './App.styled';

export const App = ()=> {
  
    const [gallery, setGallery ]= useState ([]);
    const [page, setPage ]= useState(1);
    const [query, setQuery ]= useState('');
    const [total, setTotal ]= useState(null);
    const [loading, setLoading ]= useState(false);
    const [imageURL,setImageURL ]= useState(null);
  

  // componentDidUpdate(_, prevState) {
  //   if (
  //     prevState.query !== this.state.query ||
  //     prevState.page !== this.state.page
  //   ) {
  //     return this.update();
  //   }
  // }
  // async update() {
  //   this.setState({ loading: true });
  //   try {
  //     await getImage(this.state.query, this.state.page).then(res => {
  //       if (!res.hits.length) {
  //         return console.log(
  //           'There is no images with this request. Please, try again'
  //         );
  //       }
  //       this.setState(prevState => {
  //         return {
  //           gallery: [...prevState.gallery, ...res.hits],
  //           total: res.totalHits,
  //         };
  //       });
  //     });
  //   } catch (error) {
  //     console.log('Error', error);
  //   } finally {
  //     this.setState({ loading: false });
  //   }
  // }

  const handleLoadMoreBtn = () => {
    setPage (prevState => prevState+1)
      setLoading(true);
    };
  

  const handleSubmit = query => {
    if (query.trim().length === 0) {
      return;
    }
      setGallery ([]);
      setPage(1);
      setTotal (null);
      setImageURL(null);
      setQuery(query);
     
  };

  const onClickGalleryImage =  imageURL => {
    setImageURL( imageURL );
  };

  

    return (
      <AppStyled>
        <Searchbar>
          <SearchForm onSubmit={handleSubmit} />
        </Searchbar>
        {gallery.length > 0 && (
          <>
            <ImageGallery
              galleryList={gallery}
              onClick={onClickGalleryImage}
              imageURL={imageURL}
            />
            {total !== gallery.length && (
              <Button text="Load more" onClick={handleLoadMoreBtn} />
            )}
          </>
        )}
        {loading && <Loader />}
      </AppStyled>
    );
  };
