import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './theme/theme'
import { Homepage } from './screens/Homepage/Homepage'
import { Profile } from './screens/Profile/Profile'
import { Browse } from './screens/Browse/Browse'
import { Settings } from './screens/Settings/Settings'
import { BeerDetail } from './screens/BeerDetail/BeerDetail.tsx'
import { BreweryDetail } from './screens/BreweryDetail/BreweryDetail.tsx'

createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/browse/beers' element={<Browse />} />
          <Route path='/browse/breweries' element={<Browse />} />
          <Route path='/beer/:id' element={<BeerDetail />} />
          <Route path='/brewery/:id' element={<BreweryDetail />} />
          <Route path='/settings'>
            <Route path='profile' element={<Settings />} />
            <Route path='account' element={<Settings />} />
            <Route path='tags' element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  </StrictMode>
)
