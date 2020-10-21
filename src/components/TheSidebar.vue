<template>
	<div class="sidebar" :class="{'is-active': isSidebarActive}">
		<aside class="menu">
			<ul class="menu-list">
				<li>
					<router-link @click.native="toggleSidebarOff" exact-active-class="is-active" :to="{ name: 'Home' }">Monitor</router-link>
				</li>
				<li>
					<router-link @click.native="toggleSidebarOff" exact-active-class="is-active" :to="{ name: 'Settings' }">Settings</router-link>
				</li>
				<li>
					<router-link @click.native="toggleSidebarOff" exact-active-class="is-active" :to="{ name: 'About' }">About</router-link>
				</li>
			</ul>
		</aside>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex"
export default {
	computed: {
		...mapState("Sidebar", {
			isSidebarActive: "sidebarStatus",
		}),
	},
	methods: {
		...mapActions("Sidebar", {
			toggleSidebarOff: "toggleSidebarOff"
		})
	},
}
</script>

<style scoped lang="scss">
.sidebar {
	$width: 160px;
	width: $width;
	position: fixed;
	left: -$width;
	top: 0;
	z-index: 50;
	transition: left 0.3s linear, opacity 0.3s linear;
	opacity: 0;
	height: 100vh;
	background: var(--sidebar-background-color);
	display: flex;
	&.is-active {
		left: 0;
		opacity: 1;
	}
}
.menu {
	padding: 0 0;
	margin-top: auto;
	margin-bottom: auto;
	width: 100%;
	text-align: right;
	letter-spacing: 0.25rem;
}
</style>