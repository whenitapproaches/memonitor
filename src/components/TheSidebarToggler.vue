<template>
	<a @click.prevent="toggleSidebar" :class="{'is-active': !isSidebarActive}">
		<base-icon class="icon" icon="las la-chevron-left" />
	</a>
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
			toggleSidebar: "toggleSidebar",
		}),
	},
}
</script>

<style lang="scss">
.sidebar-toggler {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 15px;
	width: 60px;
	height: 40px;
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
	.icon {
		font-size: 2rem;
	}
	background: var(--primary-color);
	color: var(--white-color);
	.icon {
		transform-origin: center center;
		transition: 0.3s ease;
	}
	&:hover {
		color: var(--white-color);
	}
	&.is-active {
		.icon {
			transform: rotateZ(180deg);
		}
	}
}
</style>