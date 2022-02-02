import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { Budget } from '../components/dashboard/budget';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalProfit } from '../components/dashboard/total-profit';
import { Sales } from '../components/dashboard/sales';
import { NftListHistorychart } from '../components/nftdashboard/nft-list-historychart'
import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { LatestProducts } from '../components/dashboard/latest-products';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { customers } from '../__mocks__/customers';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { NftListFilter } from "../components/nftdashboard/nft-list-filter"

const NFTDashboard = () => (
  <>
    <Head>
      <title>
        Dashboard | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            sm={4}
            xl={4}
            xs={12}>
            <Grid container spacing={3}>
              <Grid
                item
                lg={12}
                sm={12}
                xl={12}
                xs={12}
              >
                <Budget />
              </Grid>
              <Grid
                item
                xl={12}
                lg={12}
                sm={12}
                xs={12}
              >
                <TotalCustomers />
              </Grid>
              <Grid
                item
                xl={12}
                lg={12}
                sm={12}
                xs={12}
              >
                <TasksProgress />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={8}
            sm={8}
            xl={8}
            xs={12}
          >
            <Grid
              item
              lg={12}
              md={12}
              xl={12}
              xs={12}
            >
              <NftListHistorychart />
            </Grid>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}>
            <NftListFilter />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
           <Box>
             <CustomerListResults customers={customers} />
           </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

NFTDashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default NFTDashboard;
