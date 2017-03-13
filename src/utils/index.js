function locate (success, failure) {
  let navigator = window.navigator
  try {
    navigator.geolocation.getCurrentPosition(success, failure)
  } catch (err) {
    failure(err)
  }
}

export {
  locate
}
