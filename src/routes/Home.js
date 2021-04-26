// 리액트 앱이 JSX를 이해할 수 있게 됨! 
import React from 'react';
import axios from 'axios';
// Movie.js 에서 Movie 컴포넌트를 가져오기!
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoading: true,
    // movies의 기본 값은 빈 배열
    movies: [],
  };
  
  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    this.setState({ movies, isLoading: false });
  };

  // 컴포넌트가 mount 되면 실행되는 생명주기 함수
  componentDidMount() {
    // 함수를 분리하는 이유: 추후 수정이 필요하면 함수 정의만 수정하면 함수를 활용하는 곳에 일괄 적용되니까! 
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">'Loading...'</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
           ))}
          </div>        
        )}
      </section>
    );
  }
}

export default Home;