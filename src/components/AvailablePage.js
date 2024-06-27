import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import axios from 'axios';
import Navbar from './navbar';
import { Link } from 'react-router-dom';

const AvailablePage = () => {
  const [concerts, setConcertsData] = useState([]);

  useEffect(() => {
    // Fetch concert data from the API
    const concertsApiUrl = 'https://45vpfyxamh.execute-api.us-east-1.amazonaws.com/prod';
      // const hotEventsApiUrl = 'https://your-api-endpoint/hot-events';
  
      const fetchConcertsData = async () => {
        try {
          const response = await axios.get(concertsApiUrl);
          const responseData = JSON.parse(response.data.body);
          console.log(responseData);
          setConcertsData(responseData.concerts);
        } catch (error) {
          console.error('Error fetching concerts data:', error);
        }
      };

    fetchConcertsData();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center p-4">
        
        <div className="text-3xl font-semibold mb-4 my-4">All Available Concerts</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          {concerts.map((concert) => (
            <Card className="flex flex-col m-4" key={concert.id} style={{ maxWidth: 600 }}>
              <CardMedia
                component="img"
                sx={{ height: 300 }}
                image={concert.imageUrl || 'https://via.placeholder.com/300'} // Replace with actual image URL from data
                alt={concert.event_name}
              />
              <CardContent>
                <Typography variant="h5">{concert.event_name}</Typography>
                <Typography variant="subtitle1">{concert.artist}</Typography>
                <Typography variant="body2">Promoter: {concert.promotor}</Typography>
                <Typography variant="body2">Seats Available: {concert.avail_seats}</Typography>
              </CardContent>
              <div className="flex justify-end p-2">
              <Button
                  variant="outlined"
                  component={Link}
                  to={`/transaction/${concert.event_name}`}
                >
                  Buy Now
                </Button>

              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailablePage;
