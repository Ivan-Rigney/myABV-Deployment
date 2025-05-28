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
import { Add as AddIcon, LocationOn, LocalBar, AttachMoney, Restaurant } from '@mui/icons-material';
import { PageLayout } from '../../components/shared/PageLayout';
import { mockBreweries, mockBeers, mockActivities } from '../../data/mockData';
import { CatalogEntryDialog } from '../../components/shared/CatalogEntryDialog';
import Stack from '@mui/material/Stack';
import { Delete as DeleteIcon, Upload as UploadIcon } from '@mui/icons-material';


export const BreweryDetail = (): JSX.Element => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [catalogDialogOpen, setCatalogDialogOpen] = useState(false);
  
  const brewery = mockBreweries.find(b => b.id === Number(id));
  const breweryBeers = mockBeers.filter(beer => beer.brewery === brewery?.name);
  const breweryActivities = mockActivities.filter(
    activity => activity.targetType === 'brewery' && activity.targetId === Number(id)
  );

  if (!brewery) {
    return (
      <PageLayout>
        <Typography>Brewery not found</Typography>
      </PageLayout>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const getPriceRangeText = (range: number) => {
    return '$'.repeat(range);
  };

  const checkIfInCatalog = () => {
    return brewery?.rating >= 4.6 ? true : false
  }

  return (
    <PageLayout>
      {/* Banner Section */}
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
              src={brewery.imageUrl}
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
              {brewery.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
              <Chip icon={<LocationOn />} label={brewery.location} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
              <Chip icon={<LocalBar />} label={`${brewery.beerCount} Beers`} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
              <Chip icon={<AttachMoney />} label={getPriceRangeText(brewery.priceRange)} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
              {brewery.hasKitchen && <Chip icon={<Restaurant />} label="Kitchen Available" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Rating value={brewery.rating} readOnly precision={0.5} />
              <Typography>({brewery.rating})</Typography>
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

      {/* Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Overview" value="overview" />
          <Tab label="Beers" value="beers" />
          <Tab label="Activity" value="activity" />
          <Tab label="Reviews" value="reviews" />
        </Tabs>
      </Box>

      {/* Content */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {activeTab === 'overview' && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>About</Typography>
              <Typography paragraph>
                {brewery.name} is a renowned brewery located in {brewery.location}. Known for their exceptional craft beers
                and innovative brewing techniques, they have established themselves as a leading brewery in the region.
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Location</Typography>
                  <Typography color="text.secondary">{brewery.location}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Rating</Typography>
                  <Typography color="text.secondary">{brewery.rating}/5</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Beer Count</Typography>
                  <Typography color="text.secondary">{brewery.beerCount}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Visit Count</Typography>
                  <Typography color="text.secondary">{brewery.visitCount.toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Price Range</Typography>
                  <Typography color="text.secondary">{getPriceRangeText(brewery.priceRange)}</Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="subtitle2">Kitchen</Typography>
                  <Typography color="text.secondary">{brewery.hasKitchen ? 'Available' : 'Not Available'}</Typography>
                </Grid>
              </Grid>
            </Paper>
          )}

          {activeTab === 'beers' && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Beer List</Typography>
              <List>
                {breweryBeers.map((beer) => (
                  <ListItem
                    key={beer.id}
                    component={Link}
                    to={`/beer/${beer.id}`}
                    sx={{
                      mb: 2,
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'action.hover' },
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar 
                        src={beer.imageUrl} 
                        variant="rounded"
                        sx={{ width: 60, height: 60 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={beer.name}
                      secondary={
                        <>
                          <Typography variant="caption" display="block">
                            {beer.style} • {beer.abv}% ABV • {beer.ibu} IBU
                          </Typography>
                          <Rating value={beer.rating} size="small" readOnly />
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {activeTab === 'activity' && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Recent Activity</Typography>
              <List>
                {breweryActivities.map((activity) => (
                  <ListItem key={activity.id}>
                    <ListItemAvatar>
                      <Avatar src={activity.userAvatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${activity.userName} ${activity.type} ${brewery.name}`}
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
            <Typography variant="h6" gutterBottom>Similar Breweries</Typography>
            <List>
              {mockBreweries.slice(0, 5).map((similarBrewery) => (
                <ListItem
                  key={similarBrewery.id}
                  component={Link}
                  to={`/brewery/${similarBrewery.id}`}
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
                      src={similarBrewery.imageUrl} 
                      variant="rounded"
                      sx={{ width: 60, height: 60 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={similarBrewery.name}
                    secondary={
                      <>
                        <Typography variant="caption" display="block">
                          {similarBrewery.location}
                        </Typography>
                        <Rating value={similarBrewery.rating} size="small" readOnly />
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
        type="brewery"
        itemName={brewery.name}
      />
    </PageLayout>
  );
};