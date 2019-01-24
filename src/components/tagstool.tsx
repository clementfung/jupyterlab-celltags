import { PrivacyWidget } from './privacywidget';

import { TagListComponent } from './tagslist';

import { PanelLayout } from '@phosphor/widgets';

import { CellTools, INotebookTracker } from '@jupyterlab/notebook';

import { Message } from '@phosphor/messaging';

//import { ObservableJSON } from '@jupyterlab/observables';

import { JupyterLab } from '@jupyterlab/application';

import * as React from 'react';
//import StyleClasses from './styles';

const TAG_TOOL_CLASS = 'jp-cellTags-Tools';

export enum EditingStates {
  none,
  currentCell,
  allCells
}

export interface TagsToolComponentProps {
  widget: PrivacyWidget;
}

export interface TagsToolComponentState {
  selected: any;
  editingSelectedTag: EditingStates;
  deletingTag: boolean;
}

export class TagsToolComponent extends React.Component<any, any> {
  constructor(props: TagsToolComponentProps) {
    super(props);
    this.state = {
      selected: null,
      editingSelectedTag: EditingStates.none,
      deletingTag: false
    };
    this.node = null;
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e: any) => {
    if (this.node) {
      if (this.node.contains(e.target)) {
        return;
      }
      this.setState({ deletingTag: false });
      this.node = null;
    }
  };

  render() {
    return (
      <div>
        <TagListComponent widget={this.props.widget} />
      </div>
    );
  }

  private node: any;
}

export class TagsTool extends CellTools.Tool {
  constructor(notebook_Tracker: INotebookTracker, app: JupyterLab) {
    super();
    this.notebookTracker = notebook_Tracker;
    let layout = (this.layout = new PanelLayout());
    this.addClass(TAG_TOOL_CLASS);
    this.widget = new PrivacyWidget(notebook_Tracker);
    layout.addWidget(this.widget);
  }

  /**
   * Handle a change to the active cell.
   */
  protected onActiveCellChanged(msg: Message): void {
    this.widget.currentActiveCell = this.parent.activeCell;
  }

  /* protected onMetadataChanged(msg: ObservableJSON.ChangeMessage): void {
    if (!this.widget.tagsListShallNotRefresh) {
      this.widget.validateMetadataForActiveCell();
    }
  }*/

  private widget: PrivacyWidget = null;
  public notebookTracker: INotebookTracker = null;
}
