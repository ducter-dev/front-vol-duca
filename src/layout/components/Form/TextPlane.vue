<script setup>
import { computed, onMounted, ref, useSlots } from 'vue'
import { useUUID } from "../../composables"

const UUID = ref(useUUID());

const props = defineProps({
    modelValue: [String, Number],
    Lname: {
        type: String,
        default: 'LTextPlane',
    },
    label: {
        type: String,
        default: '',
        required: false 
    },
    required: {
        type: Boolean,
        default: false,
    },
    id: {
        type: [String, Number],
        default: '_input',
        required: false,
    },
    for: {
        type: [String, Number],
        default: '_input',
        required: false
    },
    loading: {
        type: Boolean,
        default: false
    },
});

const baseLabelClasses = [
    'block mb-1 text-sm font-medium text-slate-900 dark:text-white',
]

const classesLabel = computed(() => [
    ...baseLabelClasses,
    {
        'text-red-700 dark:text-red-500': props.error,
    },
    {
        'peer-focus:text-blue-600 peer-focus:dark:text-blue-500': !props.error,
    },
    {
        'text-slate-400 dark:text-slate-500 cursor-not-allowed': props.disabled,
    },
    {
        'text-slate-500 dark:text-slate-400': !props.disabled,
    }
])
</script>
<template>
    <div  v-if="!loading">
        <label :for="`${UUID}${id}`" :class="classesLabel" class="" v-if="label">{{ label
        }}&nbsp;<span class="text-red-500" v-if="required">*</span></label>
        <div class="w-full text-sm text-slate-500 dark:text-slate-200">
            <slot />
        </div>
    </div>
    <div class="animate-pulse" v-else>
        <div class="h-3 rounded w-28 bg-slate-300 dark:bg-slate-600"></div>
        <div class="w-full h-4 mt-1 rounded bg-slate-300 dark:bg-slate-600"></div>
    </div>
</template>