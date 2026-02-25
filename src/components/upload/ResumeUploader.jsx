import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadResume } from '../../api/resumeApi';

function ResumeUploader({ onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      try {
        setUploading(true);
        setError('');
        const res = await uploadResume(file);
        onUploaded?.(res.data.data.resume);
      } catch (err) {
        setError(err.response?.data?.message || 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [onUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
  });

  return (
    <section className="up-uploader-card">
      <div {...getRootProps()} className={`up-dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <h4>Drag and drop your resume</h4>
        <p>PDF, DOC, DOCX up to 5MB</p>
      </div>
      {uploading && <p className="up-muted">Uploading and parsing...</p>}
      {error && <p className="up-error">{error}</p>}
    </section>
  );
}

export default ResumeUploader;
