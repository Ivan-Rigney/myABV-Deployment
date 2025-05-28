import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Rating,
  Button,
  Tabs,
  Tab,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@mui/material';
import { Add as AddIcon, LocalBar, LocalDrink, Whatshot } from '@mui/icons-material';
import { PageLayout } from '../../components/shared/PageLayout';
import { mockBeers, mockActivities } from '../../data/mockData';
import { CatalogEntryDialog } from '../../components/shared/CatalogEntryDialog';
import Stack from '@mui/material/Stack';
import { Delete as DeleteIcon, Upload as UploadIcon } from '@mui/icons-material';

export const BeerDetail = (): JSX.Element => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [catalogDialogOpen, setCatalogDialogOpen] = useState(false);
  
  const beer = mockBeers.find(b => b.id === Number(id));
  const beerActivities = mockActivities.filter(
    activity => activity.targetType === 'beer' && activity.targetId === Number(id)
  );

  if (!beer) {
    return (
      <PageLayout>
        <Typography>Beer not found</Typography>
      </PageLayout>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const checkIfInCatalog = () => {
    return beer?.rating >= 4.6 ? true : false
  }

  return (
    <PageLayout>
      <Box
        sx={{
          height: 400,
          bgcolor: '#2B2D42',
        }}
      >
        <Grid container sx={{ p: 4 }} alignItems="center">
          <Grid item xs={12} md={3}>
            <Box
              component="img"
              src={beer.imageUrl}
              sx={{
                width: '100%',
                height: 300,
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
          <Grid item xs={12} md={9} sx={{ pl: { md: 4 } }}>
            <Typography variant="h3" gutterBottom>
              {beer.name}
            </Typography>
            <Typography variant="h5" gutterBottom component={Link} to={`/brewery/${1}`} sx={{ color: 'inherit', textDecoration: 'none' }}>
              {beer.brewery}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Chip icon={<LocalBar />} label={`${beer.abv}% ABV`} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
              <Chip icon={<LocalDrink />} label={`${beer.ibu} IBU`} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
              <Chip icon={<Whatshot />} label={`${beer.catalogEntries.toLocaleString()} Catalog Entries`} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Rating value={beer.rating} readOnly precision={0.5} />
              <Typography>({beer.rating})</Typography>
            </Box>
            {checkIfInCatalog() ?
              <Stack direction="row">
                <Button
                  className="inCatalog"
                  variant="contained"
                  sx={{ mr: 2}}
                  >
                  Already in Catalog
                </Button>
                <IconButton>
                  <DeleteIcon color="error" />
                </IconButton>
              </Stack>
                      :
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mr: 2 }}
                onClick={() => setCatalogDialogOpen(true)}
                >
                Add to Catalog
              </Button>
            }

          </Grid>
        </Grid>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Overview" value="overview" />
          <Tab label="Activity" value="activity" />
          <Tab label="Reviews" value="reviews" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {activeTab === 'overview' && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Description</Typography>
              <Typography paragraph>
                A delightful craft beer that showcases the best of {beer.style}. This beer from {beer.brewery} 
                features a perfect balance of flavors and a {beer.abv}% ABV that makes it a favorite among enthusiasts.
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Style</Typography>
                  <Typography color="text.secondary">{beer.style}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">ABV</Typography>
                  <Typography color="text.secondary">{beer.abv}%</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">IBU</Typography>
                  <Typography color="text.secondary">{beer.ibu}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Rating</Typography>
                  <Typography color="text.secondary">{beer.rating}/5</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Brewery</Typography>
                  <Typography color="text.secondary">{beer.brewery}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Catalog Entries</Typography>
                  <Typography color="text.secondary">{beer.catalogEntries.toLocaleString()}</Typography>
                </Grid>
              </Grid>
            </Paper>
          )}

          {activeTab === 'activity' && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Recent Activity</Typography>
              <List>
                {beerActivities.map((activity) => (
                  <ListItem key={activity.id}>
                    <ListItemAvatar>
                      <Avatar src={activity.userAvatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${activity.userName} ${activity.type} ${beer.name}`}
                      secondary={
                        <>
                          {activity.rating && <Rating value={activity.rating} size="small" readOnly />}
                          <Typography variant="caption" display="block">{activity.date}</Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {activeTab === 'reviews' && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Reviews</Typography>
              <List>
                  <ListItem>User 1 left a review...</ListItem>
                  <ListItem>User 2 left a review...</ListItem>
                  <ListItem>User 3 left a review...</ListItem>
                  <ListItem><Button variant="contained">Leave a Review</Button></ListItem>
              </List>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Similar Beers</Typography>
            <List>
              {mockBeers.slice(0, 5).map((similarBeer) => (
                <ListItem
                  key={similarBeer.id}
                  component={Link}
                  to={`/beer/${similarBeer.id}`}
                  sx={{
                    mb: 1,
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'action.hover' },
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      src={similarBeer.imageUrl} 
                      variant="rounded"
                      sx={{ width: 60, height: 60 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={similarBeer.name}
                    secondary={
                      <>
                        <Typography variant="caption" display="block">
                          {similarBeer.brewery} • {similarBeer.style}
                        </Typography>
                        <Rating value={similarBeer.rating} size="small" readOnly />
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <CatalogEntryDialog
        open={catalogDialogOpen}
        onClose={() => setCatalogDialogOpen(false)}
        type="beer"
        itemName={beer.name}
      />
    </PageLayout>
  );
};