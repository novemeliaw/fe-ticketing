import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from './navbar';
import axios from 'axios';

const LandingPage = () => {
    const [concertsData, setConcertsData] = useState([]);
    // const [hotEvents, setHotEvents] = useState([]);
  
    useEffect(() => {
      // Replace with your AWS API endpoint
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
      
      // const fetchHotEventsData = async () => {
      //   try {
      //     const response = await axios.get(hotEventsApiUrl);
      //     const responseData = JSON.parse(response.data.body);
      //     setHotEvents(responseData.hotEvents);
      //   } catch (error) {
      //     console.error('Error fetching hot events data:', error);
      //   }
      // };
  
      fetchConcertsData();
      // fetchHotEventsData();
    }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <div className="w-full h-1/2 overflow-hidden">
        <Carousel showThumbs={false} autoPlay infiniteLoop className="w-full h-full">
          {/* {hotEvents.map((event) => (
            <div key={event.id} className="w-full h-full">
              <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
              <p className="legend">{event.title}</p>
            </div>
          ))} */}
        </Carousel>
      </div>
      
      <div className="flex flex-col items-center min-h-screen p-4">
      <div className="text-3xl font-semibold mt-7">Currently On Sale</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
          {concertsData.map((concert) => (
            <Card className="flex flex-row m-4" key={concert.id} style={{ maxWidth: 600 }}>
              <CardMedia
                component="img"
                sx={{ width: 200 }}
                image="https://via.placeholder.com/150"
                alt={concert.event_name}
              />
              <div className="flex flex-col justify-between w-full">
                <CardContent>
                  <Typography variant="h5">{concert.event_name}</Typography>
                  <Typography variant="subtitle1">{concert.artist}</Typography>
                  <Typography variant="body2">Promoter: {concert.promotor}</Typography>
                  <Typography variant="body2">Seats Available: {concert.avail_seats}</Typography>
                </CardContent>
                <div className="flex justify-end p-2">
                  <Button variant="outlined">Buy Now</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
