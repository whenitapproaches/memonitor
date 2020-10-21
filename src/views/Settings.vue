<template>
	<div class="settings">
		<div class="columns">
			<div class="column">
				<base-transition-appear appearClass="fadeIn">
					<div class="section">
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Update Interval:</label>
							</div>
							<div class="field-body">
								<div class="field is-narrow">
									<div class="control">
										<div class="buttons">
											<button
												class="button"
												:class="{'is-primary': settings.updateInterval === 500}"
												@click="setUpdateInterval(500)"
											>500 milliseconds</button>
											<button
												class="button"
												:class="{'is-primary': settings.updateInterval === 1000}"
												@click="setUpdateInterval(1000)"
											>1 second</button>
											<button
												class="button"
												:class="{'is-primary': settings.updateInterval === 2000}"
												@click="setUpdateInterval(2000)"
											>2 seconds</button>
											<button
												class="button"
												:class="{'is-primary': settings.updateInterval === 5000}"
												@click="setUpdateInterval(5000)"
											>5 seconds</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="field is-horizontal">
							<div class="field-label is-normal">
								<label class="label">Theme:</label>
							</div>
							<div class="field-body">
								<div class="field is-narrow">
									<div class="control">
										<div class="buttons">
											<button
												class="button"
												:class="{'is-primary': settings.theme === 'light'}"
												@click="setTheme('light')"
											>Light</button>
											<button
												class="button"
												:class="{'is-primary': settings.theme === 'dark'}"
												@click="setTheme('dark')"
											>Dark</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</base-transition-appear>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex"
export default {
	data() {
		return {
			settings: {},
		}
	},
	methods: {
		...mapActions("Settings", {
			fetchSettings: "fetchSettings",
			changeTheme: "changeTheme",
			setValueByKey: "setValueByKey",
		}),
		setUpdateInterval(interval) {
			this.setValueByKey({ key: "updateInterval", value: interval })
			this.$set(this.settings, "updateInterval", interval)
		},
		setTheme(theme) {
			this.setValueByKey({ key: "theme", value: theme })
			this.changeTheme(theme)
			this.$set(this.settings, "theme", theme)
		},
	},
	async created() {
		this.settings = await this.fetchSettings()
	},
}
</script>

<style scoped lang="scss">
.button {
	height: 30px;
}
</style>