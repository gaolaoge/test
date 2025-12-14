Function.prototype.myCall = function (context, ...args) {
  context = context || window
  const fnKey = Symbol()
  context[fnKey] = this
  const res = context[fnKey](...args)
  delete context[fnKey]
  return res
}

Function.prototype.myApply = function (context, args) {
  context = context || window
  const fnKey = Symbol()
  context[fnKey] = this
  const res = args ? context[fnKey](...args) : context[fnKey]()
  delete context[fnKey]
  return res
}

export {}
