import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
  },
  getters: {},
  mutations: {
    updateMessages(state, payload) {
      state.messages = payload;
    },
  },
  actions: {
    getAllMessages(context) {
      return axios
        .get("https://mapi.harmoney.dev/api/v1/messages/", {
          headers: {
            Authorization: "XZRl31RR5FjFTeOA",
          },
        })
        .then((response) => {
          context.commit("updateMessages", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    postMessage({ dispatch }, payload) {
      axios
        .post(
          "https://mapi.harmoney.dev/api/v1/messages/",
          {
            text: payload,
          },
          {
            headers: {
              Authorization: "XZRl31RR5FjFTeOA",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            dispatch("getAllMessages");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteMessage({ dispatch }, payload) {
      axios
        .delete(`https://mapi.harmoney.dev/api/v1/messages/${payload}/`, {
          headers: {
            Authorization: "XZRl31RR5FjFTeOA",
          },
        })
        .then((response) => {
          if (response.status === 204) {
            dispatch("getAllMessages");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
