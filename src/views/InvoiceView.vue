<template>
  <div v-if="currentInvoice" class="invoice-view container">
    <router-link class="nav-link flex" :to="{ name: 'Home' }">
      <img src="@/assets/icon-arrow-left.svg" alt="leftarrow" /> Go Back
    </router-link>
    <!-- Header sekcija Invoice  Edit/Delete/Paid/Pending-->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div
          class="status-button flex"
          :class="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending,
          }"
        >
          <span v-if="currentInvoice.invoicePaid">Paid</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
        </div>
      </div>
      <div class="right flex">
        <button @click="toggleEditInvoice" class="dark-green">
          Edit
        </button>
        <button @click="deleteInvoice(currentInvoice.docId)" class="red">
          Delete
        </button>
        <button
          v-if="currentInvoice.invoicePending"
          @click="updateStatusToPaid(currentInvoice.docId)"
          class="green"
        >
          Mark as Paid
        </button>
        <button
          v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
          @click="updateStatusToPending(currentInvoice.docId)"
          class="orange"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <!-- Invoice detales -->
    <div class="invoice-details flex flex-column">
      <div class="top flex">
        <div class="left flex flex-column">
          <p><span>#</span>{{ currentInvoice.invoiceId }}</p>
          <p>{{ currentInvoice.productDescription }}</p>
        </div>
        <div class="right flex flex-column">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerZipCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>
      <div class="middle flex">
        <div class="payment flex flex-column">
          <h4>Invoice Date</h4>
          <p>{{ currentInvoice.invoiceDate }}</p>
          <h4>Payment Date</h4>
          <p>{{ currentInvoice.paymentDueDate }}</p>
        </div>
        <div class="bill flex flex-column">
          <h4>Bill To</h4>
          <p>{{ currentInvoice.clientName }}</p>
          <p>{{ currentInvoice.clientStreetAddress }}</p>
          <p>{{ currentInvoice.clientCity }}</p>
          <p>{{ currentInvoice.clientZipCode }}</p>
          <p>{{ currentInvoice.clientCountry }}</p>
        </div>
        <div class="send-to flex flex-column">
          <h4>Send To</h4>
          <p>{{ currentInvoice.clientEmail }}</p>
        </div>
      </div>
      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>Quantity</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div
            v-for="(item, index) in currentInvoice.invoiceItemList"
            :key="index"
            class="item flex"
          >
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }} &#8364;</p>
            <p>{{ item.total }} &#8364;</p>
          </div>
        </div>
        <div class="total flex">
          <p><strong> Amount Due </strong></p>
          <p>
            <strong>{{ currentInvoice.invoiceTotal }} &#8364;</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  name: "invoiceView",
  data() {
    return {
      currentInvoice: null,
    };
  },

  created() {
    this.getCurrentInvoice();
  },
  methods: {
    ...mapMutations([
      "SET_CURRENT_INVOICE",
      "TOGGLE_EDIT_INVOICE",
      "TOGGLE_INVOICE",
    ]),

    ...mapActions([
      "DELETE_INVOICE",
      "UPDATE_STATUS_TO_PENDING",
      "UPDATE_STATUS_TO_PAID",
    ]),

    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params.invoiceId);
      this.currentInvoice = this.currentInvoiceArray[0];
    },
    toggleEditInvoice() {
      this.TOGGLE_EDIT_INVOICE();
      this.TOGGLE_INVOICE();
    },
    async deleteInvoice(docId) {
      await this.DELETE_INVOICE(docId);
      this.$router.push({ name: "Home" });
    },

    updateStatusToPaid(docId) {
      this.UPDATE_STATUS_TO_PAID(docId);
    },
    updateStatusToPending(docId) {
      this.UPDATE_STATUS_TO_PENDING(docId);
    },
  },
  computed: {
    ...mapState(["currentInvoiceArray", "editInvoice"]),
  },
  // Update data realiu laiku kai keiciu invoice
  watch: {
    editInvoice() {
      if (!this.editInvoice) {
        this.currentInvoice = this.currentInvoiceArray[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice-view {
  .nav-link {
    margin-bottom: 2rem;
    align-items: center;
    color: white;
    font-size: 0.75rem;
    img {
      margin-right: 1rem;
      width: 7px;
      height: 10px;
    }
  }

  .header,
  .invoice-details {
    background-color: #325a53;
    border-radius: 1.25;
    border-radius: 5px;
  }

  .header {
    align-items: center;
    padding: 1.5rem 2rem;
    font-size: 0.75rem;

    .left {
      align-items: center;

      span {
        color: white;
        margin-right: 1rem;
      }
    }
    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: white;
      }
    }
  }

  .invoice-details {
    padding: 3rem;
    margin-top: 1.5rem;

    .top {
      div {
        color: rgb(219, 206, 206);
        flex: 1;
      }

      .left {
        font-size: 0.75rem;
        p:first-child {
          font-size: 1.5rem;
          text-transform: uppercase;
          color: rgb(219, 206, 206);
          margin-bottom: 0.5rem;
        }

        p:nth-child(2) {
          font-size: 1rem;
        }
        span {
          color: rgb(115, 110, 110);
        }
      }
      .right {
        font-size: 0.75rem;
        align-items: flex-end;
      }
    }

    .middle {
      margin-top: 50px;
      color: rgb(219, 206, 206);
      gap: 1rem;

      h4 {
        font-size: 0.75rem;
        font-weight: 400;
        margin-bottom: 0.75rem;
      }

      p {
        font-size: 1rem;
      }

      .bill,
      .payment {
        flex: 1;
      }
      .payment {
        h4:nth-child(3) {
          margin-top: 2rem;
        }
        p {
          font-weight: 600;
        }
      }
      .bill {
        p:nth-child(2) {
          font-size: 1rem;
        }
        p:nth-child(3) {
          margin-top: auto;
        }
        p {
          font-size: 0.75rem;
        }
      }

      .send-to {
        flex: 2;
      }
    }

    .bottom {
      margin-top: 50px;

      .billing-items {
        padding: 2rem;
        border-radius: 0.5rem 0.5rem 0 0;
        background-color: #487870;

        .heading {
          color: rgb(219, 206, 206);
          font-size: 0.75rem;
          margin-bottom: 2rem;

          p:first-child {
            flex: 3;
            text-align: left;
          }
          p {
            flex: 1;
            text-align: right;
          }
        }

        .item {
          margin-bottom: 2rem;
          font-size: 13px;
          color: white;

          &:last-child {
            margin-bottom: 0;
          }

          p:first-child {
            flex: 3;
            text-align: left;
          }
          p {
            flex: 1;
            text-align: right;
          }
        }
      }

      .total {
        color: white;
        padding: 2rem;
        background-color: #20443e;
        align-items: center;
        border-radius: 0 0 0.5rem 0.5rem;

        p {
          flex: 1;
          font-size: 0.75rem;
        }

        p:nth-child(2) {
          font-size: 1.75rem;
          text-align: right;
        }
      }
    }
  }
}
</style>
