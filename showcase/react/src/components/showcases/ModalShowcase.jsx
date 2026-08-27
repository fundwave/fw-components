import React, { useState } from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';
import Modal, { ZIndexManager } from '@fw-components/react/src/Modal';

function ModalShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const [rightModalOpen, setRightModalOpen] = useState(false);

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Modal</h1>
        <p className="text-muted-foreground">
          Dialog overlays for focused user interactions.
        </p>
      </div>

      <ShowcaseSection
        title="Modal Examples"
        description="Different modal configurations"
      >
        <VariantSection title="Center Modal">
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Open Center Modal
          </button>

          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Modal Title"
            position="center"
          >
            <div className="space-y-4">
              <p className="text-muted-foreground">
                This is a modal dialog. It overlays the main content and requires user interaction.
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  Confirm
                </button>
              </div>
            </div>
          </Modal>
        </VariantSection>

        <VariantSection title="Right Sidebar Modal">
          <button
            onClick={() => setRightModalOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Open Right Modal
          </button>

          <Modal
            isOpen={rightModalOpen}
            onClose={() => setRightModalOpen(false)}
            title="Side Panel"
            position="right"
            width="400px"
          >
            <div className="space-y-4">
              <p className="text-muted-foreground">
                This modal slides in from the right side, useful for side panels and settings.
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full px-3 py-2 border border-border rounded-lg"
                />
                <textarea
                  placeholder="Add a message..."
                  rows="3"
                  className="w-full px-3 py-2 border border-border rounded-lg resize-none"
                />
              </div>
            </div>
          </Modal>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default ModalShowcase;
