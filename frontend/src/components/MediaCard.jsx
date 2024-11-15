import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
//2.2.2 show all presentation
export const MediaCard=(props)=> {
  const allPre=props.presentation ? Object.entries(props.presentation) : [];
  console.log(allPre);
  if(allPre.length===0){
    return null;
  }
  
  //use navigate to direct to detail page
  const navigate = useNavigate();
  const singlePreDetail = (preTitle) => {
    navigate(`/presentation/${preTitle}`);
  };
  //if exist pre, show
  return (
    <div
      id="MediaCard"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px', 
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {allPre.map(([title, presentation]) => (
        <Card
          key={title}
          sx={{
            width: '300px',
            aspectRatio: '2 / 1', 
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '8px',
          }}
        >
          <CardMedia
            sx={{ height: '50%', width: '100%', objectFit: 'cover', borderRadius: '4px' }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: 'clamp(0.9rem, 1vw, 1.2rem)', 
                fontWeight: 'bold',
              }}
            >
              {presentation.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: 'clamp(0.8rem, 0.9vw, 1rem)', 
                color: '#555',
              }}
            >
              {presentation.content ? presentation.content.length : 0} Pages
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              justifyContent: 'center',
            }}
          >
            <Button
              size="small"
              onClick={() => singlePreDetail(title)}
              sx={{
                fontSize: 'clamp(0.7rem, 0.8vw, 0.9rem)', 
              }}
            >
                        Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>

    
  );
}
export default MediaCard;