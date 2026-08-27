import Modal from '@fw-components/react/src/Modal';
import Button from '@fw-components/react/src/Button';
import { useState } from 'react';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button title="Open Modal" onClick={() => setIsOpen(true)} />
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
          <p>This is the modal content. You can put any content here.</p>
        </Modal>
      </>
    );
  },
};

export const WithFooter = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button title="Open Modal" onClick={() => setIsOpen(true)} />
        <Modal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          title="Confirm Action"
          footer={
            <div className="flex gap-2 justify-end">
              <Button title="Cancel" variant="outline" onClick={() => setIsOpen(false)} />
              <Button title="Confirm" onClick={() => setIsOpen(false)} />
            </div>
          }
        >
          <p>Are you sure you want to proceed with this action?</p>
        </Modal>
      </>
    );
  },
};

export const LargeContent = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <>
        <Button title="Open Large Modal" onClick={() => setIsOpen(true)} />
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Terms and Conditions">
          <div className="space-y-4">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </Modal>
      </>
    );
  },
};
