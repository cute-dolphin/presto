import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//2.2.2 show all presentation
export const MediaCard=(props)=> {
  const allPre=props.presentation ? Object.entries(props.presentation) : [];
  console.log(allPre);
  if(allPre.length===0){
    return null;
  }
  //if exist pre, show
  return (
    <div>
        {allPre.map(([id,presentation])=>(
            <Card key={id} sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {presentation.title}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
            </Card>
        ))}
    </div>
    
  );
}
export default MediaCard;