import { PrivacyWidget } from './privacywidget';

import * as React from 'react';
import StyleClasses from './styles';
import { EditingStates } from './tagstool';

const TagStyleClasses = StyleClasses.TagStyleClasses;

export interface TagComponentProps {
  widget: PrivacyWidget;
  finishEditingHandler: (newName: string) => void;
  selectionStateHandler: (newState: string) => void;
  editingStateHandler: (newState: EditingStates) => void;
  selectedTag: string | null;
  inputShouldShow: boolean;
  tag: string;
}

export interface TagComponentState {
  addingNewTag: boolean;
}

export abstract class TagComponent extends React.Component<
  TagComponentProps,
  TagComponentState
> {
  constructor(props: TagComponentProps) {
    super(props);
    this.state = { addingNewTag: false };
  }

  abstract singleCellOperationHandler(name: string): void;
  abstract singleCellOperationButton(
    name: string,
    operation: (event: React.MouseEvent<any>) => void
  ): JSX.Element;
  abstract addButtonOperationHandler(event: React.MouseEvent<any>): void;

  render() {
    const inputShouldShow = this.props.inputShouldShow as boolean;
    const tag = this.props.tag as string;
    let button;
    if (inputShouldShow) {
      button = (
        <label className={TagStyleClasses.tagIconLabelStyleClass}>
          {this.singleCellOperationButton(
            tag,
            (event: React.MouseEvent<any>) => {
              event.stopPropagation();
              this.addButtonOperationHandler(event);
            }
          )}
        </label>
      );
    } else {
      button = (
        <label className={TagStyleClasses.tagIconLabelStyleClass}>
          {this.singleCellOperationButton(
            tag,
            (event: React.MouseEvent<any>) => {
              event.stopPropagation();
              this.singleCellOperationHandler(tag);
            }
          )}
        </label>
      );
    }
    return (
      <div>
        <label
          className={TagStyleClasses.tagLabelStyleClass}
          ref={label => inputShouldShow && label && label.focus()}
          contentEditable={inputShouldShow}
          suppressContentEditableWarning={true}
          key={new Date().toLocaleTimeString()}
          onFocus={event => document.execCommand('selectAll', false, null)}
          onKeyDown={event => {
            if (event.keyCode == 13) {
              let value = (event.target as HTMLLabelElement).innerHTML;
              this.props.finishEditingHandler(value);
            }
          }}
          onBlur={event => {
            let inputElement = event.target as HTMLLabelElement;
            inputElement.innerHTML = tag;
            this.props.editingStateHandler(EditingStates.none);
          }}
        >
          {tag}
        </label>
        {button}
      </div>
    );
  }
}

export class TagForAllCellsComponent extends TagComponent {
  singleCellOperationHandler() {
    (this.props.widget as PrivacyWidget).makeActiveCellPrivate();
  }

  addButtonOperationHandler(event: React.MouseEvent<any>) {
    let value = (event.target as HTMLLabelElement).innerHTML;
    this.props.finishEditingHandler(value);
  }

  singleCellOperationButton(
    name: string,
    operation: (event: React.MouseEvent<any>) => void
  ) {
    if (this.props.inputShouldShow as boolean) {
      return (
        <img
          onClick={event => operation(event)}
          alt="Make Private"
          title="Make Private"
          src={require('../../static/add_blue.svg')}
          className={TagStyleClasses.tagIconStyleClass}
        />
      );
    } else if ((this.props.selectedTag as string) === name) {
      return (
        <img
          onClick={event => operation(event)}
          alt="Make Private"
          title="Make Private"
          src={require('../../static/add_blue.svg')}
          className={TagStyleClasses.tagIconStyleClass}
        />
      );
    } else {
      return (
        <img
          onClick={event => operation(event)}
          alt="Make Private"
          title="Make Private"
          src={require('../../static/add_blue.svg')}
          className={TagStyleClasses.tagIconStyleClass}
        />
      );
    }
  }
}

export interface MakePrivateComponentProps {
  widget: PrivacyWidget;
}

export interface PrivacyTagComponentState {
  plusIconShouldHide: boolean;
  addingNewTag: boolean;
}

export class MakePrivateComponent extends React.Component<
  MakePrivateComponentProps,
  PrivacyTagComponentState
> {
  constructor(props: MakePrivateComponentProps) {
    super(props);
    this.state = { plusIconShouldHide: false, addingNewTag: false };
  }

  addTagOnClick(event: React.MouseEvent<any>) {
    (this.props.widget as PrivacyWidget).makeActiveCellPrivate();
  }

  /*  
    Was used for tag name entry. Might need something like this

    addTagOnKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    let inputElement = event.target as HTMLInputElement;
    let tmp = document.createElement('span');
    tmp.className = TagStyleClasses.defaultAddInputStyleClass;
    tmp.innerHTML = inputElement.value;
    document.body.appendChild(tmp);
    inputElement.style.width = tmp.getBoundingClientRect().width + 8 + 'px';
    document.body.removeChild(tmp);
    if (event.keyCode == 13) {
      let value = inputElement.value;
      inputElement.value = '';
      this.finishedAddingTag(value);
      inputElement.value = 'Add Tag';
      inputElement.style.width = '50px';
      inputElement.style.minWidth = '50px';
      inputElement.blur();
      this.setState({ plusIconShouldHide: false, addingNewTag: false });
    }
  }*/

  render() {
    var privateButton = (
      <div
        className={TagStyleClasses.blankAddInputStyleClass}
        onClick={event => this.addTagOnClick(event)}
      >
        <span className={TagStyleClasses.addTagSpanStyleClass}>
          Make Private
        </span>
        <img
          src={require('../../static/add_icon.svg')}
          className={TagStyleClasses.inputIconStyleClass}
          onClick={event => this.addTagOnClick(event)}
        />
      </div>

      /*<div>
        <input
          className={TagStyleClasses.defaultAddInputStyleClass}
          onClick={event => this.addTagOnClick(event)}
          autoFocus
        />
      </div>*/
    );
    return (
      <div className={TagStyleClasses.addTagStyleClass}>{privateButton}</div>
    );
  }
}
