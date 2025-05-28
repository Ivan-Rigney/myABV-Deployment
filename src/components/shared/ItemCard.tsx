import { Box, Card, Typography, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { Beer, Brewery } from '../../data/mockData';

interface ItemCardProps {
  item: Beer | Brewery;
  type: 'beers' | 'breweries';
  height?: number;
}

export const ItemCard = ({ item, type, height = 160 }: ItemCardProps): JSX.Element => {
  // determine if type is beers, or brewery so that appropriate info can be displayed
  const isBeer = type === 'beers';
  
  return (
    // create a card for either a beer or brewery
    <Card
      component={Link}
      to={`/${isBeer ? 'beer' : 'brewery'}/${item.id}`}
      sx={{
        display: 'flex',
        height,
        '&:hover': {
          transform: 'translateY(-4px)',
          '& .hover-content': {
            opacity: 1,
          }
        }
      }}
    >
      {/* image properties inside card */}
      <Box
        className="image-container"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${item.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* additional information text above picture on hover; hidden by default --> opacity = 0  */}
      <Box
        className="hover-content"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1,
          p: 1.5,
          willChange: 'opacity',
          backdropFilter: 'blur(4px)',
          height:55
        }}
      >
        {/* content inside the additional information above picture on hover */}
        <Box sx={{display: 'flex', justifyContent: "center", gap:0.25}}>
          <Rating value={item.rating} readOnly size="small" sx={{ color: 'yellow' }} />
          <Typography variant="caption">{item.rating}</Typography>
        </Box>
        <Typography variant="caption" sx={{ textAlign:"center", display: 'block'}}>
          {isBeer ? `${(item as Beer).brewery}` : `${(item as Brewery).location}`}
        </Typography>

      </Box>

      {/* bottom content description */}
      <Box
        className="bottom-content"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          p: 1,
          backdropFilter: 'blur(4px)',
        }}
      >
        <Typography variant="body2" noWrap sx={{textAlign:"center", fontWeight: 500 }}>{item.name}</Typography>
      </Box>
    </Card>
  );
};