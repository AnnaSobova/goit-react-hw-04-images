const KEY = '30281232-70811b4bf68f3f563b5d60fb4';
 const getImage = (query, page)=>
 fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
 ).then (response => response.json());
 export default getImage