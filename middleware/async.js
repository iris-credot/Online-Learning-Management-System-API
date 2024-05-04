// we only put this where there is async func 
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (err) {
      next(err)
      // console.log(err);
    }
  }
}

module.exports = asyncWrapper
