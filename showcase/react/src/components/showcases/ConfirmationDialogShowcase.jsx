import React, { useState } from 'react';
import ShowcaseSection, { VariantSection } from '../ShowcaseSection';

function ConfirmationDialogShowcase() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Confirmation Dialog Component</h1>
        <p className="text-lg text-gray-600">
          User confirmation dialogs for critical actions.
        </p>
      </div>

      <ShowcaseSection title="Confirmation Dialog Examples">
        <VariantSection title="Delete Confirmation">
          <button
            onClick={() => setShowDialog(true)}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
          >
            Delete Item
          </button>

          {showDialog && (
            <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-sm-2xl max-w-md w-full mx-4">
                <div className="p-6">
                  <div className="text-5xl mb-4">⚠️</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirm Deletion</h3>
                  <p className="text-gray-600">
                    Are you sure you want to delete this item? This action cannot be undone.
                  </p>
                </div>
                <div className="p-6 bg-gray-50 flex justify-end gap-2 rounded-b-xl">
                  <button
                    onClick={() => setShowDialog(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowDialog(false)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </VariantSection>

        <VariantSection title="Success Dialog">
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm-lg p-6 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
            <p className="text-gray-600 mb-6">
              Your action has been completed successfully.
            </p>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
              Continue
            </button>
          </div>
        </VariantSection>

        <VariantSection title="Warning Dialog">
          <div className="w-full max-w-md bg-white rounded-xl shadow-sm-lg p-6 text-center border-t-4 border-yellow-500">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Warning</h3>
            <p className="text-gray-600 mb-6">
              This action requires additional confirmation. Please review the details before proceeding.
            </p>
            <div className="flex gap-2 justify-center">
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg">
                Go Back
              </button>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                I Understand
              </button>
            </div>
          </div>
        </VariantSection>
      </ShowcaseSection>
    </div>
  );
}

export default ConfirmationDialogShowcase;
