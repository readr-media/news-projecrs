import _ from 'lodash'
import {
  getReports,
  getSheet,
  appendSheet,
  getDriveFile,
} from '../api'

export default {
  FETCH_REPORTS: ({ state, commit }, { params }) => {
    return getReports({ params })
    .then(({ status, body }) => {
      let orig
      if (status === 200) {
        if (params.page > 1) {
          orig = _.values(_.get(state, 'reports', []))
          body.items = _.concat(orig, body.items)
        }
        commit('SET_REPORTS', { reports: body.items })
      }
    })
    .catch(err => {
      console.error('Error while fetching sheet', err)
    })
  },
  FETCH_SHEET: ({ state }, { params }) => {
    return getSheet({ params })
    .then(({ status, body }) => {
      return { status, body }
    })
    .catch(err => {
      console.error('Error while fetching sheet', err)
    })
  },
  APPEND_SHEET: ({ state }, { params }) => {
    return appendSheet({ params })
    .then(({ status, body }) => {
      return { status, body }
    })
    .catch(err => {
      console.error('Error while appending sheet', err)
    })
  },
  FETCH_DRIVE_FILE: ({ state }, { params }) => {
    return getDriveFile({ params })
    .then(({ status, body }) => {
      return { status, body }
    })
    .catch(err => {
      console.error('Error while fetching sheet', err)
    })
  },
}
