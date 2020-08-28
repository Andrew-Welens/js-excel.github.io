import {locStorage} from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: ''
}

export const initialState = locStorage('excel-state') ?
    locStorage('excel-state') :
    defaultState
