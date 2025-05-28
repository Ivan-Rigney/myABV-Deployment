import React, { useEffect, useRef } from 'react'
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Button,
  Stack,
} from '@mui/material'
import { LineChart } from '@mui/x-charts/LineChart'
import { BarChart } from '@mui/x-charts/BarChart'
import {
  mockBeers,
  mockBreweries,
  mockActivities,
  mockGrowthData,
  mockDistribution,
} from '../../data/mockData'
import { useLocation } from 'react-router-dom'
import { PageLayout } from '../../components/shared/PageLayout'
import { CatalogList } from '../../components/shared/CatalogList'
import { FilterSidebar } from '../../components/shared/FilterSidebar'
import { ActivityList } from '../../components/shared/ActivityList'
import { FavoritesList } from '../../components/shared/FavoritesList'

export const Profile = (): JSX.Element => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const tabFromUrl = searchParams.get('tab')
  const [activeTab, setActiveTab] = React.useState(tabFromUrl || 'overview')
  const [sortBy, setSortBy] = React.useState('name')
  const [direction, setDirection] = React.useState(1)
  const [filterStyle, setFilterStyle] = React.useState('all')
  const [filterLocation, setFilterLocation] = React.useState('all')
  const [minRating, setMinRating] = React.useState('0')
  const [viewMode, setViewMode] = React.useState<
    'all' | 'tried' | 'bucketlist'
  >('all')
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])

  const triedRef = useRef<HTMLDivElement>(null)
  const plannedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl)
    }
  }, [tabFromUrl])

  const stats = {
    beers: {
      total: 150,
      unique: 75,
      avgRating: 4.2,
      pintsDrank: 200,
      percentile: 90,
    },
    breweries: {
      visited: 30,
      avgRating: 4.5,
      totalVisits: 45,
      percentile: 90,
    },
  }

  const bioText =
    "Beer enthusiast and craft brewery explorer. Always looking for new and interesting brews to try! Here is the same info again for testing. Beer enthusiast and craft brewery explorer. Always looking for new and interesting brews to try! Let's double it again. Beer enthusiast and craft brewery explorer. Always looking for new and interesting brews to try! Here is the same info again for testing. Beer enthusiast and craft brewery explorer. Always looking for new and interesting brews to try!"

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
  }

  const styles = mockBeers
    ? Array.from(new Set(mockBeers.map((beer) => beer.style)))
    : []
  const locations = mockBreweries
    ? Array.from(new Set(mockBreweries.map((brewery) => brewery.location)))
    : []
  const customTags = [
    'Want to Try',
    'Local Spots',
    'Special Occasions',
    'Hidden Gems',
  ]

  const handleScrollTo = (section: 'tried' | 'bucketlist') => {
    const ref = section === 'tried' ? triedRef : plannedRef
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filterAndSortItems = (type: 'beers' | 'breweries') => {
    let items = type === 'beers' ? mockBeers : mockBreweries

    // Apply filters
    items = items.filter((item) => {
      // const meetsRatingCriteria = (item.rating || 0) >= Number(minRating)
      const meetsTagCriteria = true // Tag filtering requires there to be data for individual list entries, will be deferred to when backend is designed
      const meetsStyleOrLocation =
        type === 'beers'
          ? filterStyle === 'all' ||
            (item as (typeof mockBeers)[0]).style === filterStyle
          : filterLocation === 'all' ||
            (item as (typeof mockBreweries)[0]).location === filterLocation

      return meetsTagCriteria && meetsStyleOrLocation
    })

    // Apply sorting
    return items.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name) * direction

        case 'rating':
          return ((b.rating || 0) - (a.rating || 0)) * direction

        case 'abv':
          return ((b.abv || 0) - (a.abv || 0)) * direction

        case 'ibu':
          return ((b.ibu || 0) - (a.ibu || 0)) * direction

        case 'price':
          return ((b.priceRange || 0) - (a.priceRange || 0)) * direction

        case 'beerCount':
          return ((b.beerCount || 0) - (a.beerCount || 0)) * direction

        case 'popularity':
          return type === 'beers'
            ? ((b.catalogEntries || 0) - (a.catalogEntries || 0)) * direction
            : ((b.visitCount || 0) - (a.visitCount || 0)) * direction
      }

      console.log('Sort case exited without valid option. Defaulting to name.')
      setSortBy('name')
      return 0
    })
  }

  const swapDirection = () => {
    setDirection(direction * -1)
  }

  // Catalog Content  - All code for rendering the catalog is currently within the
  //                    Profile page. It is working, but we may want to look at
  //                    consolidating it into larger components and just calling those.
  const renderCatalogLayout = (type: 'beers' | 'breweries') => {
    const filteredAndSortedItems = filterAndSortItems(type)

    return (
      // Overall Catalog Container
      <Grid container spacing={3}>
        {/* Filter Card */}
        <Grid item xs={12} md={3}>
          <FilterSidebar
            type={type}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterValue={type === 'beers' ? filterStyle : filterLocation}
            setFilterValue={
              type === 'beers' ? setFilterStyle : setFilterLocation
            }
            filterOptions={type === 'beers' ? styles : locations}
            minRating={minRating}
            setMinRating={setMinRating}
            customTags={customTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onScrollTo={handleScrollTo}
            swapDirection={swapDirection}
          />
        </Grid>

        {/* Catalog Contents Card */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' gutterBottom>
              Catalog
            </Typography>
            <CatalogList
              items={filteredAndSortedItems}
              type={type}
              viewMode={viewMode}
              triedRef={triedRef}
              plannedRef={plannedRef}
            />
          </Paper>
        </Grid>
      </Grid>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      // Beer Catalog @ Profile
      case 'beers':
        return renderCatalogLayout('beers')

      // Brewery Catalog @ Profile
      case 'breweries':
        return renderCatalogLayout('breweries')

      // Stats Page @ Profile
      case 'stats':
        return (
          <Grid container spacing={3}>
            {/* Beer Stats */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                {/* Title */}
                <Typography variant='h6' gutterBottom>
                  Beer Stats
                </Typography>

                {/* Content Box */}
                <Box sx={{ mt: 2 }}>
                  {/* Text Content */}
                  <Box>
                    <Typography>Total Beers: {stats.beers.total}</Typography>
                    <Typography>Unique Beers: {stats.beers.unique}</Typography>
                    <Typography>
                      Average Rating: {stats.beers.avgRating}
                    </Typography>
                    <Typography>
                      Pints Drank: {stats.beers.pintsDrank}
                    </Typography>
                    <Typography>
                      Drinker Percentile: {stats.beers.percentile}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Beer Graph Card */}
              <Paper sx={{ p: 3, mt: 3 }}>
                {/* Title */}
                <Typography variant='h6' gutterBottom>
                  Beer Graphs
                </Typography>

                {/* Beer Growth Graph */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant='subtitle1' gutterBottom>
                    Beers Growth
                  </Typography>
                  <LineChart
                    series={[
                      {
                        data: mockGrowthData.beers.map((d) => d.count),
                        label: 'Beers',
                        color: '#2196F3',
                      },
                    ]}
                    xAxis={[
                      {
                        data: mockGrowthData.beers.map((d) => d.month),
                        scaleType: 'band',
                      },
                    ]}
                    sx={{
                      '.MuiLineElement-root': {
                        strokeWidth: 2,
                      },
                      '.MuiMarkElement-root': {
                        stroke: '#fff',
                        scale: '1',
                      },
                      '.MuiChartsAxis-tickLabel': {
                        fill: 'rgba(255, 255, 255, 0.7)',
                      },
                      '.MuiChartsAxis-line': {
                        stroke: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  />
                </Box>

                {/* Beer Rating Dist */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant='subtitle1' gutterBottom>
                    Rating Distribution
                  </Typography>
                  <BarChart
                    series={[
                      {
                        data: mockDistribution.beers.map((d) => d.count),
                        label: 'Beers',
                        color: '#2196F3',
                      },
                    ]}
                    xAxis={[
                      {
                        data: mockDistribution.beers.map((d) => d.rating),
                        scaleType: 'band',
                      },
                    ]}
                    sx={{
                      '.MuiBarElement-root': {
                        borderRadius: '4px',
                      },
                      '.MuiChartsAxis-tickLabel': {
                        fill: 'rgba(255, 255, 255, 0.7)',
                      },
                      '.MuiChartsAxis-line': {
                        stroke: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Brewery Stats */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                {/* Title */}
                <Typography variant='h6' gutterBottom>
                  Brewery Stats
                </Typography>

                {/* Brewery Content Box */}
                <Box sx={{ mt: 2 }}>
                  {/* Text Content */}
                  <Box>
                    <Typography>
                      Breweries Visited: {stats.breweries.visited}
                    </Typography>
                    <Typography>
                      Total Visits: {stats.breweries.totalVisits}
                    </Typography>
                    <Typography>
                      Average Rating: {stats.breweries.avgRating}
                    </Typography>
                    <Typography>
                      Visiter Percentile: {stats.breweries.percentile}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Brewery Graphs Card */}
              <Paper sx={{ p: 3, mt: 3 }}>
                {/* Title */}
                <Typography variant='h6' gutterBottom>
                  Brewery Graphs
                </Typography>
                {/* Brewery Growth Graph */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant='subtitle1' gutterBottom>
                    Breweries Visited
                  </Typography>
                  <LineChart
                    series={[
                      {
                        data: mockGrowthData.breweries.map((d) => d.count),
                        label: 'Breweries',
                        color: '#4CAF50',
                      },
                    ]}
                    xAxis={[
                      {
                        data: mockGrowthData.breweries.map((d) => d.month),
                        scaleType: 'band',
                      },
                    ]}
                    sx={{
                      '.MuiLineElement-root': {
                        strokeWidth: 2,
                      },
                      '.MuiMarkElement-root': {
                        stroke: '#fff',
                        scale: '1',
                      },
                      '.MuiChartsAxis-tickLabel': {
                        fill: 'rgba(255, 255, 255, 0.7)',
                      },
                      '.MuiChartsAxis-line': {
                        stroke: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  />
                </Box>

                {/* Brewery Rating Dist */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant='subtitle1' gutterBottom>
                    Rating Distribution
                  </Typography>
                  <BarChart
                    series={[
                      {
                        data: mockDistribution.breweries.map((d) => d.count),
                        label: 'Breweries',
                        color: '#4CAF50',
                      },
                    ]}
                    xAxis={[
                      {
                        data: mockDistribution.breweries.map((d) => d.rating),
                        scaleType: 'band',
                      },
                    ]}
                    sx={{
                      '.MuiBarElement-root': {
                        borderRadius: '4px',
                      },
                      '.MuiChartsAxis-tickLabel': {
                        fill: 'rgba(255, 255, 255, 0.7)',
                      },
                      '.MuiChartsAxis-line': {
                        stroke: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )
      default:
        return (
          <Grid container spacing={3}>
            <Grid item xs={4} md={4}>
              {/* Bio Card */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant='h6' gutterBottom>
                  Bio
                </Typography>
                <Typography>{bioText}</Typography>
              </Paper>

              {/* Overall Favorites Card */}
              <Paper sx={{ p: 3 }}>
                <Typography variant='h6' gutterBottom>
                  Favorites
                </Typography>

                {/* Favorite Breweries */}
                <Stack
                  direction='row'
                  spacing={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    mt: 3,
                  }}
                >
                  <Typography variant='subtitle1' sx={{ mt: 3, mb: 2 }}>
                    Favorite Breweries
                  </Typography>
                  <Button
                    variant='contained'
                    size='small'
                    href='/profile?tab=breweries'
                  >
                    Go to Brewery Catalog
                  </Button>
                </Stack>

                <FavoritesList items={mockBreweries} type='breweries' />

                {/* Favorite Beers */}
                <Stack
                  direction='row'
                  spacing={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    mt: 3,
                  }}
                >
                  <Typography variant='subtitle1' sx={{ mt: 3, mb: 2 }}>
                    Favorite Beers
                  </Typography>
                  <Button
                    variant='contained'
                    size='small'
                    href='/profile?tab=beers'
                  >
                    Go to Beer Catalog
                  </Button>
                </Stack>

                <FavoritesList items={mockBeers} type='beers' />
              </Paper>
            </Grid>

            {/* Stats & Activity Section */}
            <Grid item xs={8} md={8}>
              {/* Stats Cards */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* Beer Stats */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    {/* Title */}
                    <Typography variant='h6' gutterBottom>
                      Beer Stats Overview
                    </Typography>

                    {/* Content Box */}
                    <Box sx={{ mt: 2 }}>
                      <Typography>Beers Tried: {stats.beers.unique}</Typography>
                      <Typography>
                        Pints Drank: {stats.beers.pintsDrank}
                      </Typography>
                      <Typography>
                        Average Score: {stats.beers.avgRating}
                      </Typography>
                      <Typography>
                        Drinker Percentile: {stats.beers.percentile}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>

                {/* Brewery Stats */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    {/* Title */}
                    <Typography variant='h6' gutterBottom>
                      Brewery Stats Overview
                    </Typography>

                    {/* Content Box */}
                    <Box sx={{ mt: 2 }}>
                      <Typography>
                        Breweries Visited: {stats.breweries.visited}
                      </Typography>
                      <Typography>
                        Total Visits: {stats.breweries.totalVisits}
                      </Typography>
                      <Typography>
                        Average Score: {stats.breweries.avgRating}
                      </Typography>
                      <Typography>
                        Visiter Percentile: {stats.breweries.percentile}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              {/* Recent Actvity Card */}
              <Paper sx={{ p: 3 }}>
                <Typography variant='h6' gutterBottom>
                  Recent Activity
                </Typography>
                <ActivityList
                  activities={mockActivities}
                  beers={mockBeers}
                  breweries={mockBreweries}
                  nameOveride='You'
                />
              </Paper>
            </Grid>
          </Grid>
        )
    }
  }

  return (
    <PageLayout>
      {/* Profile Avatar + Banner */}
      <Box
        sx={{
          height: 300,
          background:
            'linear-gradient(to bottom, rgba(33, 150, 243, 0.3), rgba(33, 150, 243, 0.1))',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          p: 3,
          mt: -3,
          mb: 3,
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Avatar
          sx={{
            width: 150,
            height: 150,
            border: '4px solid rgba(255, 255, 255, 0.1)',
            mb: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          }}
          src='/generic-avatar.svg'
        />
      </Box>

      {/* Page Tabs & Content */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          mb: 3,
        }}
      >
        <Container maxWidth='xl'>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: '#2196F3',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#2196F3',
              },
            }}
          >
            <Tab label='Overview' value='overview' />
            <Tab label='Beer Catalog' value='beers' />
            <Tab label='Brewery Catalog' value='breweries' />
            <Tab label='Stats' value='stats' />
          </Tabs>
        </Container>
      </Box>

      {renderTabContent()}
    </PageLayout>
  )
}
