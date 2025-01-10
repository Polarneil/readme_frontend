import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function CustomAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: 'black'
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1,
              fontFamily: "'Share Tech Mono', monospace",
              fontWeight: 700,
              color: '#23FF12',
            }}
          >
            README.ai
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}