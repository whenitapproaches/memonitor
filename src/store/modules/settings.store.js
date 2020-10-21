import db from "@/db";
import Vue from 'vue'
const root = document.documentElement;
const themes = {
  dark: {
    "--background-color": "#233142",
    "--sidebar-background-color": "#1c2835",
    "--text-strong-color": "#f2f5f8",
    "--text-normal-color": "#e5eaf0",
    "--text-weak-color": "#a4b6cc",
    "--primary-color": "#f95959",
    "--primary-light-color": "#FA6B6B",
    "--secondary-color": "#facf5a",
    "--background-strong-color": "#233142",
    "--background-lighter-color": "#313F4F",
    "--background-light-color": "#273546",
    "--white-color": "#f2f5f8",
    "--scrollbar-color": "#2D3B4D"
  },
  light: {
    "--background-color": "#F5F5F5",
    "--sidebar-background-color": "#E0E0E0",
    "--text-strong-color": "#2E2F38",
    "--text-normal-color": "#40414F",
    "--text-weak-color": "#535465",
    "--primary-color": "#f95959",
    "--primary-light-color": "#FA6B6B",
    "--secondary-color": "#facf5a",
    "--background-strong-color": "#F5F5F5",
    "--background-lighter-color": "#E0E0E0",
    "--background-light-color": "#F0F0F0",
    "--white-color": "#f2f5f8",
    "--scrollbar-color": "#D6D6D6"
  }
};

const initialState = () => ({
  settings: {}
});

export default {
  state: initialState(),
  getters: {},
  actions: {
    setValueByKey({ commit }, payload) {
      commit("setValueByKey", payload);
    },
    async fetchSettings({ commit, dispatch }) {
      let settings = { ...(await db.get("settings").write()) };
      commit("setSettings", settings);
      dispatch("initTheme")
      return settings;
    },
    changeTheme({}, theme) {
      let themeColors = themes[theme];
      for (let keyColor in themeColors) {
        let color = themeColors[keyColor];
        root.style.setProperty(keyColor, color);
      }
    },
    initTheme({ state }) {
      let theme = state.settings.theme;
      let themeColors = themes[theme];
      for (let keyColor in themeColors) {
        let color = themeColors[keyColor];
        root.style.setProperty(keyColor, color);
      }
      console.log("change")
    }
  },
  mutations: {
    setValueByKey(state, { key, value }) {
      Vue.set(state.settings, key, value)
      db.get("settings")
        .set(key, value)
        .write();
    },
    setSettings(state, settings) {
      Vue.set(state, "settings", settings)
    }
  }
};
