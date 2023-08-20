import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import useDirectory from './hooks/useDirectory';

function PageHeader(props) {
  const { onClickAdd } = props;
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Direktori Dosen
        </Typography>
        <Typography variant="subtitle2">
          Hi {user.name}, this is for managing Directory Dosen
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          onClick={onClickAdd}
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add Profile Lecture
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
