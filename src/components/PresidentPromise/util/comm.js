import { drop, } from 'lodash'
import { categories } from '../constants'

function promiseDataPreprocess (data) {
  const header = data[0]
  const content = drop(data)

  return content.map((promise) => {
    let promiseResult = {}
    promise.forEach((cell, i) => {
      promiseResult[header[i]] = cell
    })
    return promiseResult
  })
}

function getStatus (d) {
  if (d['有做到'] === 'v') {
    return 'done'
  } else if (d['進行中'] === 'v') {
    return 'wip'
  } else if (d['卡在哪裡'] && d['卡在哪裡'] !== '') {
    return 'stuck'
  } else {
    return undefined
  }
}

export function promiseDataInit (data) {
  const preprocessed = promiseDataPreprocess(data)
  return preprocessed.map((d, i) => ({
    pid: `promise-${d['pid']}`,
    title: d['承諾內容'],
    description: d['狀態'],
    source: d['來源'],
    sourceLink: d['來源網址'],
    category: d['標籤'].split(','),
    categoryEN: d['標籤'].split(',').map(chineseName => categories[chineseName]),
    promiseDone: d['有做到'] === 'v',
    isStuck: d['卡在哪裡'] && d['卡在哪裡'] !== '',
    status: getStatus(d),
    stuckReason: d['卡在哪裡'],
    surveyResult: 'no-ans'
  }))
}

// export function isElementReachEnd (ele, subele, offset = 0) {
//   if (!ele) {
//     return false
//   } else {
//     const vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
//     const scrollTop = ele.scrollTop
//     const subeleHeight = subele.clientHeight
//     return scrollTop >= subeleHeight - vh
//   }
// }