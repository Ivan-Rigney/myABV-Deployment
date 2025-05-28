import React, { useState } from 'react';
import {
  Box,
  TextField,
  Dialog,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { mockBeers, mockBreweries } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

export const Search = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchQuery('');
  };

  const handleItemClick = (type: 'beer' | 'brewery', id: number) => {
    navigate(`/${type}/${id}`);
    handleClose();
  };

  const filteredBeers = searchQuery ? mockBeers.filter(beer =>
    beer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    beer.brewery.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const filteredBreweries = searchQuery ? mockBreweries.filter(brewery =>
    brewery.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ color: 'white' }}>
        <SearchIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'rgba(26, 26, 46, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minHeight: '80vh'
          }
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            placeholder="Search beers and breweries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery('')} size="small" sx={{ color: 'white' }}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2196F3'
                }
              }
            }}
            sx={{ mb: 3 }}
          />

          {searchQuery && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {/* Beer Results */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                  Beer Results ({filteredBeers.length})
                </Typography>
                <List>
                  {filteredBeers.map(beer => (
                    <ListItem
                      key={beer.id}
                      onClick={() => handleItemClick('beer', beer.id)}
                      sx={{
                        mb: 1,
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 1,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateX(4px)'
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar 
                          src={beer.imageUrl} 
                          variant="rounded"
                          sx={{
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography sx={{ color: 'white' }}>{beer.name}</Typography>}
                        secondary={
                          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            {`${beer.brewery} • ${beer.style}`}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Brewery Results */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                  Brewery Results ({filteredBreweries.length})
                </Typography>
                <List>
                  {filteredBreweries.map(brewery => (
                    <ListItem
                      key={brewery.id}
                      onClick={() => handleItemClick('brewery', brewery.id)}
                      sx={{
                        mb: 1,
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 1,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': { 
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          transform: 'translateX(4px)'
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar 
                          src={brewery.imageUrl} 
                          variant="rounded"
                          sx={{
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography sx={{ color: 'white' }}>{brewery.name}</Typography>}
                        secondary={
                          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            {brewery.location}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};