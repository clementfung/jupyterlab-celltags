import { MakePrivateComponent } from './tag';

import { PrivacyWidget } from './privacywidget';

import * as React from 'react';
import StyleClasses from './styles';

const TagListStyleClasses = StyleClasses.TagListStyleClasses;

export interface TagListComponentProps {
  widget: PrivacyWidget;
  selectionStateHandler: (newState: string) => void;
}

export class TagListComponent extends React.Component<any, any> {
  constructor(props: TagListComponentProps) {
    super(props);
    this.state = { selected: this.props.selectedTag };
  }

  render() {
    return (
      <div>
        <div className={TagListStyleClasses.tagSubHeaderStyleClass}>
          Make Cell Private
        </div>
        <div className={TagListStyleClasses.tagHolderStyleClass}>
          <MakePrivateComponent widget={this.props.widget} />
        </div>
      </div>
    );
  }
}
