import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import RecentOrders from './RecentOrders';
import useDirectory from './hooks/useDirectory';
import SimpleDialog from 'src/components/Dialog';
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
        title={'Title Modal'}
        open={isModalOpened}
        onClose={handleCloseModal}
        selectedValue={false}
      >
        <p>Hallo</p>
      </SimpleDialog>
      <Footer />
    </>
  );
}

export default DirectoryDosen;
