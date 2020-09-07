import {locStorage} from '@core/utils'
import {defaultStyles} from '@/const'

const defaultState = {
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
