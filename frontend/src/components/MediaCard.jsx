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
    <div>
        {allPre.map(([title,presentation])=>(
            <Card key={title} sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {presentation.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                {presentation.content ? presentation.content.length : 0} Pages
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>singlePreDetail(title)}>Learn More</Button>
            </CardActions>
            </Card>
        ))}
    </div>
    
  );
}
export default MediaCard;