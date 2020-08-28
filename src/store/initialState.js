import {locStorage} from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
}

export const initialState = locStorage('excel-state') ?
    locStorage('excel-state') :
    defaultState
