<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="is-flex">
			<div class="is-flex navbar-start">
				<div href="#" class="logo">
					<p>Memonitor</p>
				</div>
			</div>
			<div class="is-flex navbar-end">
				<a class="navbar-item" @click.prevent="minimizeApp">
					<base-icon icon="las la-minus"></base-icon>
				</a>
				<a class="navbar-item" @click.prevent="quit">
					<base-icon icon="las la-times"></base-icon>
				</a>
			</div>
		</div>
	</nav>
</template>

<script>
import { ipcRenderer } from "electron"
import { mapActions, mapState } from "vuex"
export default {
	computed: {
	},
	methods: {
		minimizeApp() {
			ipcRenderer.send("minimize-window")
		},
		quit() {
			ipcRenderer.send("close-window")
		},
	},
}
</script>

<style scoped lang="scss">
.navbar {
	-webkit-app-region: drag;
	height: 40px;
	min-height: 0;
	background: var(--background-strong-color);
  z-index: 100;
  position: absolute;
  top: 0;
  right:0;
  width: 100%;
	& > div {
		height: 100%;
	}
	a,
	button {
		-webkit-app-region: no-drag;
	}
	&-start {
		.logo {
			margin-left: 0.75rem;
			font-weight: bold;
			font-size: 24px;
			color: var(--text-strong-color);
			display: flex;
			align-items: center;
		}
	}

	&-end {
		margin-left: auto;
	}
	&-item {
		background-color: transparent;
		color: var(--text-strong-color);
		&:hover {
			color: var(--white-color);
			background: var(--primary-color);
		}
	}
}
</style>