import { Box, Button } from "@mui/material"

export const Account = ({changeAccountStatus}): JSX.Element => {

    const items = ["Sign in", "Create an Account"]

    return (
        <Box>
            {items.map(btn => 
                <Button
                    key={btn}
                    onClick={btn==="Sign in" ? () => changeAccountStatus(true) : undefined}
                    sx={{ 
                        color:'white',
                        textTransform: 'none',
                        fontSize: '1rem',
                        '&:hover': { 
                            color: '#2196F3',
                            background: 'transparent'
                        }
                    }}
                >
                    {btn}
                </Button>
            )}
        </Box>
    )
}

