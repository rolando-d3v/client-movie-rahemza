import { useState, useEffect, useRef, useCallback, memo } from "react";
import styles from "./preguntas.module.css";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

/* Componente memoizado para evitar re-renders innecesarios
   durante el drag o cuando cambia el estado de zoom */
const PdfPage = memo(function PdfPage({ pageNumber, width }) {
  return (
    <Page
      pageNumber={pageNumber}
      renderTextLayer={false}
      renderAnnotationLayer={false}
      width={width}
    />
  );
});

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

const reglamentos = [
  {
    id: 0,
    name: "BIBLIOGRAFIA DESARROLLADA DE SO2 PARA SO1 ( INTG OPERATIVO) PROM 2026",
    url: "RB DESARROLLADA DE SO2 PARA SO1 ( INTG OPERATIVO) PROM 2026_R.pdf",
  },
  {
    id: 1,
    name: "BIBLIOGRAFIA DESARROLLADAS DE SO1 PARA TCO3 ( INTG OPERATIVO) PROM 2026",
    url: "RB DESARROLLADAS DE SO1 PARA TCO3 ( INTG OPERATIVO) PROM 2026_R.pdf",
  },
  {
    id: 2,
    name: "BIBLIOGRAFIA DESARROLLADA DE TCO3 PARA TCO2 ( INTG OPERATIVO) PROM 2026",
    url: "RB DESARROLLADA DE TCO3 PARA TCO2 ( INTG OPERATIVO) PROM 2026_R.pdf",
  },
  {
    id: 3,
    name: "BIBLIOGRAFIA DESARROLLADAS DE TCO2 PARA TCO1 ( INTG OPERATIVO) PROM 2026",
    url: "RB DESARROLLADAS DE TCO2 PARA TCO1 ( INTG OPERATIVO) PROM 2026_R.pdf",
  },
];

export default function Libros({ data, title }) {
  const [modal, setModal] = useState(false);
  const [urlPdf, setUrlPdf] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);

  /* Zoom & Drag states */
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setContainerWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  /* ---- Zoom handlers ---- */
  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - SCALE_STEP, MIN_SCALE));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  /* ---- Drag handlers (mouse) ---- */
  const handleMouseDown = useCallback((e) => {
    if (scale <= 1) return; // solo arrastrar cuando está zoomed
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  }, [scale, position]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) containerRef.current.style.cursor = scale > 1 ? 'grab' : 'default';
  }, [scale]);

  /* ---- Drag handlers (touch) ---- */
  const handleTouchStart = useCallback((e) => {
    if (scale <= 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    dragStart.current = { x: touch.clientX - position.x, y: touch.clientY - position.y };
  }, [scale, position]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.current.x,
      y: touch.clientY - dragStart.current.y,
    });
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  /* Reset zoom/position when modal closes or changes PDF */
  const closeModal = useCallback(() => {
    setModal(false);
    setNumPages(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = '';
  }, []);

  const openModal = useCallback((url) => {
    setUrlPdf(url);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setModal(true);
    document.body.style.overflow = 'hidden';
  }, []);

  /* Prevent text selection while dragging */
  useEffect(() => {
    if (!isDragging) return;
    const prevent = (e) => e.preventDefault();
    window.addEventListener('selectstart', prevent);
    return () => window.removeEventListener('selectstart', prevent);
  }, [isDragging]);

  /* Wheel zoom (solo con Ctrl/Cmd presionado) */
  const handleWheel = useCallback((e) => {
    if (!e.ctrlKey && !e.metaKey) return; // permite scroll nativo si no hay Ctrl
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + SCALE_STEP / 2, MAX_SCALE));
    } else {
      setScale((prev) => Math.max(prev - SCALE_STEP / 2, MIN_SCALE));
    }
  }, []);

  const baseWidth = containerWidth > 768 ? 700 : containerWidth - 20;

  return (
    <div className={styles.curso}>
      <header>
        <h5 className={styles.title}>{title}</h5>
      </header>
      <section className={styles.content_libros} aria-label="Lista de bibliografía disponible">
        {data?.map((ma) => (
          <article
            key={ma.id}
            className={styles.item_libro}
            onClick={() => openModal(ma.url)}
            role="button"
            tabIndex={0}
            aria-label={`Ver PDF: ${ma.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') openModal(ma.url);
            }}
          >
            <span className={styles.nombre}>{ma.name}</span>
            <div className={styles.div_icon} aria-hidden="true">
              <img
                src="/images/icons/pdf_2.png"
                alt="Icono PDF"
                width={22}
                height={22}
                className={styles.img}
                loading="lazy"
              />
            </div>
          </article>
        ))}
      </section>

      {modal === true && (
        <div className={styles.div_pdf}>
          {/* Toolbar */}
          <div className={styles.pdf_toolbar}>
            <div className={styles.pdf_toolbar_left}>
              <button
                className={styles.btn_toolbar}
                type="button"
                onClick={zoomOut}
                disabled={scale <= MIN_SCALE}
                aria-label="Alejar"
                title="Alejar"
              >
                −
              </button>
              <span className={styles.zoom_label}>{Math.round(scale * 100)}%</span>
              <button
                className={styles.btn_toolbar}
                type="button"
                onClick={zoomIn}
                disabled={scale >= MAX_SCALE}
                aria-label="Acercar"
                title="Acercar"
              >
                +
              </button>
              <button
                className={styles.btn_toolbar}
                type="button"
                onClick={resetZoom}
                aria-label="Restablecer zoom"
                title="Restablecer zoom"
              >
                ↺
              </button>
            </div>
            <button
              className={styles.btn_close}
              type="button"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>

          <div
            ref={containerRef}
            className={styles.pdf_container}
            style={{ cursor: scale > 1 ? 'grab' : 'default' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            <div
              className={styles.pdf_content}
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: isDragging ? 'none' : 'transform 200ms ease',
                zoom: scale,
              }}
            >
              <Document
                file={`/libros/${urlPdf}`}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div className={styles.pdf_loading}>Cargando PDF...</div>}
                error={<div className={styles.pdf_error}>Error al cargar el PDF.</div>}
              >
                {numPages && Array.from(new Array(numPages), (el, index) => (
                  <div key={`page_${index + 1}`} className={styles.pdf_page}>
                    <PdfPage
                      pageNumber={index + 1}
                      width={baseWidth}
                    />
                  </div>
                ))}
              </Document>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
