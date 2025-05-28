import React, { useState } from "react";
import { 
  Box, 
  Container,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  Grow,
  ClickAwayListener,
  AppBar,
  Toolbar,
  Button
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search } from "../Search/Search";
import { SettingsMenu } from "../Settings/SettingsMenu";
import { Account } from "../AccountCreation/Account";

export const Header = (): JSX.Element => {
  // account status
  const [signedIn, setSignedIn] = useState(false);

  // path location, navigation routers, and browser anchor location for popper
  const location = useLocation();
  const navigate = useNavigate();
  const [browseAnchorEl, setBrowseAnchorEl] = React.useState<null | HTMLElement>(null);

  // set the location of the anchor if mouse clicked
  const handbleBrowsePopper = (event: React.MouseEvent<HTMLElement>) => {
    setBrowseAnchorEl(event.currentTarget);
  };

  // closes the popper
  const handleBrowseMouseLeave = () => {
    setBrowseAnchorEl(null);
  };

  // navigates to correct browse menu item
  const handleBrowseClick = (path: string) => {
    navigate(path);
    setBrowseAnchorEl(null);
  };

  // navigates to profiles tabs for beer or brewery catalog
  const handleCatalogClick = (tab: string) => {
    navigate(`/profile?tab=${tab}`);
  };

  // header titles and navigation routes
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Profile', path: '/profile' },
    { label: 'Beer Catalog', action: () => handleCatalogClick('beers') },
    { label: 'Brewery Catalog', action: () => handleCatalogClick('breweries') },
    { label: 'Browse'}
  ];

  // determines if the popper should open
  const browseOpen = Boolean(browseAnchorEl);

  // account status - give options to sign in, sign out, or create account
  const accountStatus = (status) => {
    setSignedIn(status);
  }

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {/* map header items into buttons or links */}
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={item.path && item.label !== 'Browse' ? Link : 'button'}
                to={item.path}
                onClick={item.label === 'Browse' ? handbleBrowsePopper : item.action}
                sx={{ 
                  color: location.pathname === item.path ? '#2196F3' : 'white',
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': { 
                    color: '#2196F3',
                    background: 'transparent'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          {/* add search and profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Search />
            {signedIn ? <SettingsMenu changeAccountStatus={accountStatus}/> : <Account changeAccountStatus={accountStatus}/>}
            
          </Box>
        </Toolbar>
      </Container>

      {/* pop up menu when browse is selected */}
      <Popper
        open={browseOpen}
        anchorEl={browseAnchorEl}
        placement="bottom-start"
        transition
        onMouseLeave={handleBrowseMouseLeave}
        sx={{ zIndex: 1300 }}
      >
        {/* transition styling when popper opens */}
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper 
              sx={{ 
                mt: 1, 
                width: 200,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* click away closes popper, add menu items */}
              <ClickAwayListener onClickAway={handleBrowseMouseLeave}>
                <MenuList>
                  <MenuItem 
                    onClick={() => handleBrowseClick('/browse/beers')}
                    sx={{
                      color: 'white',
                      '&:hover': {
                        background: 'rgba(33, 150, 243, 0.1)',
                      }
                    }}
                  >
                    Browse Beers
                  </MenuItem>
                  <MenuItem 
                    onClick={() => handleBrowseClick('/browse/breweries')}
                    sx={{
                      color: 'white',
                      '&:hover': {
                        background: 'rgba(33, 150, 243, 0.1)',
                      }
                    }}
                  >
                    Browse Breweries
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </AppBar>
  );
};