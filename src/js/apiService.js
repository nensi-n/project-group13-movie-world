import axios from 'axios';
const API_KEY = '4cd8eda69724fa63af45af35bb5db6f9';
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_URL = `${BASE_URL}/trending/movie/day`;
const SEARCH_URL = `${BASE_URL}/search/movie`;
const ID_URL = `${BASE_URL}/movie/`;

export default {

    // Получение информации о популярных фильмах
    async PopularMovie(page) {
        try {
            const { data } = await axios.get(`${POPULAR_URL}?api_key=${API_KEY}&page=${page}`,);
            return data;
        } catch (error) {
            console.error('Error with Api' + error);
        }
    },
    
    // Поиск по ключевому слову (по инпуту в поле поиска)
    async MovieSearch(text, page) {
        try {
            const { data } = await axios.get(`${SEARCH_URL}?api_key=${API_KEY}&query=${text}&page=${page}`,);
            return data;
        } catch (error) {
            console.error('Error with Api search' + error);
        }
    },

    //Поиск по айди (для модалки выводит инфо конкретного фильма)
    async MovieSearchId(id) {
        try {
            const { data } = await axios.get(`${ID_URL}${id}?api_key=${API_KEY}`);
            const result = {...data, year: createYear(data), genres: createGenresFromID(data),};
            return result;
        } catch (error) {
            console.error('Error with Api ID' + error);
        }
    },
};