<template>
  <div
    @click="checkClick"
    class="invoice-wrap flex flex-column"
    ref="invoiceWrap"
  >
    <form @submit.prevent="submitForm" class="invoice-content">
      <Loading v-show="loading" />
      <h1 class="invc" v-if="!editInvoice">New Invoice</h1>
      <h1 class="invc" v-if="editInvoice">Edit Invoice</h1>
      <!-- BILL FORMA -->
      <div class="bill-from flex flex-column">
        <h4>Bill From</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddress">Street Adress</label>
          <input
            v-model="billerStreetAddress"
            type="text"
            id="billerStreetAddress"
            minlength="5"
            maxlength="70"
            required
          />
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input
              v-model="billerCity"
              type="text"
              id="billerCity"
              minlength="5"
              maxlength="86"
              required
            />
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input
              v-model="billerZipCode"
              type="text"
              id="billerZipCode"
              minlength="2"
              maxlength="20"
              required
            />
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input
              v-model="billerCountry"
              type="text"
              id="billerCountry"
              minlength="4"
              maxlength="56"
              required
            />
          </div>
        </div>
      </div>

      <!-- KAM BUS BILL -->
      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>
        <div class="input flex flex-column">
          <label for="clientName">Client's Name</label>
          <input
            v-model="clientName"
            type="text"
            id="clientName"
            minlength="3"
            maxlength="100"
            required
          />
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail">Client's Email</label>
          <input
            v-model="clientEmail"
            type="email"
            id="clientEmail"
            minlength="4"
            maxlength="70"
            required
          />
        </div>
        <div class="input flex flex-column">
          <label for="clientStreetAddress">Street Address</label>
          <input
            v-model="clientStreetAddress"
            type="text"
            id="clientStreetAddress"
            minlength="4"
            maxlength="70"
            required
          />
        </div>

        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">City</label>
            <input
              v-model="clientCity"
              type="text"
              id="clientCity"
              minlength="5"
              maxlength="86"
              required
            />
          </div>
          <div class="input flex flex-column">
            <label for="clientZipCode">Zip Code</label>
            <input
              v-model="clientZipCode"
              type="text"
              id="clientZipCode"
              minlength="2"
              maxlength="20"
              required
            />
          </div>
          <div class="input flex flex-column">
            <label for="clientCountry">Country</label>
            <input
              v-model="clientCountry"
              type="text"
              id="clientCountry"
              minlength="4"
              maxlength="56"
              required
            />
          </div>
        </div>
      </div>

      <!-- INVOICE INFO -->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Invoice Date</label>
            <input
              v-model="invoiceDate"
              type="text"
              id="invoiceDate "
              disabled
            />
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Date</label>
            <input
              v-model="paymentDueDate"
              type="text"
              id="paymentDueDate"
              disabled
            />
          </div>
        </div>
        <!-- MOKEJIMO TERMINAI ir KOKS PRODUKTAS-->
        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms</label>
          <select v-model="paymentTerms" type="text" id="paymentTerms" required>
            <option value="7">7 Days</option>
            <option value="15">15 Days</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option></select
          >
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input
            v-model="productDescription"
            type="text"
            id="productDescription"
            required
          />
        </div>
        <div class="work-items">
          <h3>Item List</h3>
          <table class="item-list">
            <tr class="table-heading flex">
              <th class="item-name">Item Name</th>
              <th class="qty">Quantity</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>
            <tr
              v-for="(item, index) in invoiceItemList"
              :key="index"
              class="table-items flex"
            >
              <td class="item-name">
                <input v-model="item.itemName" type="text" />
              </td>
              <td class="qty"><input v-model="item.qty" type="text" /></td>
              <td class="price"><input v-model="item.price" type="text" /></td>
              <td class="total flex">
                {{ (item.total = item.qty * item.price) }} &#8364;
              </td>
              <img
                @click="deleteInvoiceItem(item.id)"
                src="@/assets/icon-delete.svg"
                alt="deleteicon"
              />
            </tr>
          </table>

          <div @click="addNewInvoiceItem" class="flex button">
            <img src="@/assets/icon-plus.svg" alt="plusicon" />
            Add New Item
          </div>
        </div>
      </div>
      <!--  DELETE/SAVE/EXIT/UPDATE MYGTUKAI-->
      <div class="save flex">
        <div class="left">
          <button @click="closeInvoice" class="red" type="button">
            Cancel
          </button>
        </div>
        <div class="right flex">
          <button
            v-if="!editInvoice"
            type="submit"
            @click="saveDraft"
            class="dark-grey"
          >
            Save as Draft
          </button>
          <button
            v-if="!editInvoice"
            type="submit"
            @click="publishInvoice"
            class="purple"
          >
            Create Invoice
          </button>
          <button v-if="editInvoice" class="purple" type="submit">
            Update Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import Loading from "../components/Loading.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { uid } from "uid";
