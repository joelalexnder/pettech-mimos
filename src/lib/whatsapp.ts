// -> Ej: La función generarLinkWhatsApp() que transforma
//    un texto en una URL 'wa.me/...' para vender.

export const generarLinkWhatsApp = (mensaje: string): string => {
    const numeroEmpresa = "952189680"; // cambiar numero
    const url = `https://wa.me/${numeroEmpresa}?text=${encodeURIComponent(mensaje)}`;
    return url;
};