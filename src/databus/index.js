const URL = 'http://queue.donixtech.com/queue/weixin/?'
const RequestType = '&rsp=jsonp'

function requestUrl (param) {
  var url = URL + param + RequestType
  return url
}

export const shop = {
  lists: requestUrl('dis=shop/shoplists'),
  detail: requestUrl('dis=shop/shopDetail'),
  brand: requestUrl('dis=shop/shopBrand'),
  select: requestUrl('dis=shop/select_options')
}

export const num = {
  verify: requestUrl('dis=Num/verifyCode'),
  join: requestUrl('dis=Num/joinUser'),
  take: requestUrl('dis=Num/takeNum'),
  query: requestUrl('dis=Num/queryNum'),
  order: requestUrl('dis=Num/orderUserLists'),
  cancel: requestUrl('dis=Num/editUserOrder'),
  user: requestUrl('dis=Num/userCenter')
}

export const evaluate = {
  edit: requestUrl('dis=Evaluate/editEvaluate'),
  lists: requestUrl('dis=Evaluate/evaluateLists')
}
