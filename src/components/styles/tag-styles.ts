import { style } from 'typestyle';
import SharedStyles from './shared-styles';

export namespace TagStyleClasses {
  export const tagLabelStyleClass = style({
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    overflow: 'hidden',
    boxSizing: 'border-box',
    paddingRight: '25px',
    paddingTop: '0px',
    marginTop: '-1px',
    marginBottom: '0px',
    outline: 'none'
  });

  export const defaultAddInputStyleClass = style(
    SharedStyles.tagInputStyleProperties,
    {
      width: '64.52px',
      minWidth: '64.52px'
    }
  );

  export const blankAddInputStyleClass = style(
    SharedStyles.tagInputStyleProperties,
    {
      display: 'inline',
      whiteSpace: 'nowrap',
      backgroundColor: 'transparent',
      minWidth: '64.52px'
    }
  );

  export const addTagStyleClass = style(SharedStyles.tagStyleProperties, {
    //backgroundColor: '#dd7777',
    backgroundColor: 'var(--jp-layout-color1)',
    border: '1px solid var(--jp-layout-color4)',
    paddingTop: '4px',
    maxWidth: '95%',
    minHeight: '26px',
    maxHeight: '26px'
  });

  export const addTagDefaultStyleClass = style(
    SharedStyles.tagStyleProperties,
    {
      backgroundColor: 'var(--jp-layout-color1)',
      border: '1px solid var(--jp-layout-color4)',
      paddingTop: '4px',
      maxWidth: '95%',
      minHeight: '26px',
      maxHeight: '26px',
      $nest: {
        '&:hover': {
          backgroundColor: 'var(--jp-layout-color2)'
        }
      }
    }
  );

  export const tagIconStyleClass = style({
    marginLeft: '10px',
    marginTop: '2px',
    right: '0px',
    marginBottom: '-1px',
    height: '12px',
    position: 'absolute'
  });

  export const inputIconStyleClass = style({
    marginLeft: '5px',
    marginTop: '1px',
    marginBottom: '-2px',
    height: '13px'
  });

  export const tagIconLabelStyleClass = style({
    position: 'absolute'
  });

  export const addTagSpanStyleClass = style({});
}
