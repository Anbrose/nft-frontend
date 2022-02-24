import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import Web3 from 'web3'
import { ABI } from '../__mocks__/ABI';

const Products = () => {

  const [NFTid, setNFTid] = useState("")

  useEffect(() => {
    getNFTid()
  }, [])

  const getNFTid = async () => {
    if (!window.ethereum || !window.web3){
      alert("Web3 disabled")
      return
    }
    const contractAddress = "0xab4b695B59Ab63EcDc1eDba86230a289CCbC97aF";

    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    const account = accounts[0]
    const value = 0.2
    const realValue = value.toString()
    await window.web3.currentProvider.enable()
    window.w3 = new Web3(window.web3.currentProvider)
    const myContract = new window.w3.eth.Contract(ABI, contractAddress)

    myContract.methods.createImage("QmUFTad6m7EiKDSruyZbQr9vgFkYz5kBf1YsAMaySFpcU1").send({from: account}).on('receipt', function(receipt){
      const id = receipt.events.CreateImage.returnValues.imageID
      setNFTid(oldid => id)
      console.log("Successful on setting NFT id")
    }).on('error', function(error, receipt){
      console.log("Fail on setting NFT id")
    })
  }

  return (
  <>
    <Head>
      <title>
        Products | Material Kit
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
        <ProductListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard
                  NFTid={NFTid}
                  product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
)};

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
