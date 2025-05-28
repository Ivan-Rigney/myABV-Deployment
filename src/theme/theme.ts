import { DisabledByDefault } from '@mui/icons-material'
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196F3',
      dark: '#1976D2',
      light: '#64B5F6',
    },
    background: {
      default: '#1a1a2e',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#1a1a2e',
          color: '#ffffff',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.05)',
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          transition: 'all 0.3s ease',
        },
        contained: {
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1976D2 30%, #00B4D8 90%)',
          },
          '&.delete': {
            background: '#d50000',
          },
          '&.inCatalog': {
            background: 'green',
          },
        },
        outlined: {
          color: 'white',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          '&:hover': {
            borderColor: 'white',
            background: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: '#FFD700',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
          },
          '&.MuiChip-deletable:hover': {
            background: 'rgba(255, 255, 255, 0.15)',
          },
        },
        deleteIcon: {
          color: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            color: 'white',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#2196F3',
          '& .MuiSlider-thumb': {
            boxShadow: '0 0 0 8px rgba(33, 150, 243, 0.16)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2196F3',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'white',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: 'rgba(33, 150, 243, 0.08)',
          },
          '&.Mui-selected': {
            background: 'rgba(33, 150, 243, 0.16)',
            '&:hover': {
              background: 'rgba(33, 150, 243, 0.24)',
            },
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          background: 'rgba(26, 26, 46, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(26, 26, 46, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '2px solid rgba(255, 255, 255, 0.3)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
            transform: 'translateX(4px)',
          },
          variants: [
            {
              props: { variant: 'catalog' },
              style: {
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.3s ease',
                transform: 'translateZ(0)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.05)',
                  transform: 'translateX(8px) translateZ(0)',
                },
              },
            },
          ],
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-selected': {
              color: '#2196F3',
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#2196F3',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'white',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.05)',
          },
        },
      },
    },
  },
})
