import React from 'react'
import { Grid, Paper, Tabs, Tab } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { PageLayout } from '../shared/PageLayout'

interface SettingsLayoutProps {
  children: React.ReactNode
}

export const SettingsLayout = ({
  children,
}: SettingsLayoutProps): JSX.Element => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentTab = location.pathname.split('/').pop() || 'profile'

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(`/settings/${newValue}`)
  }

  return (
    <PageLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Tabs
              orientation='vertical'
              value={currentTab}
              onChange={handleTabChange}
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label='Profile' value='profile' />
              <Tab label='Account' value='account' />
              <Tab label='Tags' value='tags' />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3 }}>{children}</Paper>
        </Grid>
      </Grid>
    </PageLayout>
  )
}
