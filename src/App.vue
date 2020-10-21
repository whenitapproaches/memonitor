<template>
	<div id="app">
		<TheSidebar />
		<TheSidebarToggler class="sidebar-toggler" />
		<div
			class="main"
			:style="{'margin-left': isSidebarActive ? '160px' : '0'}"
			@click="toggleSidebarOff"
		>
			<TheNavigationBar />
			<router-view />
		</div>
	</div>
</template>

<script>
import { ipcRenderer } from "electron"
import delay from "@/utils/delay"
import "@/assets/scss/main.scss"
import TheNavigationBar from "@/components/TheNavigationBar"
import TheSidebar from "@/components/TheSidebar"
import TheSidebarToggler from "@/components/TheSidebarToggler"
import { mapActions, mapState } from "vuex"
export default {
	components: {
		TheNavigationBar,
		TheSidebar,
		TheSidebarToggler,
	},
	computed: {
		...mapState("Sidebar", {
			isSidebarActive: "sidebarStatus",
		}),
		...mapState("Settings", {
			settings: "settings",
		}),
	},
	methods: {
		...mapActions("Settings", {
			fetchSettings: "fetchSettings",
			initTheme: "initTheme"
		}),
		async pollingData() {
			ipcRenderer.send("polling-data")
			await delay(this.settings.updateInterval)
			this.pollingData()
		},
		...mapActions("Sidebar", {
			toggleSidebarOff: "toggleSidebarOff",
		}),
	},
	async created() {
		await this.fetchSettings()
		this.pollingData()
	},
}
</script>

<style lang="scss">
body {
	background: var(--background-color);
	height: 100vh;
}
.main {
	padding-top: 40px;
	transition: 0.3s linear;
	height: 100vh;
	position: relative;
	width: 100%;
}
.sidebar-toggler {
	position: fixed;
	top: 50%;
	left: 0;
	transform: translateY(-50%) translateX(-40px);
	z-index: 50;
	transition: 0.3s ease;
	&:hover {
		transform: translateY(-50%) translateX(-10px) scale(1.2);
	}
}
</style>
