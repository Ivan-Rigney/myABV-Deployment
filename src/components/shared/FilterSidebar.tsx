import React, { useState } from 'react'
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Chip,
  Button,
  Divider,
  Slider,
  Popover,
  IconButton,
  Fade,
  Stack,
} from '@mui/material'
import {
  FilterList as FilterListIcon,
  Close as CloseIcon,
  SwapVert as SwapVert,
} from '@mui/icons-material'
interface FilterSidebarProps {
  type: 'beers' | 'breweries'
  sortBy: string
  setSortBy: (value: string) => void
  filterValue: string
  setFilterValue: (value: string) => void
  filterOptions: string[]
  minRating: string
  setMinRating: (value: string) => void
  customTags: string[]
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
  viewMode: 'all' | 'tried' | 'bucketlist'
  setViewMode: (mode: 'all' | 'tried' | 'bucketlist') => void
  onScrollTo: (section: 'tried' | 'bucketlist') => void
  swapDirection: () => void
}

export const FilterSidebar = ({
  type,
  sortBy,
  setSortBy,
  filterValue,
  setFilterValue,
  filterOptions,
  // minRating,
  // setMinRating,
  customTags,
  selectedTags,
  setSelectedTags,
  viewMode,
  setViewMode,
  onScrollTo,
  swapDirection,
}: FilterSidebarProps): JSX.Element => {
  const CatChipStyle = (option: string) => ({
    color: 'white',
    bgcolor:
      filterValue === option ? 'primary.main' : 'rgba(255, 255, 255, 0.1)',
    '&:hover': {
      bgcolor:
        filterValue === option ? 'primary.dark' : 'rgba(255, 255, 255, 0.2)',
    },
  })

  const TagChipStyle = (tag: string) => ({
    color: 'white',
    bgcolor: selectedTags.includes(tag)
      ? 'primary.main'
      : 'rgba(255, 255, 255, 0.1)',
    '&:hover': {
      bgcolor: selectedTags.includes(tag)
        ? 'primary.dark'
        : 'rgba(255, 255, 255, 0.2)',
    },
  })

  const [tagAnchorEl, setTagAnchorEl] = useState<null | HTMLElement>(null)
  // const [ratingRange, setRatingRange] = useState<number[]>([0, 5])
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)

  const handleTagClick = (event: React.MouseEvent<HTMLElement>) => {
    setTagAnchorEl(event.currentTarget)
  }

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleTagClose = () => {
    setTagAnchorEl(null)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((g) => g !== tag) : [...prev, tag]
    )
  }

  // const handleRatingChange = (event: Event, newValue: number | number[]) => {
  //   setRatingRange(newValue as number[])
  //   setMinRating(String((newValue as number[])[0]))
  // }

  return (
    // Overall Paper Card
    <Paper
      sx={{
        p: 3,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Typography variant='h6' gutterBottom>
        Filters
      </Typography>

      {/* Tried/Planning Select Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant='subtitle2' gutterBottom>
          View
        </Typography>

        {/* Tried/Planning Select Filter */}
        <FormControl fullWidth size='small'>
          <Select
            value={viewMode}
            onChange={(e) =>
              setViewMode(e.target.value as 'all' | 'tried' | 'bucketlist')
            }
          >
            <MenuItem value='all'>All Items</MenuItem>
            <MenuItem value='tried'>
              {type === 'beers' ? 'Tried' : 'Visited'}
            </MenuItem>
            <MenuItem value='bucketlist'>Bucketlist</MenuItem>
          </Select>
        </FormControl>

        {/* Tried/Planning Scroll Buttons */}
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            size='small'
            variant='outlined'
            onClick={() => onScrollTo('tried')}
          >
            Scroll to {type === 'beers' ? 'Tried' : 'Visited'}
          </Button>
          <Button
            size='small'
            variant='outlined'
            onClick={() => onScrollTo('bucketlist')}
          >
            Scroll to Bucketlist
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Sort By Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant='subtitle2' gutterBottom>
          Sort By
        </Typography>

        <Stack direction='row'>
          {/* Select */}
          <FormControl sx={{ width: '90%' }} size='small'>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value='name'>Name</MenuItem>
              <MenuItem value='rating'>Rating</MenuItem>
              <MenuItem value='popularity'>Popularity</MenuItem>
              {type === 'beers' && [
                <MenuItem value='abv'>ABV</MenuItem>,
                <MenuItem value='ibu'>IBU</MenuItem>,
              ]}
              {type === 'breweries' && [
                <MenuItem value='beerCount'>Beer Count</MenuItem>,
                <MenuItem value='price'>Price</MenuItem>,
              ]}
            </Select>
          </FormControl>
          <Button
            sx={{ color: 'white', width: 'auto' }}
            startIcon={<SwapVert />}
            onClick={swapDirection}
          />
        </Stack>
      </Box>

      {/* Category Filter */}
      <Box sx={{ mb: 3 }}>
        <Typography variant='subtitle2' gutterBottom>
          Categories
        </Typography>

        {/* Category Button */}
        <Button
          fullWidth
          variant='outlined'
          onClick={handleFilterClick}
          startIcon={<FilterListIcon />}
          sx={{
            justifyContent: 'flex-start',
          }}
        >
          {filterValue === 'all'
            ? `Select ${type === 'beers' ? 'Style' : 'Location'}`
            : filterValue}
        </Button>

        {/* Category Pop up */}
        <Popover
          open={Boolean(filterAnchorEl)}
          anchorEl={filterAnchorEl}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              maxHeight: 300,
              width: 250,
            },
          }}
        >
          {/* Pop Up Options */}
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                label={`All ${type === 'beers' ? 'Styles' : 'Locations'}`}
                onClick={() => {
                  setFilterValue('all')
                  handleFilterClose()
                }}
                sx={CatChipStyle('all')}
              />
              {filterOptions.map((option) => (
                <Chip
                  key={option}
                  label={option}
                  onClick={() => {
                    setFilterValue(option)
                    handleFilterClose()
                  }}
                  sx={CatChipStyle(option)}
                />
              ))}
            </Box>
          </Box>
        </Popover>
      </Box>

      {/* Rating Filter - Presence in final version currently up in air. Need to talk about necessity. */}
      {/* <Box sx={{ mb: 3 }}>
        <Typography variant='subtitle2' gutterBottom>
          Rating: {ratingRange[0]} - {ratingRange[1]}
        </Typography>
        <Slider
          value={ratingRange}
          onChange={handleRatingChange}
          valueLabelDisplay='auto'
          min={0}
          max={5}
          step={0.5}
          sx={{
            color: '#2196F3',
            '& .MuiSlider-thumb': {
              boxShadow: '0 0 0 8px rgba(33, 150, 243, 0.16)',
            },
          }}
        />
      </Box> */}

      {/* Custom Tag Selection */}
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant='subtitle2' gutterBottom>
            Custom Tags{' '}
            {selectedTags.length > 0 && `(${selectedTags.length} selected)`}
          </Typography>

          {/* Custom Tag Button */}
          <Button
            fullWidth
            onClick={handleTagClick}
            startIcon={<FilterListIcon />}
            variant={'outlined'}
            sx={{
              justifyContent: 'flex-start',
            }}
          >
            Select Tags
          </Button>
        </Box>

        {/* Selected Tag Visualizations */}
        {selectedTags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {selectedTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleTagToggle(tag)}
                sx={{
                  color: 'white',
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              />
            ))}
          </Box>
        )}

        {/* Custom Tag Pop Up */}
        <Popover
          open={Boolean(tagAnchorEl)}
          anchorEl={tagAnchorEl}
          onClose={handleTagClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              maxHeight: 300,
              width: 250,
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                key={'favorites'}
                label={'Favorites'}
                onClick={() => handleTagToggle('favorites')}
                sx={TagChipStyle('favorites')}
              />
              {customTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => handleTagToggle(tag)}
                  sx={TagChipStyle(tag)}
                />
              ))}
            </Box>
          </Box>
        </Popover>
      </Box>
    </Paper>
  )
}
