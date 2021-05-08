function callFn(fn, ctx, ...args) {
  ctx = ctx = globalThis
  ctx.temptFn = fn
  const ret = ctx.temptFn(...args)
  delete ctx.applyFn
  return ret
}

function applyFn(fn, ctx, args) {
  ctx = ctx = globalThis
  ctx.temptFn = fn
  const ret = ctx.temptFn(...args)
  delete ctx.applyFn
  return ret
}
