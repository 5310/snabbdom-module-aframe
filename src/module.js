const patch = (oldVnode, vnode) => {
  const elm = vnode.elm

  const empty = {}

  const attrs = vnode.data.aframe
  if (attrs) {
    const oldAttrs = oldVnode.data.aframe || empty
    Object.keys(attrs)
      .forEach(name => elm.setAttribute(name, attrs[name], true))
    Object.keys(oldAttrs)
      .filter(name => !(name in attrs))
      .forEach(name => elm.removeAttribute(name))
  }

  const attrsUpdate = vnode.data.aframeUpdate || empty
  Object.keys(attrsUpdate)
    .forEach(name => elm.setAttribute(name, attrsUpdate[name]))

  const attrsClobber = vnode.data.aframeClobber || empty
  Object.keys(attrsClobber)
    .forEach(name => elm.setAttribute(name, attrsClobber[name], true))

  const attrsRemove = vnode.data.aframeRemove || empty
  Object.keys(attrsRemove)
    .forEach(name => elm.removeAttribute(name))
}

export default {
  create: patch,
  update: patch
}
