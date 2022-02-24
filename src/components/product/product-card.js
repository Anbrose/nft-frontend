import PropTypes from 'prop-types';
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';
import { ABI } from '../../__mocks__/ABI'
import Web3 from 'web3'

export const ProductCard = ({ product, NFTid, ...rest }) => {


  const handlePurchase = async () => {
    if (!window.ethereum || !window.web3){
      alert("Web3 disabled")
      return
    }

    const contractAddress = "0xab4b695B59Ab63EcDc1eDba86230a289CCbC97aF";

    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    const account = accounts[0]
    const value = 0.01
    const realValue = value.toString()
    await window.web3.currentProvider.enable()
    window.w3 = new Web3(window.web3.currentProvider)

    const myContract = new window.w3.eth.Contract(ABI, contractAddress)

    myContract.methods.pay("0x1ea9012D828031E063FF206C4029A9B9c334A345", NFTid).send({from: account, value: window.w3.utils.toWei(realValue, "ether")}).on('confirmation', function(confirmationNumber, receipt){
      console.log("success on payment")
    }).on('error', function (error, receipt){
      console.log("fail on payment")
    })

  }

  return (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
        <Avatar
          alt="Product"
          src={product.media}
          variant="square"
        />
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {product.title}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {product.description}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <ClockIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Updated 2hr ago
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Button
            onClick={handlePurchase}
            sx={{
              boxShadow: 3,
              border: 1
            }}>Buy it for 0.01 eth</Button>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <DownloadIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {product.totalDownloads}
            {' '}
            Downloads
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
)};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
