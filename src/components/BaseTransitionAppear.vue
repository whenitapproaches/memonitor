<template>
	<transition appear :appear-active-class="computedAppearActiveClass">
		<slot></slot>
	</transition>
</template>

<script>
export default {
	props: {
		appearClass: {
			type: String,
			default: "fadeIn",
		},
		library: {
			type: String,
			default: "animate.css",
		},
		extraClass: {
			type: String,
			default: "",
		},
	},
	computed: {
		computedAppearActiveClass() {
			if (this.library === "animate.css") {
				return (
					"animate__animated " +
					`animate__${this.appearClass} ` +
					this.extraClass
				)
			}
			return this.appearClass + " " + this.extraClass
		},
	},
}
</script>

<style>
</style>