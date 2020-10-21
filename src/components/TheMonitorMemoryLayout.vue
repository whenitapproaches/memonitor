<template>
	<div class="memory-layout section">
		<div class="is-flex">
			<h1 class="has-text-weight-bold mb-2">MEMORY LAYOUT</h1>
		</div>
		<div class="columns is-multiline">
			<div
				class="column is-6"
				v-for="memory in memoryLayout"
				:key="memory.serialNum"
			>
				<div class="box px-4 py-2">
					<BaseIcon icon="las la-memory" />
					<p>Speed: {{ memory.clockSpeed }}Mhz</p>
					Size: {{ memory.size }} GB
					<p>Manufacturer: {{ memory.manufacturer }}</p>
					<p>SN: {{ memory.serialNum }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ipcRenderer } from "electron"
export default {
	data() {
		return {
			memoryLayout: [],
		}
	},
	mounted() {
		ipcRenderer.on("update-memory-layout", (event, data) => {
			console.log(data)
			this.memoryLayout = data
		})
	},
}
</script>

<style scoped lang="scss">
.memory-layout {
	height: 220px;
}
</style>