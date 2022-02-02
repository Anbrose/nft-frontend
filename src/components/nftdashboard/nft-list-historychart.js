import { Line } from 'react-chartjs-2'
import { Card, CardContent, Grid } from '@mui/material';

export const NftListHistorychart = () => (
  <Card>
    <CardContent>
      <Grid item>
        <Line
          data={{
            labels: [1,2,3,4,5,6],
            datasets: [
              {
                label: "Test data",
                data: [2,4,5,5,6,7,8],
                tension: 0.4
              }
            ]
          }}
          height={400}
          width={600}
          options={{
            scales:{
              xAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 4
                  }
                }],
              yAxes: [
                {
                  position: 'right',
                }],
            }
          }}/>
      </Grid>
    </CardContent>
  </Card>
)
