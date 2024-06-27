import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Navbar from './navbar';
import { AuthContext } from '../App';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({});
  const [userTickets, setUserTickets] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = auth.user.id;
      const url = `https://n9rqqp2jak.execute-api.us-east-1.amazonaws.com/prod/users/details?user_id=${userId}`;
  
      if (auth.user) {
        try {
          const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          response = JSON.parse(response.body)
          const data = await response.json()
          console.log(data)
          
          // setUserProfile(response.data.profile);
          setUserTickets(response.data.tickets);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [auth.user]);

  return (
    <div>
      <div className="flex flex-col items-center p-4">
        <div className="text-3xl font-semibold mb-8">Profile Page</div>
        
        {/* Profile Card */}
        {userProfile && (
          <Card className="flex flex-row mb-8 w-full max-w-4xl">
            <CardMedia
              component="img"
              sx={{ width: 200 }}
              image={userProfile.profileImageUrl || 'https://via.placeholder.com/150'}
              alt={userProfile.name}
            />
            <div className="flex flex-col justify-between w-full">
              <CardContent>
                <Typography variant="h5">{userProfile.full_name}</Typography>
                <Typography variant="subtitle1">{userProfile.username}</Typography>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Tickets */}
        <div className="my-2 text-3xl text-left font-semibold align-left">Tickets Purchased</div>
        <div className="bg-green rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-4 w-full max-w-4xl">
            {userTickets.map((ticket) => (
              <Card className="flex flex-row m-4" key={ticket.id} style={{ maxWidth: 600 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 150 }}
                  image={ticket.imageUrl || 'https://via.placeholder.com/150'}
                  alt={ticket.event}
                />
                <div className="flex flex-col justify-between w-full">
                  <CardContent>
                    <Typography variant="h6">{ticket.event}</Typography>
                    <Typography variant="subtitle1">{ticket.artist}</Typography>
                    <Typography variant="body2">Date: {ticket.date}</Typography>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
