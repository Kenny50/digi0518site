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
                    categories: ["交通滿意度", "行程滿意度", "景點滿意度"]
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
        DashboardApi.getAllRateAverage()
            .then(response => {
                // Round the values to integers
                const roundedData = {
                    avgTrafficRate: to2Decimal(response.avgTrafficRate),
                    avgItineraryRate: to2Decimal(response.avgItineraryRate),
                    avgAttractionRate: to2Decimal(response.avgAttractionRate)
                };

                // Set categories as keys and data as values for the chart
                this.chartOptions.xaxis.categories = ["4", "555", "65"];
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
