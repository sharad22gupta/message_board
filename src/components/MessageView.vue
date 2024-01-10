<template>
  <article class="message is-primary">
    <div class="message-header">
      <p>~ {{ message.source }}</p>
      <button
        class="delete"
        aria-label="delete"
        @click="$emit('delete', message.id)"
      ></button>
    </div>
    <div class="message-body has-text-left">
      {{ message.text }}
    </div>
    <div class="has-text-right is-size-7 has-text-grey p-2">
      {{ time }}
    </div>
  </article>
</template>
<script>
export default {
  name: "MessageView",
  props: {
    message: Object,
  },
  computed: {
    time() {
      const originalTimestamp = this.message.timestamp;
      const dateObject = new Date(originalTimestamp);

      const day = String(dateObject.getDate()).padStart(2, "0");
      const month = String(dateObject.getMonth() + 1).padStart(2, "0");
      const year = dateObject.getFullYear();
      let hours = dateObject.getHours();
      const minutes = String(dateObject.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;

      const formattedDate = `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;

      return formattedDate;
    },
  },
};
</script>
