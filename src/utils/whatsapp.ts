export const WHATSAPP_NUMBER = "919819893359";

export const getWhatsAppLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const openWhatsApp = (message: string): void => {
  window.open(getWhatsAppLink(message), "_blank");
};
