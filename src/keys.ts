const keyState: { [key: string]: boolean } = {}

export function initKeyListeners(keyCallbackMap: {
  [key: string]: () => void
}) {
  const keysToListenFor = Object.keys(keyCallbackMap)
  keysToListenFor.forEach(key => (keyState[key] = false))

  document.addEventListener('keydown', (e: any) => {
    if (!e.target || e.target.tagName !== 'BODY') {
      return
    }

    const { key } = e

    if (keyState[key] === undefined) {
      return
    }
    const untriggered = !keyState[key]
    if (untriggered) {
      keyState[key] = true
      keyCallbackMap[key]()
    }
  })
  document.addEventListener('keyup', ({ key }) => {
    if (keyState[key] === undefined) {
      return
    }
    keyState[key] = false
  })
}
