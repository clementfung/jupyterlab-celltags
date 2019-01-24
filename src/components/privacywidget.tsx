import { Cell, ICellModel } from '@jupyterlab/cells';

import { INotebookTracker } from '@jupyterlab/notebook';

import { Widget } from '@phosphor/widgets';

import { make_private } from './celltags';

import { TagsToolComponent } from './tagstool';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

export class PrivacyWidget extends Widget {
  constructor(notebook_Tracker: INotebookTracker) {
    super();
    this.notebookTracker = notebook_Tracker;
    Private.setWidget(this);
    Private.renderAllTagsNode();
  }

  cellModelIsPrivate(cellModel: ICellModel) {
    let isPrivate = cellModel.metadata.get('private');
    if (isPrivate === undefined || !isPrivate) {
      return false;
    }
    return true;
  }

  isPrivate(cell: Cell) {
    if (cell === null) {
      return false;
    }
    return this.cellModelIsPrivate(cell.model);
  }

  activeCellIsPrivate() {
    return this.isPrivate(this.currentActiveCell);
  }

  makeActiveCellPrivate() {
    make_private(this.currentActiveCell);
    //this.loadTagsForActiveCell();
  }

  currentActiveCell: Cell = null;
  notebookTracker: INotebookTracker = null;
}

namespace Private {
  let widget: PrivacyWidget = null;

  export function setWidget(currentWidget: PrivacyWidget) {
    widget = currentWidget;
  }

  export function renderAllTagsNode() {
    ReactDOM.render(<TagsToolComponent widget={widget} />, widget.node);
  }
}
