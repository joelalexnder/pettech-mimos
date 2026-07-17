"use client";



const NUMERO_WHATSAPP = "51952189680"; 
const MENSAJE_PRECARGADO =
  "Hola, vi la página de PetTech Mimos y quiero más información";

export default function WhatsAppWidget() {
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
    MENSAJE_PRECARGADO
  )}`;

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatea con nosotros por WhatsApp"
        className="wa-burbuja"
      >
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.837.744 5.5 2.05 7.8L.2 31.4a1 1 0 0 0 1.22 1.22l7.6-1.85A15.9 15.9 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.29 22.06c-.35.98-2.06 1.87-2.84 1.98-.73.11-1.65.16-2.66-.17-.61-.2-1.4-.46-2.4-.9-4.22-1.82-6.98-6.06-7.19-6.34-.21-.28-1.71-2.28-1.71-4.35 0-2.07 1.09-3.09 1.47-3.51.38-.42.84-.53 1.12-.53.28 0 .56.003.8.014.26.012.6-.098.94.72.35.84 1.18 2.9 1.28 3.11.11.21.18.46.04.74-.14.28-.21.46-.42.7-.21.25-.44.55-.63.74-.21.21-.42.44-.18.86.24.42 1.08 1.79 2.32 2.9 1.6 1.42 2.95 1.87 3.38 2.08.32.16.7.13.96-.15.33-.36.74-.96 1.16-1.55.3-.42.66-.49 1.1-.32.44.17 2.8 1.32 3.28 1.56.48.24.8.36.92.56.12.2.12 1.14-.23 2.13z" />
        </svg>
      </a>

      <style jsx>{`
        .wa-burbuja {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 60px;
          height: 60px;
          background-color: #25d366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          z-index: 9999;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
        }

        .wa-burbuja:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }

        .wa-burbuja svg {
          width: 32px;
          height: 32px;
          fill: #ffffff;
        }

        @media (max-width: 480px) {
          .wa-burbuja {
            bottom: 16px;
            right: 16px;
            width: 54px;
            height: 54px;
          }
        }
      `}</style>
    </>
  );
}
