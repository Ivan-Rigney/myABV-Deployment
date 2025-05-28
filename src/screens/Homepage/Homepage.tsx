import {
  Container,
  Button,
  Grid,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Paper,
  Typography,
} from '@mui/material'
import { mockActivities, mockBeers, mockBreweries } from '../../data/mockData'
import { ItemCard } from '../../components/shared/ItemCard'
import { PageLayout } from '../../components/shared/PageLayout'
import Stack from '@mui/material/Stack'
import { ActivityList } from '../../components/shared/ActivityList'

export const Homepage = (): JSX.Element => {
  return (
    // insert page layout component and populate with children elements
    <PageLayout>
      <Grid container spacing={10}>
        {/* Activity Feed */}
        <Grid item xs={12} md={7}>
          <Paper
            sx={{
              p: 3,
            }}
          >
            {/* activity feed title */}
            <Typography variant='h6' sx={{ mb: 3 }}>
              Activity Feed
            </Typography>
            {/* iterate through mock data */}
            <ActivityList
              activities={mockActivities}
              beers={mockBeers}
              breweries={mockBreweries}
              nameOveride=''
            />
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={5}>
          {/* Beer Bucket List */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Stack
              direction='row'
              spacing={3}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant='h6'>Beer Bucket List</Typography>
              <Button
                variant='contained'
                size='small'
                href='/profile?tab=beers'
              >
                Go to Beer Catalog
              </Button>
            </Stack>
            <Grid container spacing={2}>
              {mockBeers.slice(0, 8).map((beer) => (
                <Grid item xs={6} sm={4} key={beer.id}>
                  <ItemCard item={beer} type='beers' height={160} />
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Brewery Bucket List */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Stack
              direction='row'
              spacing={3}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant='h6'>Brewery Bucket List</Typography>
              <Button
                variant='contained'
                size='small'
                href='/profile?tab=breweries'
              >
                Go to Brewery Catalog
              </Button>
            </Stack>
            <Grid container spacing={2}>
              {mockBreweries.slice(0, 8).map((brewery) => (
                <Grid item xs={6} sm={4} key={brewery.id}>
                  <ItemCard item={brewery} type='breweries' height={160} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </PageLayout>
  )
}
