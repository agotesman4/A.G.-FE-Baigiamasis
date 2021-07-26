<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Are you you want to leave?</p>
      <p>Your changes will not be saved!</p>
      <div class="actions flex">
        <button @click="closeModal" class="purple">Return</button>
        <button @click="closeInvoice" class="red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "modal",
  methods: {
    ...mapMutations(["TOGGLE_MODAL", "TOGGLE_INVOICE", "TOGGLE_EDIT_INVOICE"]),

    closeModal() {
      this.TOGGLE_MODAL();
    },

    closeInvoice() {
      this.TOGGLE_MODAL();
      this.TOGGLE_INVOICE();
      if (this.editInvoice) {
        this.TOGGLE_EDIT_INVOICE();
      }
    },
    computed: {
      ...mapState(["editInvoice"]),
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  .modal-content {
    border-radius: 20px;
    padding: 3rem 2rem;
    max-width: 450px;
    background-color: #487870;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      10px 4px 6px -1px rgba(0, 0, 0, 0.06);
    color: white;

    p {
      text-align: center;
    }

    .actions {
      margin-top: 1.5rem;
      button {
        flex: 1;
      }
    }
  }
}
</style>
