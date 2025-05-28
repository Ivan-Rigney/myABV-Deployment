import React, {useState} from 'react';
import {Box, Popper, Paper, MenuList, MenuItem, Grow, ClickAwayListener, Avatar} from '@mui/material';
import {Link} from 'react-router-dom';

export const SettingsMenu = ({changeAccountStatus}): JSX.Element => {
  // update selected element
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // set selected element state
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // set selected element to null when not needed
  const handleClose = () => {
    setAnchorEl(null);
  };

  // whether a popper is open or closed
  const open = Boolean(anchorEl);

  return (
    <>
      {/* avatar settings and handle user selection */}
      <Avatar
        onClick={handleMouseEnter}
        sx={{ 
          width: 40, 
          height: 40, 
          cursor: 'pointer',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '2px solid rgba(255, 255, 255, 0.3)',
            transform: 'scale(1.2)'
          }
        }}
        src="/generic-avatar.svg"
      />

      {/* pop up menu for avatar / profile settings with transitions*/}
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        sx={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          // mui transitions using grow
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
              onMouseLeave={handleClose}
            >
              {/* click off paper --> close */}
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {/* menu item 1, go to profile settings page */}
                  <MenuItem 
                    component={Link} 
                    to="/settings/profile"
                    onClick={handleClose}
                    sx={{
                      color: 'white',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'rgba(33, 150, 243, 0.1)',
                        paddingLeft: '24px'
                      }
                    }}
                  >
                    Profile Settings
                  </MenuItem>

                  {/* menu item 2, sign out of profile (needs functionality) */}
                  <MenuItem onClick={()=>{changeAccountStatus(false)}} 
                    sx={{
                      color: 'red',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'rgba(190, 28, 28, 0.2)',
                        paddingLeft: '24px'
                      }
                    }}
                  >
                    Sign Out
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};