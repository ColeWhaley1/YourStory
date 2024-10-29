import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

interface StoryReaderProps {
  file: File | null;
}


interface DocumentLoadEvent {
  numPages: number;
}

const StoryReader: React.FC<StoryReaderProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: DocumentLoadEvent) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    let url: string | null = null;
    if (file) {
      url = URL.createObjectURL(file);

      return () => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      };
    }
  }, [file]);

  return (
    <div>
      {file ? (
        <>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((prev) => prev - 1)}
          >
            Previous
          </button>
          <button
            disabled={pageNumber >= (numPages ?? 0)}
            onClick={() => setPageNumber((prev) => prev + 1)}
          >
            Next
          </button>
        </>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default StoryReader;
