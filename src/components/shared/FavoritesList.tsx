import React from 'react'
import { Grid } from '@mui/material'
import { Beer, Brewery } from '../../data/mockData'
import { ItemCard } from './ItemCard'

interface FavoritesListProps {
  items: (Beer | Brewery)[]
  limit?: number
  type: 'beers' | 'breweries'
}

export const FavoritesList = ({
  items,
  limit = 6,
  type,
}: FavoritesListProps): JSX.Element => {
  return (
    <Grid container spacing={2}>
      {items.slice(0, limit).map((item) => (
        <Grid item xs={4} key={item.id}>
          <ItemCard item={item} type={type} height={160} />
        </Grid>
      ))}
    </Grid>
  )
}
