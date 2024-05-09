import React, { useState, useEffect } from 'react';
import './Banner.css';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/constants';
import Youtube from 'react-youtube';

function Banner() {
  const [movie, setMovie] = useState(null);
  const [urlId, setUrlId] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    axios.get(`discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
      .then((response) => {
        const randomIndex = Math.floor(Math.random() * response.data.results.length);
        setMovie(response.data.results[randomIndex]);
      });
  }, []);

  const handlePlayButtonClick = () => {
    axios.get(`movie/${movie.id}/videos?api_key=${API_KEY}`)
      .then((response) => {
        const trailers = response.data.results;
        if (trailers.length > 0) {
          const randomIndex = Math.floor(Math.random() * trailers.length);
          setUrlId(trailers[randomIndex].key);
          setShowVideoPlayer(true);
        } else {
          console.log('No trailers available');
        }
      });
  };

  const handleCloseButtonClick = () => {
    setShowVideoPlayer(false);
  };

  return (
    <div className='banner-container'>
      <div className='banner' style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }}>
        <div className='content'>
          <h1 className='title'>{movie ? movie.title : ""}</h1>
          <div className='banner-btns'>
            <button className='btn' onClick={handlePlayButtonClick}>Play</button>
          </div>
          <h2 className='description'>{movie ? movie.overview : ""}</h2>
        </div>
        <div className="fade"></div>
      </div>
      {showVideoPlayer && (
        <div className="trailer">
          <button className='closeButton' onClick={handleCloseButtonClick}>
            Close
          </button>
          <Youtube videoId={urlId} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Banner;
