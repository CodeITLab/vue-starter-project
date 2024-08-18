import { defineStore } from "pinia";

/*
For more information about Pinia, visit: https://pinia.vuejs.org/core-concepts/
 */

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0, name: "Eduardo" }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
