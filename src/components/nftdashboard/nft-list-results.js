import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { GetNFTs, GetNFTLowestPrice } from '../../apis/moralis'
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const NFTListResults = ({ address, filterText }) => {
  const [NFTdata, setNFTdata] = useState([])

  let re = new RegExp(filterText, "g")

  useEffect(() => {
    fetchNFTs()
  }, [])


  const pushTest = () => {
    let data = {
      name: "test",
      lower_price: "test",
      owner: "test",
      token_id: "test"
    }
    if (NFTdata.length == 0){
      setNFTdata([data])
    } else {
      setNFTdata(oldNFT => [oldNFT, data])
    }
    console.log(NFTdata)
  }

  const changeText = () => {
    setContext("changed")
  }

  const addNFTData = (newData) => {
    // if (NFTdata.length == 0){
    //   setNFTdata([newData])
    // } else {
    //   setNFTdata(oldNFT => [oldNFT, newData])
    // }
    setNFTdata(oldNFT => [...oldNFT, newData])
  }

  const fetchLowerPrice = async (token_address) => {
    fetch("https://deep-index.moralis.io/api/v2/nft/"+token_address+"/lowestprice?chain=eth&marketplace=opensea", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "X-API-Key": "v144GSV5jcYo0t0wH4IRm2V1Us5XT43H7TjT19YokvjehcxAEPYK8Ky6HupddhST"
      }
    }).then(response => {
      return response.json()
    }).then(result => {
      console.log(result)
      return result.price
    })
  }

  const fetchNFTs = () => {
    address.forEach((add) => {
        GetNFTs(
          add, (result) => {
            if (result.result && result.result.length > 0) {
              let instance = result.result[0]
              let newInfo = {
                name: instance.name,
                lower_price: "Loading",
                owner: instance.owner_of,
                token_id: instance.token_id

              }
              setTimeout(() => {
                GetNFTLowestPrice(instance.token_address,
                  (result) => {
                    newInfo.lower_price = result.price
                    addNFTData(newInfo)
                  },
                  () => {
                    newInfo.lower_price = "Unknown"
                    addNFTData(newInfo)
                  })
              }, 1000)
            }
          }, () =>{}
        )})
  }

  return (
    <Card >
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                <TableCell>
                  NFT Name
                </TableCell>
                <TableCell>
                  Daily Volume
                </TableCell>
                <TableCell>
                  Total Volume
                </TableCell>
                <TableCell>
                  Lowest Price
                </TableCell>
                <TableCell>
                  Owners
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {NFTdata.map((NFT, idx) => {
                if (re.test(NFT.name)){
                  return (
                    <TableRow
                      key={idx}
                      hover
                    >
                      <TableCell padding="checkbox">
                        {idx}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <Typography
                            color="textPrimary"
                            variant="body1"
                          >
                            {NFT.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {}
                      </TableCell>
                      <TableCell>
                        {}
                      </TableCell>
                      <TableCell>
                        {NFT.lower_price}
                      </TableCell>
                      <TableCell>
                        {NFT.owner}
                      </TableCell>
                    </TableRow>
                  )
                }
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

NFTListResults.propTypes = {
  address: PropTypes.array.isRequired
};
