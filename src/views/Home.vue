<template>
	<div class="home">
		<div class="columns is-gapless is-multiline is-variable is-2">
			<div class="column is-12">
				<base-transition-appear appearClass="fadeInRight">
					<TheMonitorMemoryUsage />
				</base-transition-appear>
			</div>
			<div class="column is-7">
				<base-transition-appear appearClass="fadeInUp">
					<TheMonitorProcesses class="pt-0" />
				</base-transition-appear>
			</div>
			<div class="is-5 column">
				<base-transition-appear appearClass="fadeInRight">
					<TheMonitorMemoryLayout class="pt-0" />
				</base-transition-appear>
			</div>
		</div>
	</div>
</template>

<script>
import TheMonitorMemoryUsage from "@/components/TheMonitorMemoryUsage"
import TheMonitorProcesses from "@/components/TheMonitorProcesses"
import TheMonitorMemoryLayout from "@/components/TheMonitorMemoryLayout"

export default {
	name: "Home",
	components: {
		TheMonitorMemoryUsage,
		TheMonitorProcesses,
		TheMonitorMemoryLayout,
	},
}
</script>
