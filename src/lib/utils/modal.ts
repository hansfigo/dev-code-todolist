export const openModal = (modalId : string) => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
        modal.showModal();
    }
};