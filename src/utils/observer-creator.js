export const createObserver = ({ resolve, reject, sendClientData, partialApplicationFunction, req, h }) => {
  return {
    // observer: {
    //   next: data => {
    //     console.log('next is called')
    //     sendClientData = partialApplicationFunction(data)
    //     resolve(sendClientData(req, h))
    //   },
    //   error: (err) => reject(err),
    //   complete: () => console.log('Observable completed')
    // }
  }
}
