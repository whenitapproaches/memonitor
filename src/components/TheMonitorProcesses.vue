<template>
	<div class="running-processes section">
		<div class="is-flex">
			<h1 class="has-text-weight-bold mb-2">RUNNING PROCESSES</h1>
		</div>
		<div class="running-processes-table box mb-3">
			<div class="table-container">
				<table class="table is-fullwidth">
					<thead>
						<th @click="updateSortBy('name')">
							<div class="is-flex is-fullwidth">
								Process
								<base-icon
									class="sort-icon"
									:class="{'is-reversed': reversedSortBy, 'is-visible': sortBy === 'name'}"
									icon="las la-chevron-up"
								/>
							</div>
						</th>
						<th @click="updateSortBy('pid')">
							<div class="is-flex is-fullwidth">
								PID
								<base-icon
									class="sort-icon"
									:class="{'is-reversed': reversedSortBy, 'is-visible': sortBy === 'pid'}"
									icon="las la-chevron-up"
								/>
							</div>
						</th>
						<th @click="updateSortBy('cpu')" class="has-text-right">
							<div class="is-flex is-fullwidth">
								CPU
								<base-icon
									class="sort-icon"
									:class="{'is-reversed': reversedSortBy, 'is-visible': sortBy === 'cpu'}"
									icon="las la-chevron-up"
								/>
							</div>
						</th>
						<th @click="updateSortBy('rss')" class="has-text-right">
							<div class="is-flex is-fullwidth">
								RAM
								<base-icon
									class="sort-icon"
									:class="{'is-reversed': reversedSortBy, 'is-visible': sortBy === 'rss'}"
									icon="las la-chevron-up"
								/>
							</div>
						</th>
					</thead>
					<tbody>
						<tr
							v-for="(process) in displayedRunningProcesses"
							:key="process.pid"
							:class="{'is-selected': currentSelectedPID === process.pid}"
							@click="selectRow(process.pid)"
						>
							<td>
								<img :src="process.path" alt />
								{{process.name | nameFilter}}
							</td>
							<td>{{process.pid}}</td>
							<td class="has-text-right">{{process.cpu | cpuFilter }}</td>
							<td class="has-text-right">{{process.rss | rssFilter }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<button
			class="button close-process-button"
			:disabled="currentSelectedPID === null"
			@click="killProcess"
		>Close Process</button>
	</div>
</template>

<script>
import { ipcRenderer } from "electron"
import { sortBy, reverse } from "lodash"

export default {
	data() {
		return {
			runningProcesses: [],
			sortBy: "rss",
			reversedSortBy: true,
			currentSelectedPID: null,
		}
	},
	computed: {
		displayedRunningProcesses() {
			if (!this.runningProcesses.length) return []
			let sorted = sortBy(this.runningProcesses, this.sortBy)
			if (this.reversedSortBy) return reverse(sorted)
			return sorted
		},
	},
	created() {
		ipcRenderer.on("update-running-processes", (event, runningProcesses) => {
			this.runningProcesses = runningProcesses
		})
	},
	methods: {
		updateSortBy(field) {
			if (field === this.sortBy) this.reversedSortBy = !this.reversedSortBy
			this.sortBy = field
		},
		selectRow(pid) {
			this.currentSelectedPID = pid
		},
		killProcess() {
			if (this.currentSelectedPID === null) return
			ipcRenderer.send("kill-process-by-pid", this.currentSelectedPID)
		},
	},
	filters: {
		cpuFilter(val) {
			return Math.floor(val) + "%"
		},
		rssFilter(val) {
			return Math.ceil(val / 1024) + "MB"
		},
		nameFilter(val) {
			let trimExtensionName = val.replace(".exe", "")
			let maxLength = 20
			let sliced =
				val.length > maxLength
					? trimExtensionName.slice(0, maxLength - 3) + "..."
					: trimExtensionName
			return sliced
		},
	},
}
</script>

<style scoped lang="scss">
.running-processes-table {
	height: 220px;
	.table-container {
		overflow-y: scroll;
		overflow-x: hidden;
		height: 100%;
		&::-webkit-scrollbar {
			width: 0.5rem;
		}

		&::-webkit-scrollbar-track {
			background: var(--scrollbar-color);
			border-radius: 0.25rem;
		}
		&::-webkit-scrollbar-thumb {
			background: var(--text-weak-color);
			border-radius: 0.25rem;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: var(--text-normal-color);
		}

		table {
			th {
				cursor: pointer;
			}
			tr {
				cursor: pointer;
				td {
					border-color: var(--text-weak-color);
				}
				&.is-selected {
					background: var(--background-lighter-color);
					color: var(--text-normal-color);
					td {
						border-color: var(--text-normal-color);
					}
				}
			}
		}
	}
}
.close-process-button {
	background: var(--primary-color);
	color: var(--white-color);
	border: 0;
	height: 2rem;
	box-shadow: none !important;
	cursor: pointer;
	transition: 0.3s ease;
	&:not(:disabled):hover {
		background: var(--primary-light-color);
	}
}
.sort-icon {
	font-size: 0.875rem !important;
	transform-origin: center center;
	transition: 0.3s ease;
	opacity: 0;
	margin-left: auto;
	&.is-reversed {
		transform: rotateZ(180deg);
	}
	&.is-visible {
		opacity: 1;
	}
}
</style>