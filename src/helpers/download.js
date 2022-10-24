import FileDownload from 'js-file-download';

// tries to extract the filename from S3 response headers
const extractFileName = responseHeaders => {
  if (!responseHeaders || !responseHeaders['content-disposition']) {
    return 'unknown-filename';
  }
  const cdh = responseHeaders['content-disposition'];
  return cdh.split('"')[1]; // attachment; filename="test-file-1.pdf" => ['attachment; filename=', 'test-file-1.pdf', '']
};

export const download = (file, responseHeaders) => FileDownload(file, extractFileName(responseHeaders));
