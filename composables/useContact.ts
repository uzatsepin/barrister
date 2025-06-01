import { useContactStore } from '~/stores/contact'

export const useContact = () => {
  const contactStore = useContactStore()

  return {
    // State
    isModalOpen: computed(() => contactStore.isModalOpen),
    isSubmitting: computed(() => contactStore.isSubmitting),
    isSuccess: computed(() => contactStore.isSuccess),
    error: computed(() => contactStore.error),
    
    // Actions
    openModal: () => contactStore.openModal(),
    closeModal: () => contactStore.closeModal(),
    
    // Store reference for direct access if needed
    contactStore
  }
} 