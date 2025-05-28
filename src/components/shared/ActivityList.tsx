import { Box, Typography, Avatar, Rating } from '@mui/material'
import { Link } from 'react-router-dom'
import { Activity, Beer, Brewery } from '../../data/mockData'

const ImageStyle = {
  width: 70,
  height: 70,
  borderRadius: 1,
  objectFit: 'cover',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'fixed',
  right: '10%',
}
interface ActivityListProps {
  activities: Activity[]
  beers: Beer[]
  breweries: Brewery[]
  nameOveride: string
}

export const ActivityList = ({
  activities,
  beers,
  breweries,
  nameOveride = '',
}: ActivityListProps): JSX.Element => {
  return (
    <>
      {activities.map((activity) => (
        <Box
          key={activity.id}
          sx={{
            py: 2,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {/* Avatar */}
          <Avatar
            src={activity.userAvatar}
            sx={{ width: 60, height: 60 }}
            component={Link}
            to={`/profile/`}
          />

          {/* Text Content */}
          <Box>
            <Typography>
              {nameOveride ? nameOveride : activity.userName} {activity.type}{' '}
              {activity.targetName}
            </Typography>
            {activity.rating && (
              <Rating value={activity.rating} readOnly size='small' />
            )}
            <Typography variant='caption' color='text.secondary'>
              {activity.date}
            </Typography>
          </Box>

          {/* Image */}
          {/* At least with dev mode, there seems to be some bad performance with hover effects. Prod optimization might help, but haven't tested yet */}
          <Avatar
            src={
              activity.targetType === 'beer'
                ? beers.find((beer) => beer.id === activity.targetId)?.imageUrl
                : breweries.find(
                    (breweries) => breweries.id === activity.targetId
                  )?.imageUrl
            }
            sx={ImageStyle}
            component={Link}
            to={`/${activity.targetType === 'beer' ? 'beer' : 'brewery'}/${
              activity.targetId
            }`}
          />
        </Box>
      ))}
    </>
  )
}
