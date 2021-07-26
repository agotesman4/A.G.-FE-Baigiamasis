<template>
  <router-link
    class="invoice flex"
    :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }"
  >
    <div class="left flex">
      <span class="tracking-number">#{{ invoice.invoiceId }}</span>
      <span class="due-date"> {{ invoice.paymentDueDate }}</span>
      <span class="person">{{ invoice.clientName }}</span>
    </div>

    <div class="right flex">
      <span class="price">&#8364;{{ invoice.invoiceTotal }}</span>
      <div
        class="status-button flex"
        :class="{
          paid: invoice.invoicePaid,
          draft: invoice.invoiceDraft,
          pending: invoice.invoicePending,
        }"
      >
        <span v-if="invoice.invoicePaid">Paid</span>
        <span v-if="invoice.invoiceDraft">Draft</span>
        <span v-if="invoice.invoicePending">Pending</span>
      </div>
      <div class="icon">
        <img src="@/assets/icon-arrow-right.svg" alt="arrowright" />
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "invoice",
  props: ["invoice"],
};
</script>

<style lang="scss" scoped>
.invoice {
  text-decoration: none;
  cursor: pointer;
  gap: 1rem;
  margin-bottom: 1rem;
  color: white;
  border-radius: 1.25rem;
  padding: 1.75rem 2rem;
  background-color: #325a53;
  align-items: center;

  span {
    font-size: 13px;
  }

  .left {
    align-items: center;
    flex-basis: 60%;
    gap: 1rem;

    span {
      flex: 1;
    }

    .tracking-number {
      text-transform: uppercase;
    }
  }
  .right {
    gap: 1rem;
    flex-basis: 40%;
    align-items: center;

    .price {
      flex: 1;
      font-size: 1rem;
      font-weight: 600px;
    }
  }
}
</style>
