import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Box,
  Typography,
  Divider,
  Checkbox,
  ListItemText,
  FormControlLabel,
  IconButton,
} from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'

interface CatalogEntryDialogProps {
  open: boolean
  onClose: () => void
  type: 'beer' | 'brewery'
  itemName: string
}

const CUSTOM_TAGS = [
  'Seasonal',
  'Special Occasions',
  'Local Picks',
  'Must Try',
  'Hidden Gems',
  'Award Winners',
  'Personal Recommendations',
  'Weekend Picks',
]

export const CatalogEntryDialog = ({
  open,
  onClose,
  type,
  itemName,
}: CatalogEntryDialogProps): JSX.Element => {
  const [status, setStatus] = useState('planning')
  const [score, setScore] = useState<number | null>(null)
  const [visits, setVisits] = useState('')
  const [notes, setNotes] = useState('')
  const [customTags, setCustomTags] = useState<string[]>([])
  const [isFavorite, setIsFavorite] = useState(false)

  const handleSave = () => {
    // TODO: Implement save functionality
    onClose()
  }

  const handleGroupChange = (event: any) => {
    const {
      target: { value },
    } = event
    setCustomTags(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        Add {itemName} to Catalog
        <IconButton
          onClick={() => setIsFavorite(!isFavorite)}
          color={isFavorite ? 'error' : 'default'}
          sx={{ ml: 2 }}
        >
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label='Status'
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value='planning'>
                {type === 'beer' ? 'Plan to Try' : 'Plan to Visit'}
              </MenuItem>
              <MenuItem value='completed'>
                {type === 'beer' ? 'Tried' : 'Visited'}
              </MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Typography component='legend' gutterBottom>
              Score
            </Typography>
            <Rating
              value={score}
              onChange={(_, newValue) => setScore(newValue)}
              precision={0.5}
              size='large'
            />
          </Box>

          <TextField
            label={type === 'beer' ? 'Times Tried' : 'Times Visited'}
            type='number'
            value={visits}
            onChange={(e) => setVisits(e.target.value)}
            InputProps={{ inputProps: { min: 0 } }}
          />

          <Divider />

          <FormControl fullWidth>
            <InputLabel>Custom Tags</InputLabel>
            <Select
              multiple
              value={customTags}
              onChange={handleGroupChange}
              label='Custom Tags'
              renderValue={(selected) => selected.join(', ')}
            >
              {CUSTOM_TAGS.map((group) => (
                <MenuItem key={group} value={group}>
                  <Checkbox checked={customTags.indexOf(group) > -1} />
                  <ListItemText primary={group} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label='Notes'
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder='Add personal notes...'
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
