const initialState = () => ({
  sidebarStatus: false
});

export default {
  state: initialState(),
  getters: {},
  actions: {
    toggleSidebar: ({ commit }) => {
      commit("toggleSidebarStatus");
    },
    toggleSidebarOff: ({ commit }) => {
      commit("toggleSidebarStatusOff");
    },
    toggleSidebarOn: ({ commit }) => {
      commit("toggleSidebarStatusOn");
    }
  },
  mutations: {
    toggleSidebarStatus: state => {
      state.sidebarStatus = !state.sidebarStatus;
    },
    toggleSidebarStatusOff: state => {
      state.sidebarStatus = false;
    },
    toggleSidebarStatusOn: state => {
      state.sidebarStatus = true;
    }
  }
};