export default {
  name: "invoiceModal",
  data() {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      docId: null,
      loading: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },
  components: {
    Loading,
  },
  //   Skriptas kad gauti esamos dienos data
  created() {
    if (!this.editInvoice) {
      this.invoiceDateUnix = Date.now();
      this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString(
        "en-eu",
        this.dateOptions
      );
    }
    if (this.editInvoice) {
      const currentInvoice = this.currentInvoiceArray[0];
      this.docId = currentInvoice.docId;
      this.billerStreetAddress = currentInvoice.billerStreetAddress;
      this.billerCity = currentInvoice.billerCity;
      this.billerZipCode = currentInvoice.billerZipCode;
      this.billerCountry = currentInvoice.billerCountry;
      this.clientName = currentInvoice.clientName;
      this.clientEmail = currentInvoice.clientEmail;
      this.clientStreetAddress = currentInvoice.clientStreetAddress;
      this.clientCity = currentInvoice.clientCity;
      this.clientZipCode = currentInvoice.clientZipCode;
      this.clientCountry = currentInvoice.clientCountry;
      this.invoiceDateUnix = currentInvoice.invoiceDateUnix;
      this.invoiceDate = currentInvoice.invoiceDate;
      this.paymentTerms = currentInvoice.paymentTerms;
      this.paymentDueDateUnix = currentInvoice.paymentDueDateUnix;
      this.paymentDueDate = currentInvoice.paymentDueDate;
      this.productDescription = currentInvoice.productDescription;
      this.invoicePending = currentInvoice.invoicePending;
      this.invoiceDraft = currentInvoice.invoiceDraft;
      this.invoiceItemList = currentInvoice.invoiceItemList;
      this.invoiceTota = currentInvoice.invoiceTotal;
    }
  },
  methods: {
    ...mapMutations(["TOGGLE_INVOICE", "TOGGLE_MODAL", "TOGGLE_EDIT_INVOICE"]),

    ...mapActions(["UPDATE_INVOICE", "GET_INVOICES"]),

    checkClick(e) {
      if (e.target === this.$refs.invoiceWrap) {
        this.TOGGLE_MODAL();
      }
    },

    closeInvoice() {
      this.TOGGLE_INVOICE();
      if (this.editInvoice) {
        this.TOGGLE_EDIT_INVOICE;
      }
    },

    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: uid(),
        itemName: "",
        qty: "",
        price: 0,
        total: 0,
      });
    },

    deleteInvoiceItem(id) {
      this.invoiceItemList = this.invoiceItemList.filter(
        (item) => item.id !== id
      );
    },

    calInvoiceTotal() {
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach((item) => {
        this.invoiceTotal += item.total;
      });
    },

    publishInvoice() {
      this.invoicePending = true;
    },

    saveDraft() {
      this.invoiceDraft = true;
    },
    // DB sukurimas kas isiraso
    async uploadInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert("Please check if you filled Item list correctly");
        return;
      }

      this.loading = true;

      this.calInvoiceTotal();

      const dataBase = db.collection("invoices").doc();

      await dataBase.set({
        invoiceId: uid(6),
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.invoiceDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoicePaid: null,
      });

      this.loading = false;
      this.TOGGLE_INVOICE();
      this.GET_INVOICES();
    },
    // DB update kas updatinasi kai koreaguoja Invoice
    async updateInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert("Please check if you filled Item list correctly");
        return;
      }

      this.loading = true;

      this.calInvoiceTotal();

      const dataBase = db.collection("invoices").doc(this.docId);

      await dataBase.update({
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
      });

      this.loading = false;

      const data = {
        docId: this.docId,
        routeId: this.$route.params.invoiceId,
      };

      this.UPDATE_INVOICE(data);
    },

    submitForm() {
      if (this.editInvoice) {
        this.updateInvoice();
        return;
      }
      this.uploadInvoice();
    },
  },
  computed: {
    ...mapState(["editInvoice", "currentInvoiceArray"]),
  },

  // Skriptas kad paskaiciuotu dienas pagal pasirinkta mokejimo opcija
  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(
        futureDate.getDate() + parseInt(this.paymentTerms)
      );
      this.paymentDueDate = new Date(
        this.paymentDueDateUnix
      ).toLocaleDateString("en-eu", this.dateOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 90px;
  }

  .invoice-content {
    position: relative;
    padding: 3.5rem;
    max-width: 700px;
    width: 100%;
    background-color: #2c4e48;
    color: white;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 {
      margin-bottom: 4rem;
      color: white;
    }

    h3 {
      margin-bottom: 1rem;
      font-size: 18px;
      color: lightslategrey;
    }

    h4 {
      color: #4e9c73;
      font-size: 20px;
      margin-bottom: 1.5rem;
    }
    /* Bill To / From  style - kad butu vienodi tarpai naudojant gap ir flex:1 */

    .bill-to,
    .bill-from {
      margin-bottom: 3rem;

      .location-details {
        gap: 1rem;
        div {
          flex: 1;
        }
      }
    }

    /* Invoice style */

    .invoice-work {
      .payment {
        gap: 1.5rem;
        div {
          flex: 1;
        }
      }

      .work-items {
        .item-list {
          width: 100%;

          /* Item Table Style */

          .table-heading,
          .table-items {
            gap: 1rem;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }

            .qty {
              flex-basis: 10%;
            }

            .price {
              flex-basis: 20%;
            }

            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }

          .table-heading {
            margin-bottom: 1rem;

            th {
              text-align: left;
            }
          }

          .table-items {
            position: relative;
            margin-bottom: 1.5rem;

            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 1rem;
            }
          }
        }

        .button {
          color: white;
          background-color: #325a53;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }
    }
  }

  .save {
    margin-top: 1rem;

    div {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
    }
  }

  .input {
    margin-bottom: 1.5rem;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    background-color: #325a53;
    color: white;
    border-radius: 10px;
    padding: 12px 4px;
    border: none;

    &:focuse {
      outline: none;
    }
  }
}

@media (min-width: 750px) {
  .invc {
    margin-top: 50px;
  }
}
</style>
