// composables/useConfirmation.ts
import { ref } from 'vue'

export interface ConfirmationOptions {
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'default' | 'danger' | 'warning'
  icon?: string
}

interface ConfirmationState extends ConfirmationOptions {
  isOpen: boolean
  resolve: ((value: boolean) => void) | null
}

const state = ref<ConfirmationState>({
  isOpen: false,
  resolve: null,
  title: 'Are you sure?',
  description: undefined,
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  variant: 'default',
  icon: undefined,
})

export function useConfirmation() {
  function confirm(options: ConfirmationOptions = {}): Promise<boolean> {
    return new Promise((resolve) => {
      state.value = {
        isOpen: true,
        resolve,
        title: options.title ?? 'Are you sure?',
        description: options.description,
        confirmLabel: options.confirmLabel ?? 'Confirm',
        cancelLabel: options.cancelLabel ?? 'Cancel',
        variant: options.variant ?? 'default',
        icon: options.icon,
      }
    })
  }

  function _resolve(value: boolean) {
    state.value.resolve?.(value)
    state.value.isOpen = false
    state.value.resolve = null
  }

  return {
    confirm,
    // Only the modal component should use these:
    _state: state,
    _resolve,
  }
}