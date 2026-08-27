import React from 'react';
import { useParams } from 'react-router-dom';
import ButtonShowcase from './showcases/ButtonShowcase';
import InputShowcase from './showcases/InputShowcase';
import SelectShowcase from './showcases/SelectShowcase';
import BadgeShowcase from './showcases/BadgeShowcase';
import CardShowcase from './showcases/CardShowcase';
import ModalShowcase from './showcases/ModalShowcase';
import TooltipShowcase from './showcases/TooltipShowcase';
import AvatarShowcase from './showcases/AvatarShowcase';
import SpinnerShowcase from './showcases/SpinnerShowcase';
import ProgressBarShowcase from './showcases/ProgressBarShowcase';
import TableShowcase from './showcases/TableShowcase';
import DatePickerShowcase from './showcases/DatePickerShowcase';
import ActionMenuShowcase from './showcases/ActionMenuShowcase';
import DropdownMenuShowcase from './showcases/DropdownMenuShowcase';
import ChartShowcase from './showcases/ChartShowcase';
import StatCardShowcase from './showcases/StatCardShowcase';
import EmptyStateShowcase from './showcases/EmptyStateShowcase';
import EditorShowcase from './showcases/EditorShowcase';
import FileUploaderShowcase from './showcases/FileUploaderShowcase';
import FileViewerShowcase from './showcases/FileViewerShowcase';
import FilePreviewShowcase from './showcases/FilePreviewShowcase';
import DragAndDropShowcase from './showcases/DragAndDropShowcase';
import InfiniteScrollShowcase from './showcases/InfiniteScrollShowcase';
import ConfirmationDialogShowcase from './showcases/ConfirmationDialogShowcase';

const showcaseComponents = {
  button: ButtonShowcase,
  input: InputShowcase,
  select: SelectShowcase,
  badge: BadgeShowcase,
  card: CardShowcase,
  modal: ModalShowcase,
  tooltip: TooltipShowcase,
  avatar: AvatarShowcase,
  spinner: SpinnerShowcase,
  progressbar: ProgressBarShowcase,
  table: TableShowcase,
  datepicker: DatePickerShowcase,
  actionmenu: ActionMenuShowcase,
  dropdownmenu: DropdownMenuShowcase,
  chart: ChartShowcase,
  statcard: StatCardShowcase,
  emptystate: EmptyStateShowcase,
  editor: EditorShowcase,
  fileuploader: FileUploaderShowcase,
  fileviewer: FileViewerShowcase,
  filepreview: FilePreviewShowcase,
  draganddrop: DragAndDropShowcase,
  infinitescroll: InfiniteScrollShowcase,
  confirmationdialog: ConfirmationDialogShowcase,
};

function ComponentShowcase() {
  const { componentId } = useParams();
  const ShowcaseComponent = showcaseComponents[componentId];

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="container max-w-6xl mx-auto py-8 px-6">
        {ShowcaseComponent ? <ShowcaseComponent /> : (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-foreground mb-4">Component Not Found</h2>
            <p className="text-muted-foreground">The component "{componentId}" doesn't exist. Please select a component from the sidebar.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComponentShowcase;
