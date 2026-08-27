import React, { useState } from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import FileUploader from '@fw-components/react/src/FileUploader';

function FileUploaderShowcase() {
  const [files, setFiles] = useState([]);

  const handleUpload = async (file) => {
    // Simulate upload
    return [{
      name: file.name,
      size: file.size,
      type: file.type,
      path: URL.createObjectURL(file),
      createdAt: new Date(),
      updatedAt: new Date()
    }];
  };

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">File Uploader</h1>
        <p className="text-muted-foreground">
          Drag and drop file upload interface.
        </p>
      </div>

      <ShowcaseSection title="File Uploader Examples">
        <VariantSection title="Multiple File Upload">
          <div className="w-full max-w-2xl">
            <FileUploader
              mode="microservice"
              value={files}
              onChange={setFiles}
              onUpload={handleUpload}
              multiple
              accept="image/*,.pdf,.doc,.docx"
            />
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default FileUploaderShowcase;
