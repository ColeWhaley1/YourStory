import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';


const StoryReader = ({ file }: { file: File | null }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setFileUrl(null);
    }
  }, [file]);

  return (
    <div>
      {fileUrl ? (
        <>
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <div>
            <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>
              Previous
            </button>
            <button disabled={pageNumber >= (numPages || 0)} onClick={() => setPageNumber(pageNumber + 1)}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default StoryReader;
