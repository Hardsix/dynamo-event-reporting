import hummus from 'hummus';
import memoryStreams from 'memory-streams';

// https://stackoverflow.com/questions/36766234/nodejs-merge-two-pdf-files-into-one-using-the-buffer-obtained-by-reading-them
/**
 * Concatenate two PDFs in Buffers
 * @param {Buffer} firstBuffer
 * @param {Buffer} secondBuffer
 * @returns {Buffer} - a Buffer containing the concactenated PDFs
 */
export const combinePDFBuffers = (firstBuffer: Buffer, secondBuffer: Buffer): Buffer => {
  const outStream = new memoryStreams.WritableStream();

  try {
    const firstPDFStream = new hummus.PDFRStreamForBuffer(firstBuffer);
    const secondPDFStream = new hummus.PDFRStreamForBuffer(secondBuffer);

    const pdfWriter = hummus.createWriterToModify(firstPDFStream, new hummus.PDFStreamForResponse(outStream));
    pdfWriter.appendPDFPagesFromPDF(secondPDFStream);
    pdfWriter.end();

    const newBuffer = outStream.toBuffer();
    outStream.end();

    return newBuffer;
  } catch (e) {
    outStream.end();
    throw new Error('Error during PDF combination: ' + e.message);
  }
};
