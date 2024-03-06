<script setup>
import { ref, computed } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import Button from '@/layout/components/Button.vue'
const emit = defineEmits(['submit', 'openModal', 'closeModal', 'closeModalBackdrop'])

const closeModal = () => {
  emit('closeModal')
}
const openModal = () => {
  emit('openModal')
}

const handleSubmit = () => {
  emit('submit')
}

const closeModalBackdrop = () => {
  emit('closeModalBackdrop')
}

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator(value) {
      return ['sm', 'md', 'lg', 'xl'].includes(value)
    }
  },
  position: {
    type: String,
    default: 'center',
    validator(value) {
      return ['center', 'top'].includes(value)
    }
  }
})

const { size, position, isOpen } = props

const baseModalPositionClasses = ['fixed overflow-y-auto']

const baseDialogPanel = [
  'w-full text-left align-middle transition-all transform bg-white rounded-lg shadow-xl top-4 dark:bg-slate-700'
]

const sizeClasses = [
  {
    'max-w-sm': size == 'sm',
    'max-w-md': size == 'md',
    'max-w-lg': size == 'lg',
    'max-w-xl': size == 'xl',
    'max-w-2xl': size == '2xl'
  }
]

const classesModalPosition = computed(() => [
  ...baseModalPositionClasses,
  {
    'inset-0 ': props.position == 'center',
    'top-0 left-0 right-0': props.position == 'top'
  }
])

const classesBaseDialogPanel = computed(() => [
  ...baseDialogPanel,
  ...sizeClasses,
  {
    fixed: props.position == 'top'
  }
])
</script>
<template>
  <div @click="openModal" class="flex">
    <slot name="trigger" />
  </div>
  <TransitionRoot appear :show="props.isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModalBackdrop">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-20" style="backdrop-filter: blur(3px)" />
      </TransitionChild>

      <div :class="classesModalPosition">
        <div class="flex items-center justify-center min-h-full p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel :class="classesBaseDialogPanel">
              <!-- Modal header -->
              <DialogTitle as="div" class="flex items-start justify-between p-4 border-b rounded-t dark:border-slate-600">
                <div class="flex flex-col">
                  <h3 class="text-xl font-semibold text-slate-900 dark:text-white">
                    <slot name="title"></slot>
                  </h3>
                  <p class="mt-1 text-sm text-slate-400">
                    <slot name="description"></slot>
                  </p>
                </div>
                <button type="button"
                  class="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white"
                  @click="closeModal">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </DialogTitle>

              <!-- Modal body -->
              <div class="p-6">
                <slot name="content"></slot>
              </div>
              <!-- Modal footer -->
              <div
                class="flex items-center justify-end p-6 space-x-2 border-t rounded-b border-slate-200 dark:border-slate-600">
                <Button variant="transparent" type="button" @click="closeModal"> Cancelar </Button>

                <div @click="handleSubmit">
                  <slot name="actions"></slot>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
