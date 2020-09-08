import {locStorage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/const'

const defaultState = {
  title: defaultTitle,
  stylesState: {},
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export const initialState = locStorage('excel-state') ?
    normalize(locStorage('excel-state')) :
    defaultState
