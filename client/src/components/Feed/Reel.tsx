import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import AddFriend from '../AddFriend';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useState, useEffect } from 'react';
import axios from 'axios';


type Props = {
  reels: {
    id: string;
    public_id: number;
    url: string;
    text?: string;
    like_count?: number;
    UserId: number;
    EventId?: number;
    User: User;
    Event: Event;
  }[];
  user: User;
  AddFriend?: React.ReactNode | React.ReactNode[];
  friends: {
    id: number;
    status: string;
    requester_id: number;
    accepter_id: number;
  }[];
};

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

type Event = {
  id: number;
  name: string;
  rsvp_count: number;
  date: string;
  geolocation: string;
  twenty_one: boolean;
  createdAt: string;
  updatedAt: string;
  PlaceId: 1;
};

const Reel: React.FC<Props> = ({ reels, user, AddFriend, friends }) => {
  const [friendList, setFriendList] = useState([]);
  // get friendship from db for currUser and create state
  /**
   * within  reels?.map // if reel.User.id is equal to friend <accepter_id>
   *
   */

  useEffect(() => {
    axios.get('/feed/friendlist')
      .then(( {data} ) => {
        console.log('data from friends Axios GET ==>', data);
        data.map((user: any) => {
          if (user.status === 'approved') {
            setFriendList([...friendList, user.accepter_id])
          }
        })
      })
      .catch((err) => {
        console.error('Failed to get Friends:', err);
    })
  }, [])

  console.log('friendList ==>', friendList)
  return (
    <div className='reel-container'>
      {reels?.map((reel) => {
        return (
          <div key={reel.id + 'reel'}>
            <div className='video' id={reel.url}>
              <p className='video-text'>{reel.text}</p>
              {/**Removes addFriend button if already approved friend*/}
              <>{!friendList.includes(reel.User.id) && AddFriend}</>
              <div className='friend-request'>
                <Tooltip
                  title={reel.User.displayName}
                  TransitionComponent={Zoom}
                  describeChild
                >
                  <Avatar
                    className='friend-avatar'
                    sx={{ width: 48, height: 48 }}
                    alt={reel.User.displayName}
                    src={reel.User.picture}
                  />
                </Tooltip>
              </div>
            </div>
            <div className='video-links-container'>
              <Box sx={{ maxWidth: 400 }}>
                <BottomNavigation>
                  <BottomNavigationAction
                    label='Favorites'
                    icon={<FavoriteIcon />}
                  />
                  <BottomNavigationAction
                    label='Nearby'
                    icon={<LocationOnIcon />}
                  />
                </BottomNavigation>
              </Box>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reel;
