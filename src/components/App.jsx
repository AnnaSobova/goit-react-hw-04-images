
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
  

    useEffect(() => {
      const update = async () => {
        setLoading(true);
        try {
          await getImage(query, page).then(data => {
            if (!data.hits.length) {
              return console.log(
                'There is no images with this request. Please, try again'
              );
            }
            setGallery(prevValue => [...prevValue, ...data.hits]);
            setTotal(data.totalHits);
          });
        } catch (error) {
          console.log('Error', error);
        } finally {
          setLoading(false);
        }
      };
  
      update();
    }, [query, page]);



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
