<template>
  <div :class="`card has-background-success-dark p-4 mb-5`">
    <div class="field">
      <div class="control">
        <textarea
          v-model="message"
          class="textarea"
          placeholder="Add Message Here..."
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button
          :disabled="!message"
          class="button is-link has-background-success"
          @click="postMessage(message)"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddMessage",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    postMessage(message) {
      this.$store.dispatch("postMessage", message);
      this.message = "";
    },
  },
};
</script>
