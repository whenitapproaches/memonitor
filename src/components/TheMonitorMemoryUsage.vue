<template>
	<div class="memory-usage section">
		<div class="is-flex mb-2">
			<h1 class="has-text-weight-bold">MEMORY USAGE</h1>
			<div class="system-memory">{{totalMemoryInGB}}</div>
		</div>
		<div class="memory-usage-chart" style="height: 170px">
			<canvas ref="memoryUsageChart"></canvas>
			<div class="current-memory-usage">{{currentMemoryUsage}}</div>
		</div>
	</div>
</template>

<script>
import Chart from "chart.js"
Chart.pluginService.register({
	beforeDraw: function (chart, easing) {
		if (
			chart.config.options.chartArea &&
			chart.config.options.chartArea.backgroundColor
		) {
			var helpers = Chart.helpers
			var ctx = chart.chart.ctx
			var chartArea = chart.chartArea

			ctx.save()
			ctx.fillStyle = chart.config.options.chartArea.backgroundColor
			ctx.fillRect(
				chartArea.left,
				chartArea.top,
				chartArea.right - chartArea.left,
				chartArea.bottom - chartArea.top
			)
			ctx.restore()
		}
	},
})
import { ipcRenderer } from "electron"
export default {
	data() {
		return {
			currentMemoryUsage: "",
			totalMemoryInGB: "",
			chart: null,
			chartRange: 20,
			chartOptions: {
				type: "line",
				data: {
					labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
					datasets: [
						{
							data: [],
							backgroundColor: ["#F95959"],
							borderWidth: 0,
							lineTension: 0,
							pointBorderWidth: 0,
							pointHoverBorderWidth: 0,
              pointRadius: 0,
						},
					],
				},
				options: {
					responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 0
          },
					hover: {
						animationDuration: 0, // duration of animations when hovering an item
					},
					responsiveAnimationDuration: 0, // animation duration after a resize
					chartArea: {
						backgroundColor: "rgba(249,89,89,0.1)",
					},
					layout: {
						padding: {
							bottom: -20
						}
					},
					legend: {
						display: false,
					},
					tooltips: {
						enabled: false,
					},
					scales: {
						xAxes: [
							{
								gridLines: {
									display: false,
                },
                ticks: {
									display: false,
                  reverse: true
                }
							},
						],
						yAxes: [
							{
								ticks: {
									mirror: true,
									display: false,
                  beginAtZero: true,
                  max: 1,
                  min: 0
								},
								gridLines: {
									display: false,
									drawTicks: false,
								},
							},
						],
					},
				},
			},
		}
	},
	methods: {
		updateMemoryUsageChartData(memoryUsageInPercent) {
			let data = this.chart.data.datasets[0].data
			if (data.length === this.chartRange) {
				data.pop()
			}
			data.unshift(memoryUsageInPercent)
			this.chart.update()
		},
	},
	mounted() {
		let memoryUsageChartElement = this.$refs.memoryUsageChart
		this.chart = new Chart(memoryUsageChartElement, this.chartOptions)
		ipcRenderer.on(
			"update-memory-usage",
			(event, { totalMemoryInGB, memoryUsageInPercent }) => {
				this.totalMemoryInGB = totalMemoryInGB + "GB"
				this.currentMemoryUsage = `${memoryUsageInPercent}%`
				this.updateMemoryUsageChartData(memoryUsageInPercent/100)
			}
		)
	},
}
</script>

<style scoped lang="scss">
.system-memory {
	margin-left: auto;
	color: var(--text-strong-color);
}

.memory-usage-chart {
	position: relative;
}

.current-memory-usage {
	position: absolute;
	top: 0;
	right: 0;
	font-size: 2.5rem;
	padding: 0.5rem 1rem;
	text-align: right;
	color: var(--text-strong-color);
}
</style>