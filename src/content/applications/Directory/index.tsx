import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import RecentOrders from './Directories';
import useDirectory from './hooks/useDirectory';
import SimpleDialog from 'src/components/Dialog';
import DirectoryForm from './DirectoryForm';
type Props = {
  title: string,
};
const DirectoryDosen: React.FC<Props> = () => {
  const { isModalOpened, handleCloseModal, handleClickOpen } = useDirectory();
  
  console.log("===isModalOpened",isModalOpened)
  return (
    <>
      <Helmet>
        <title>Directori Dosen</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader onClickAdd={handleClickOpen} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
      <SimpleDialog
        title={'Add a new directory'}
        open={isModalOpened}
        onClose={handleCloseModal}
        selectedValue={false}
      >
        <DirectoryForm onClose={handleCloseModal}/>
      </SimpleDialog>
      <Footer />
    </>
  );
}

export default DirectoryDosen;
