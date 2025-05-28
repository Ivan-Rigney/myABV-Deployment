import React from 'react'
import { Box, Typography, List, ListItem, Rating, Divider } from '@mui/material'
import { Beer, Brewery } from '../../data/mockData'
import { Link } from 'react-router-dom'

interface CatalogListProps {
  items: (Beer | Brewery)[]
  type: 'beers' | 'breweries'
  viewMode: 'all' | 'tried' | 'bucketlist'
  triedRef: React.RefObject<HTMLDivElement>
  plannedRef: React.RefObject<HTMLDivElement>
}

const ImageStyle = {
  width: 100,
  height: 100,
  borderRadius: 1,
  objectFit: 'cover',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}

export const CatalogList = ({
  items,
  type,
  viewMode,
  triedRef,
  plannedRef,
}: CatalogListProps): JSX.Element => {
  // Split items into tried/visited and planned
  const triedItems = items.filter((item) => (item?.rating || 0) >= 4.6) // Simulated tried/visited status
  const plannedItems = items.filter((item) => !triedItems.includes(item))

  const renderItem = (item: Beer | Brewery) => (
    // Beer / Brewery List Entry
    <ListItem
      key={item.id}
      component={Link}
      to={`/${type === 'beers' ? 'beer' : 'brewery'}/${item.id}`}
      variant={'catalog'}
      sx={{
        mb: 2,
        // p: 3,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Image */}
        <Box component='img' src={item.imageUrl} sx={ImageStyle} />

        {/* Name */}
        <Box>
          <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
            {item.name}
          </Typography>

          {/* Subtext */}
          <Typography
            variant='body2'
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            {type === 'beers'
              ? `${(item as Beer).brewery} • ${(item as Beer).style} • ${
                  (item as Beer).abv
                }% ABV • ${(item as Beer).ibu} IBU`
              : `${(item as Brewery).location} • ${'$'.repeat(
                  (item as Brewery).priceRange
                )}`}
          </Typography>
        </Box>
      </Box>

      {/* Ratings */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Stars */}
        <Rating
          value={item.rating}
          readOnly
          precision={0.5}
          sx={{ color: '#FFD700' }}
        />

        {/* Out of 5 Rating */}
        <Typography variant='body2' sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          {item.rating}/5
        </Typography>
      </Box>
    </ListItem>
  )

  // Render page to only Tried
  if (viewMode === 'tried') {
    return (
      <Box ref={triedRef}>
        <Typography variant='h6' gutterBottom>
          {type === 'beers' ? 'Tried Beers' : 'Visited Breweries'}
        </Typography>
        <List>{triedItems.map(renderItem)}</List>
      </Box>
    )
  }

  // Render page to only bucketlist
  if (viewMode === 'bucketlist') {
    return (
      <Box ref={plannedRef}>
        <Typography variant='h6' gutterBottom>
          {type === 'beers' ? 'Beer Bucketlist' : 'Brewery Bucketlist'}
        </Typography>
        <List>{plannedItems.map(renderItem)}</List>
      </Box>
    )
  }

  // Render both
  return (
    <>
      <Box ref={triedRef}>
        <Typography variant='h6' gutterBottom>
          {type === 'beers' ? 'Tried Beers' : 'Visited Breweries'}
        </Typography>
        <List>{triedItems.map(renderItem)}</List>
      </Box>

      <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      <Box ref={plannedRef}>
        <Typography variant='h6' gutterBottom>
          {type === 'beers' ? 'Beer Bucketlist' : 'Brewery Bucketlist'}
        </Typography>
        <List>{plannedItems.map(renderItem)}</List>
      </Box>
    </>
  )
}
