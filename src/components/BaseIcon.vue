<template>
	<span class="icon">
		<i :class="icon"></i>
	</span>
</template>

<script>
export default {
	name: "BaseIcon",
	props: {
		icon: {
			type: String,
			required: true,
		},
	},
}
</script>

<style scoped lang="scss">
.icon {
	font-size: 1.25rem;
	&.is-small {
		font-size: 1rem;
	}
}
.loading {
	animation: spinning 1.5s infinite linear;
}
@keyframes spinning {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>