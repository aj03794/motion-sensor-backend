export const observer = ({ resolve, reject, trackState }) => {
  return {
    next: data => {
      console.log('next is called')
      // console.log('data', data.deviceStates[0])
      trackState({ observer: { data: data ? true : false } })
      // const sendClientData = partialApplicationFunction(data)

      resolve(data)
    },
    error: (err) => reject(err),
    complete: () => console.log('Observable completed')
  }
}
