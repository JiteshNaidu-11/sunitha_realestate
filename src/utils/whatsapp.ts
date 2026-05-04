export const WHATSAPP_NUMBER = "917738384100";

export const getWhatsAppLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const openWhatsApp = (message: string): void => {
  window.open(getWhatsAppLink(message), "_blank");
};
