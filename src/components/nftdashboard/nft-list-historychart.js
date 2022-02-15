import React, { useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2'
import { Card, CardContent, Grid } from '@mui/material';

export const NftListHistorychart = () => {

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandomInts(len){
    let re = []
    for (let i = 0; i < len; i++){
      re.push(getRandomInt(100))
    }
    return re
  }

  function getTestLable(len){
    let re = []
    for (let i = 0; i < len; i++){
      re.push("Date" + i)
    }
    return re
  }

  const [historyLabels, sethistoryLabels] = useState(getTestLable(1000))
  const [historyData, sethistoryData] = useState(getRandomInts(1000))


  const NFTLineChartOption = {
    options:{
      elements:{
        point:{
          radius: 0
        }
      }
    },
    scales:{
      x:
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 4
          }
        },
      y: {
        display: true,
        position: 'right'
      }
    }
  }

  const NFTLineChartData = {
    labels: historyLabels,
    datasets: [
      {
        label: "Test data",
        data: historyData,
        tension: 0.4,
        yAxisID: "y"
      }
    ]
  }

  return (
    <Card>
      <CardContent>
        <Grid item>
          <Line
            data={NFTLineChartData}
            options={NFTLineChartOption}/>
        </Grid>
      </CardContent>
    </Card>
  )
}

