<template>
    <apexchart width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
</template>
<script>
import DashboardApi from "../api/DashboardApi"
function to2Decimal(num) {
    return Math.round(num * 100) / 100
}
export default {
    name: 'BarExample',

    data: function () {
        return {
            chartOptions: {
                plotOptions: {
                    bar: {
                        horizontal: true
                    }
                },
                xaxis: {
                    categories: ["1", "2", "3", "4", "5"]
                }
            },
            series: [{
                name: '評分',
                data: []
            }]
        }
    },

    mounted() {
        // Make API call to get data
        DashboardApi.getTrafficRate()
            .then(response => {
                console.log(response)
                // Round the values to integers
                const roundedData = {
                    "1": to2Decimal(response[0].count),
                    "2": to2Decimal(response[1].count),
                    "3": to2Decimal(response[2].count),
                    "4": to2Decimal(response[3].count),
                    "5": to2Decimal(response[4].count)
                };

                this.series[0].data = Object.values(roundedData);

                // Update the chart with new data
                this.$refs.chart.updateOptions({
                    xaxis: this.chartOptions.xaxis
                });
                this.$refs.chart.updateSeries(this.series);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}
</script>
