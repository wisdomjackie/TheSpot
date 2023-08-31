import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import useLocalStorageState from '../../Feed/useLocalStorageState';
import io from 'socket.io-client';
const socket = io();

type User = {
  id: number;
  username: string;
  displayName: string;
  type: string;
  geolocation: string;
  mapIcon: string;
  birthday: string;
  privacy: string;
  accessibility: string;
  email: string;
  picture: string;
  googleId: string;
};

type Props = {
  reel: any;
  handleAddLike: any;
  handleRemoveLike: any;
  user: User;
  likes: any[];
  likesBool: any;
};

const Likes: React.FC<Props> = ({ handleRemoveLike, handleAddLike, reel }) => {
  const [clicked, setClicked] = useState(false);

  const handleLikeClick = (reelId: number) => {
    if (clicked === false) {
      setClicked(true);
      handleAddLike(reelId);
      socket.emit('likesNotif', 'like');
    } else {
      setClicked(false);
      handleRemoveLike(reelId);
    }
  };

  return (
    <React.Fragment>
      {!clicked && (
        <FavoriteIcon
          name='Like Button'
          aria-label='Like Button'
          onClick={() => handleLikeClick(reel.id)}
        />
      )}
      {clicked && (
        <FavoriteIcon
          name='Like Button'
          aria-label='Like Button'
          color='secondary'
          onClick={() => handleLikeClick(reel.id)}
        />
      )}
    </React.Fragment>
  );
};

export default Likes;