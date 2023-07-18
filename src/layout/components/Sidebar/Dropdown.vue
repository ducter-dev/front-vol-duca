<script setup>
import { onMounted, ref } from "vue";
import { useToggle } from "@vueuse/core";
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
    required: false,
  },
  label: {
    type: String,
    default: "Menu dropdown",
  },
});

const isOpen = ref(false);
const toggleDropdown = useToggle(isOpen);

onMounted(() => {
  if (props.active) {
    toggleDropdown()
  }
})


const baseClasses = [
  "cursor-pointer group flex items-center pl-5 pr-4 py-2 mt-1 border-l-4 text-sm font-medium focus:outline-none",
];
const { active, label } = props


</script>
<template>
  <div :class="isOpen ? 'bg-slate-50 dark:bg-slate-800' : ''">
    <div @click="toggleDropdown()">
      <span
        :class="props.active ? 'text-orangePropangol dark:text-orangePropangol bg-slate-50 dark:bg-slate-800 border-orangePropangol hover:border-orangePropangol' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700'"
        class="flex items-center py-2 pl-5 pr-4 mt-1 text-sm font-medium border-l-4 cursor-pointer group focus:outline-none">
        <slot name="icon" />
        <span class="flex-1 truncate" v-html="label"></span>


        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class="w-4 h-4 duration-200 transtition" :class="isOpen ? 'rotate-180' : ''">
          <path fill-rule="evenodd"
            d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
            clip-rule="evenodd" />
        </svg>

      </span>
    </div>
    <ul v-if="isOpen" class="space-y-1 bg-slate-50 dark:bg-slate-800 animate__animated animate__fadeIn">
      <slot name="content" />
    </ul>
  </div>
</template>