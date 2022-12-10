
import { Component } from 'react';
import getImage from 'request-api/request-api';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchForm from './Form/SearchForm';
import Searchbar from './Searchbar/Searchbar';
import AppStyled from './App.styled';

export class App extends Component {
  state = {
    gallery: [],
    page: 1,
    query: '',
    total: null,
    loading: false,
    imageURL: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      return this.update();
    }
  }
  async update() {
    this.setState({ loading: true });
    try {
      await getImage(this.state.query, this.state.page).then(res => {
        if (!res.hits.length) {
          return console.log(
            'There is no images with this request. Please, try again'
          );
        }
        this.setState(prevState => {
          return {
            gallery: [...prevState.gallery, ...res.hits],
            total: res.totalHits,
          };
        });
      });
    } catch (error) {
      console.log('Error', error);
    } finally {
      this.setState({ loading: false });
    }
  }
  handleLoadMoreBtn = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleSubmit = query => {
    if (query.trim().length === 0) {
      return;
    }
    this.setState({
      gallery: [],
      page: 1,
      total: null,
      imageURL: null,
      query: query,
    }); 
  };

  onClickGalleryImage = imageURL => {
    this.setState({ imageURL });
  };

  render() {
    const { gallery, imageURL, total } = this.state;

    return (
      <AppStyled>
        <Searchbar>
          <SearchForm onSubmit={this.handleSubmit} />
        </Searchbar>
        {gallery.length > 0 && (
          <>
            <ImageGallery
              galleryList={gallery}
              onClick={this.onClickGalleryImage}
              imageURL={imageURL}
            />
            {total !== gallery.length && (
              <Button text="Load more" onClick={this.handleLoadMoreBtn} />
            )}
          </>
        )}
        {this.state.loading && <Loader />}
      </AppStyled>
    );
  }
}