import React, { useEffect, useState } from 'react';
import './RowPost.css';
import axios from '../../axios';
import { imageUrl, API_KEY } from '../../constants/constants';
import Youtube from 'react-youtube';

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const opts = {
    height: '600',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    axios.get(props.url)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch((err) => {
        alert('Network Error');
      });
  }, []);

  const handleMovie = (id) => {
    console.log(id);
    axios.get(`movie/${id}/videos?&api_key=${API_KEY}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
          setShowVideoPlayer(true); 
        } else {
          console.log('Array empty');
        }
      });
  };

  const handleCloseButtonClick = () => {
    setShowVideoPlayer(false);
  };

  return (
    <div className='row'>
      <h1>{props.title}</h1>
      <div className='posters'>
        {movies.map((obj) => (
          <img
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? 'smallPoster' : 'poster'}
            src={`${imageUrl + obj.backdrop_path}`}
            alt='poster'
          />
        ))}
      </div>
      {showVideoPlayer && (
        <div>
          <button className='closeButton' onClick={handleCloseButtonClick}>
            Close
          </button>
          <Youtube videoId={urlId.key} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default RowPost;
