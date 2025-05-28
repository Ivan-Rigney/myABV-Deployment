import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Slider,
  Chip,
  IconButton,
  Popover,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Close as CloseIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { Header } from '../../components/Header/Header';
import { mockBeers, mockBreweries, Beer, Brewery } from '../../data/mockData';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ItemCard } from '../../components/shared/ItemCard';
import { PageLayout } from '../../components/shared/PageLayout';

export const Browse = (): JSX.Element => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isBrowsingBeers = location.pathname === '/browse/beers';
  const viewMode = searchParams.get('view') || 'categories';
  
  // Filter states
  const [sortValue, setSortValue] = useState<number>(0);
  const [minRating, setMinRating] = useState<number[]>([0, 5]);
  const [abvRange, setAbvRange] = useState<number[]>([0, 15]);
  const [ibuRange, setIbuRange] = useState<number[]>([0, 100]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [styleAnchorEl, setStyleAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [locationAnchorEl, setLocationAnchorEl] = useState<HTMLElement | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([1, 3]);
  const [beerCountRange, setBeerCountRange] = useState<number[]>([0, 30]);
  const [hasKitchen, setHasKitchen] = useState<boolean | null>(null);
  
  const items = isBrowsingBeers ? mockBeers : mockBreweries;
  const styles = Array.from(new Set(mockBeers.map(beer => beer.style)));
  const locations = Array.from(new Set(mockBreweries.map(brewery => brewery.location)));
  
  const trending = items.slice(0, 6);
  const highestRated = [...items]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 6);
  const allTimePopular = items.slice(0, 6);

  const sortOptions = isBrowsingBeers 
    ? ['Name', 'Rating', 'ABV', 'IBU', 'Popularity', 'Date Added']
    : ['Name', 'Rating', 'Popularity', 'Beer Count', 'Price'];

  const handleSeeMore = (category: string) => {
    let sort = 0;
    switch (category) {
      case 'trending':
        sort = 5;
        break;
      case 'highest-rated':
        sort = 1;
        break;
      case 'popular':
        sort = 2;
        break;
    }
    setSortValue(sort);
    setSearchParams({ view: 'catalog' });
  };

  const filterAndSortItems = () => {
    let filteredItems = [...items];

    if (isBrowsingBeers) {
      filteredItems = (filteredItems as Beer[]).filter(beer => {
        const meetsRating = (beer.rating || 0) >= minRating[0] && (beer.rating || 0) <= minRating[1];
        const meetsAbv = beer.abv >= abvRange[0] && beer.abv <= abvRange[1];
        const meetsIbu = beer.ibu >= ibuRange[0] && beer.ibu <= ibuRange[1];
        const meetsStyle = selectedStyles.length === 0 || selectedStyles.includes(beer.style);
        
        return meetsRating && meetsAbv && meetsIbu && meetsStyle;
      });
    } else {
      filteredItems = (filteredItems as Brewery[]).filter(brewery => {
        const meetsRating = (brewery.rating || 0) >= minRating[0] && (brewery.rating || 0) <= minRating[1];
        const meetsLocation = selectedLocations.length === 0 || selectedLocations.includes(brewery.location);
        const meetsPrice = brewery.priceRange >= priceRange[0] && brewery.priceRange <= priceRange[1];
        const meetsBeerCount = brewery.beerCount >= beerCountRange[0] && brewery.beerCount <= beerCountRange[1];
        const meetsKitchen = hasKitchen === null || brewery.hasKitchen === hasKitchen;
        
        return meetsRating && meetsLocation && meetsPrice && meetsBeerCount && meetsKitchen;
      });
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
      switch (sortValue) {
        case 1: // Rating
          return (b.rating || 0) - (a.rating || 0);
        case 2: // Popularity
          if (isBrowsingBeers) {
            return (b as Beer).catalogEntries - (a as Beer).catalogEntries;
          }
          return (b as Brewery).visitCount - (a as Brewery).visitCount;
        case 3: // IBU/Beer Count
          if (isBrowsingBeers) {
            return (b as Beer).ibu - (a as Beer).ibu;
          }
          return (b as Brewery).beerCount - (a as Brewery).beerCount;
        case 4: // Popularity/Price
          if (isBrowsingBeers) {
            return (b as Beer).catalogEntries - (a as Beer).catalogEntries;
          }
          return (b as Brewery).priceRange - (a as Brewery).priceRange;
        case 5: // Date
          return Math.random() - 0.5;
        default: // Name
          return a.name.localeCompare(b.name);
      }
    });

    return filteredItems;
  };

  const handleStyleToggle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handleLocationToggle = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const clearFilters = () => {
    setMinRating([0, 5]);
    setAbvRange([0, 15]);
    setIbuRange([0, 100]);
    setSelectedStyles([]);
    setSelectedLocations([]);
    setPriceRange([1, 3]);
    setBeerCountRange([0, 30]);
    setHasKitchen(null);
    setSortValue(0);
  };

  const ItemGrid = ({ items, title, category }: { items: (Beer | Brewery)[], title: string, category: string }) => (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ color: 'white' }}>{title}</Typography>
        <Button 
          variant="contained" 
          onClick={() => handleSeeMore(category)}
          sx={{ 
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)'
            }
          }}
        >
          See More
        </Button>
      </Box>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={2}>
            <ItemCard item={item} type={isBrowsingBeers ? 'beers' : 'breweries'} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderCatalogView = () => (
    <Box>
      <Box sx={{ mb: 3, p: 3, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 2, backdropFilter: 'blur(10px)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'white' }}>Filters</Typography>
          <Button 
            variant="outlined" 
            onClick={clearFilters}
            startIcon={<CloseIcon />}
            sx={{ 
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                borderColor: 'white',
                background: 'rgba(255, 255, 255, 0.05)'
              }
            }}
          >
            Clear All
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography sx={{ color: 'white', mb: 1 }}>Sort By</Typography>
            <FormControl fullWidth size="small">
              <Select
                value={sortValue}
                onChange={(e) => setSortValue(e.target.value as number)}
                sx={{
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2196F3'
                  },
                  '.MuiSvgIcon-root': {
                    color: 'white'
                  }
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: 'rgba(26, 26, 46, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      '& .MuiMenuItem-root': {
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)'
                        },
                        '&.Mui-selected': {
                          bgcolor: 'rgba(33, 150, 243, 0.2)',
                          '&:hover': {
                            bgcolor: 'rgba(33, 150, 243, 0.3)'
                          }
                        }
                      }
                    }
                  }
                }}
              >
                {sortOptions.map((option, index) => (
                  <MenuItem key={option} value={index}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography sx={{ color: 'white', mb: 1 }}>Rating: {minRating[0]} - {minRating[1]}</Typography>
            <Slider
              value={minRating}
              onChange={(_, newValue) => setMinRating(newValue as number[])}
              valueLabelDisplay="auto"
              min={0}
              max={5}
              step={0.5}
              sx={{ 
                color: '#2196F3',
                '& .MuiSlider-thumb': {
                  boxShadow: '0 0 0 8px rgba(33, 150, 243, 0.16)'
                }
              }}
            />
          </Grid>

          {isBrowsingBeers ? (
            <>
              <Grid item xs={12} md={3}>
                <Typography sx={{ color: 'white', mb: 1 }}>ABV: {abvRange[0]}% - {abvRange[1]}%</Typography>
                <Slider
                  value={abvRange}
                  onChange={(_, newValue) => setAbvRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={15}
                  step={0.5}
                  sx={{ 
                    color: '#2196F3',
                    '& .MuiSlider-thumb': {
                      boxShadow: '0 0 0 8px rgba(33, 150, 243, 0.16)'
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography sx={{ color: 'white', mb: 1 }}>IBU: {ibuRange[0]} - {ibuRange[1]}</Typography>
                <Slider
                  value={ibuRange}
                  onChange={(_, newValue) => setIbuRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  step={5}
                  sx={{ 
                    color: '#2196F3',
                    '& .MuiSlider-thumb': {
                      boxShadow: '0 0 0 8px rgba(33, 150, 243, 0.16)'
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ color: 'white' }}>
                    Styles {selectedStyles.length > 0 && `(${selectedStyles.length} selected)`}
                  </Typography>
                  <Button
                    onClick={(e) => setStyleAnchorEl(e.currentTarget)}
                    startIcon={<FilterListIcon />}
                    sx={{ 
                      color: 'white',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.05)'
                      }
                    }}
                  >
                    Select Styles
                  </Button>
                </Box>
                {selectedStyles.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {selectedStyles.map((style) => (
                      <Chip
                        key={style}
                        label={style}
                        onDelete={() => handleStyleToggle(style)}
                        sx={{
                          color: 'white',
                          bgcolor: 'primary.main',
                          '&:hover': {
                            bgcolor: 'primary.dark'
                          }
                        }}
                      />
                    ))}
                  </Box>
                )}
                <Popover
                  open={Boolean(styleAnchorEl)}
                  anchorEl={styleAnchorEl}
                  onClose={() => setStyleAnchorEl(null)}
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
                      mt: 1,
                      background: 'rgba(26, 26, 46, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      maxHeight: 300,
                      width: 250
                    }
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {styles.map((style) => (
                        <Chip
                          key={style}
                          label={style}
                          onClick={() => handleStyleToggle(style)}
                          sx={{
                            color: 'white',
                            bgcolor: selectedStyles.includes(style) ? 'primary.main' : 'rgba(255, 255, 255, 0.1)',
                            '&:hover': {
                              bgcolor: selectedStyles.includes(style) ? 'primary.dark' : 'rgba(255, 255, 255, 0.2)'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Popover>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={3}>
                <Typography sx={{ color: 'white', mb: 1 }}>Price Range: ${priceRange[0]} - ${priceRange[1]}</Typography>
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) => setPriceRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  min={1}
                  max={3}
                  step={1}
                  sx={{ 
                    color: '#2196F3',
                    '& .MuiSlider-thumb': {
                      boxShadow: '0 0 0 8px rgba(33, 150, 243, 0.16)'
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography sx={{ color: 'white', mb: 1 }}>Beer Count: {beerCountRange[0]} - {beerCountRange[1]}</Typography>
                <Slider
                  value={beerCountRange}
                  onChange={(_, newValue) => setBeerCountRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={30}
                  step={1}
                  sx={{ 
                    color: '#2196F3',
                    '& .MuiSlider-thumb': {
                      boxShadow: '0 0 0 8px rgba(33, 150, 243, 0.16)'
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ color: 'white' }}>
                    Locations {selectedLocations.length > 0 && `(${selectedLocations.length} selected)`}
                  </Typography>
                  <Button
                    onClick={(e) => setLocationAnchorEl(e.currentTarget)}
                    startIcon={<FilterListIcon />}
                    sx={{ 
                      color: 'white',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.05)'
                      }
                    }}
                  >
                    Select Locations
                  </Button>
                </Box>
                {selectedLocations.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {selectedLocations.map((location) => (
                      <Chip
                        key={location}
                        label={location}
                        onDelete={() => handleLocationToggle(location)}
                        sx={{
                          color: 'white',
                          bgcolor: 'primary.main',
                          '&:hover': {
                            bgcolor: 'primary.dark'
                          }
                        }}
                      />
                    ))}
                  </Box>
                )}
                <Popover
                  open={Boolean(locationAnchorEl)}
                  anchorEl={locationAnchorEl}
                  onClose={() => setLocationAnchorEl(null)}
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
                      mt: 1,
                      background: 'rgba(26, 26, 46, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      maxHeight: 300,
                      width: 250
                    }
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {locations.map((location) => (
                        <Chip
                          key={location}
                          label={location}
                          onClick={() => handleLocationToggle(location)}
                          sx={{
                            color: 'white',
                            bgcolor: selectedLocations.includes(location) ? 'primary.main' : 'rgba(255, 255, 255, 0.1)',
                            '&:hover': {
                              bgcolor: selectedLocations.includes(location) ? 'primary.dark' : 'rgba(255, 255, 255, 0.2)'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Popover>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={hasKitchen === true}
                      onChange={(e) => setHasKitchen(e.target.checked ? true : null)}
                      sx={{ 
                        '& .MuiSwitch-track': { bgcolor: 'rgba(255, 255, 255, 0.3)' },
                        '& .MuiSwitch-thumb': { bgcolor: 'white' },
                        '&.Mui-checked': {
                          '& .MuiSwitch-thumb': { bgcolor: '#2196F3' },
                          '& + .MuiSwitch-track': { bgcolor: 'rgba(33, 150, 243, 0.5)' }
                        }
                      }}
                    />
                  }
                  label={<Typography sx={{ color: 'white' }}>Has Kitchen</Typography>}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Box>

      <Grid container spacing={2}>
        {filterAndSortItems().map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={2}>
            <ItemCard item={item} type={isBrowsingBeers ? 'beers' : 'breweries'} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <PageLayout>
      {viewMode === 'categories' ? (
        <>
          <ItemGrid items={trending} title="Trending" category="trending" />
          <ItemGrid items={highestRated} title="Highest Rated" category="highest-rated" />
          <ItemGrid items={allTimePopular} title="All Time Popular" category="popular" />
        </>
      ) : (
        renderCatalogView()
      )}
    </PageLayout>
  );
};