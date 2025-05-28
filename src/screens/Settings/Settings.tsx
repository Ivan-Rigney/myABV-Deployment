import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  List,
  ListItem,
  IconButton,
  Grid,
} from '@mui/material'
import { Delete as DeleteIcon, Upload as UploadIcon } from '@mui/icons-material'
import { SettingsLayout } from '../../components/Settings/SettingsLayout'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'

export const Settings = (): JSX.Element => {
  // check pathname and render associated settings menu
  const [pathName, setPathName] = useState('profile')
  useEffect(() => {
    setPathName(location.pathname.split('/').pop() || 'profile')
  }, [location.pathname])

  const renderProfileSettings = () => (
    <Box>
      {/* about me text box */}
      <Typography variant='h6' gutterBottom>
        About Me
      </Typography>
      <TextField
        multiline
        rows={4}
        fullWidth
        placeholder='Tell us about yourself...'
        sx={{ mb: 1 }}
      />
      {/* add button functionality */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' size='small'>
          Save
        </Button>
      </Box>

      {/* profile pictures*/}
      <Typography variant='h6' gutterBottom>
        Profile Picture
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Stack>
            <Box
              display='block'
              component='img'
              src='/generic-avatar.svg'
              sx={{
                width: 150,
                height: 150,
                bgcolor: 'transparent',
              }}
            />
            <Typography variant='caption' textAlign='center'>
              Current
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <Stack>
            <Box
              sx={{
                width: 150,
                height: 150,
                bgcolor: 'grey.400',
              }}
            >
              <UploadIcon />
            </Box>
            <Typography variant='caption'>Upload New</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )

  const renderAccountSettings = () => (
    <Box>
      {/* user name information */}
      <Typography variant='h6' gutterBottom>
        Username
      </Typography>
      <TextField fullWidth placeholder='Username' sx={{ mb: 1 }} />
      <Button variant='contained' sx={{ mb: 4 }}>
        Save
      </Button>

      {/* email information */}
      <Typography variant='h6' gutterBottom>
        Email
      </Typography>
      <TextField fullWidth type='email' placeholder='Email' sx={{ mb: 1 }} />
      <Button variant='contained' sx={{ mb: 4 }}>
        Save
      </Button>

      {/* password information */}
      <Typography variant='h6' gutterBottom>
        Password
      </Typography>
      <TextField
        fullWidth
        type='password'
        placeholder='New Password'
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        type='password'
        placeholder='Confirm Password'
        sx={{ mb: 1 }}
      />
      <Button variant='contained' sx={{ mb: 4 }}>
        Save
      </Button>

      {/* privacy information */}
      <Typography variant='h6' gutterBottom>
        Privacy
      </Typography>
      <FormControl sx={{ mb: 4 }}>
        <RadioGroup defaultValue='public'>
          <FormControlLabel
            value='public'
            control={<Radio />}
            label='Public - Anyone can see'
          />
          <FormControlLabel
            value='restricted'
            control={<Radio />}
            label='Restricted - Only friends can see'
          />
          <FormControlLabel
            value='private'
            control={<Radio />}
            label='Private - No one can see'
          />
        </RadioGroup>
      </FormControl>

      {/* deletion */}
      <Typography variant='h6' gutterBottom>
        Delete Account
      </Typography>
      <TextField
        fullWidth
        placeholder='Type "I want to delete my account."'
        sx={{ mb: 2 }}
      />
      <Button className='delete' variant='contained'>
        Delete Account
      </Button>
    </Box>
  )

  const renderTagsSettings = () => (
    <Box>
      {/* BEER tag settings */}
      <Typography variant='h6' gutterBottom>
        Beer Tags
      </Typography>
      <List>
        {['Custom Tag 1', 'Custom Tag 2', 'Custom Tag 3', 'Custom Tag 4'].map(
          (tag) => (
            <ListItem
              key={tag}
              secondaryAction={
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon color='error' />
                </IconButton>
              }
            >
              <TextField fullWidth value={tag} />
            </ListItem>
          )
        )}
      </List>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Button variant='contained' sx={{ mr: 2 }}>
          Add
        </Button>
        <Button variant='contained'>Save</Button>
      </Box>

      {/* BREWERY tag settings */}
      <Typography variant='h6' gutterBottom>
        Brewery Tags
      </Typography>
      <List>
        {['Custom Tag 1', 'Custom Tag 2', 'Custom Tag 3', 'Custom Tag 4'].map(
          (tag) => (
            <ListItem
              key={tag}
              secondaryAction={
                <IconButton edge='end' aria-label='delete'>
                  <DeleteIcon color='error' />
                </IconButton>
              }
            >
              <TextField fullWidth value={tag} />
            </ListItem>
          )
        )}
      </List>
      <Box sx={{ ml: 2, mb: 4 }}>
        <Button variant='contained' sx={{ mr: 2 }}>
          Add
        </Button>
        <Button variant='contained'>Save</Button>
      </Box>

      {/* deletion */}
      <Typography variant='h6' gutterBottom>
        Delete List Entries
      </Typography>
      <Typography variant='body2' sx={{ mb: 2 }}>
        This will permanently delete all beer/breweries you have added to your
        list
      </Typography>
      <Box>
        <Button
          className='delete'
          variant='contained'
          color='error'
          sx={{ mr: 2 }}
        >
          Delete Beer Entries
        </Button>
        <Button className='delete' variant='contained' color='error'>
          Delete Brewery Entries
        </Button>
      </Box>
    </Box>
  )

  return (
    <SettingsLayout>
      {pathName === 'profile' && renderProfileSettings()}
      {pathName === 'account' && renderAccountSettings()}
      {pathName === 'tags' && renderTagsSettings()}
    </SettingsLayout>
  )
}
