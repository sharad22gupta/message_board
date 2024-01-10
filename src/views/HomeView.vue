<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<template>
  <div class="container pb-6">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <h1 class="is-size-2 is-family-monospace">Chatter</h1>
      </div>
    </nav>
    <div>
      <add-message />
    </div>
    <div
      v-if="messagesToShow.length > 0"
      class="pb-4 is-flex is-justify-content-space-between"
    >
      <div class="">
        <ul class="pagination-list">
          <li v-for="index in noOfPages" :key="index">
            <a
              class="pagination-link"
              :class="{ 'is-current': index === activePageIndex }"
              aria-label="Goto page 1"
              @click="(activePageIndex = index), getPaginatedResults(index)"
              >{{ index }}</a
            >
          </li>
        </ul>
      </div>
      <div>
        <button
          class="button is-info mr-2"
          @click="(sortAsc = !sortAsc), sortMessages()"
        >
          Sort
        </button>
        <button
          class="button is-danger"
          @click="(showDeleteModal = true), (deleteMessageId = 'all')"
        >
          Delete All
        </button>
      </div>
    </div>
    <div v-else>
      <p class="is-size-4">No messages to show, hit that POST button!</p>
    </div>
    <div>
      <template v-for="message in messagesToShow">
        <message-view
          :message="message"
          :key="message.id"
          @delete="openDeleteModal"
        />
      </template>
    </div>

    <div class="modal" :class="{ 'is-active': showDeleteModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-left">Delete Message</p>
          <button
            class="delete"
            aria-label="close"
            @click="showDeleteModal = false"
          ></button>
        </header>
        <section class="modal-card-body has-text-left">
          <p class="is-size-4">Are you sure you want to delete message?</p>
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
          <button class="button" @click="showDeleteModal = false">
            Cancel
          </button>
          <button class="button is-danger" @click="deleteMessage">
            Delete
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import AddMessage from "@/components/AddMessage.vue";
import MessageView from "@/components/MessageView.vue";

export default {
  name: "HomeView",
  data() {
    return {
      sortAsc: true,
      showDeleteModal: false,
      deleteMessageId: null,
      activePageIndex: 1,
      paginationRange: 5,
      messagesToShow: [],
    };
  },
  components: { AddMessage, MessageView },
  computed: {
    noOfPages() {
      return Math.ceil(
        this.$store.state.messages.length / this.paginationRange
      );
    },
    allMessages() {
      return this.$store.state.messages.length;
    },
  },
  watch: {
    allMessages(newCount, oldCount) {
      if (newCount !== oldCount) {
        this.$store.dispatch("getAllMessages").then(() => {
          this.sortMessages();
        });
      }
    },
  },
  created() {
    this.$store.dispatch("getAllMessages").then(() => {
      this.sortMessages();
    });
  },
  methods: {
    sortMessages() {
      this.$store.state.messages.sort((a, b) => {
        const timestampA = new Date(a.timestamp);
        const timestampB = new Date(b.timestamp);
        if (this.sortAsc) {
          return timestampB - timestampA;
        } else {
          return timestampA - timestampB;
        }
      });
      this.getPaginatedResults(this.activePageIndex);
    },
    openDeleteModal(id) {
      this.showDeleteModal = true;
      this.deleteMessageId = id;
    },
    deleteMessage() {
      if (this.deleteMessageId === "all") {
        this.$store.state.messages.forEach((message) => {
          this.$store.dispatch("deleteMessage", message.id);
        });
      } else {
        this.$store.dispatch("deleteMessage", this.deleteMessageId);
      }
      this.showDeleteModal = false;
    },
    getPaginatedResults(pageNumber) {
      const startIndex = (pageNumber - 1) * this.paginationRange;
      const endIndex = startIndex + this.paginationRange;
      this.messagesToShow = this.$store.state.messages.slice(
        startIndex,
        endIndex
      );
    },
  },
};
</script>

<style>
.container {
  max-width: 800px !important;
}
</style>
