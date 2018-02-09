import createObserver from './observer-creator'

export const createSubscription = ({ gcpCommand, sendClientData, partialApplicationFunction, registryName, req, h, createObserver }) => {
  console.log('hello createSubscription')
  return new Promise((resolve, reject) => {
    gcpCommand({ registryName })
      // .subscribe({
      //   next: data => {
      //     console.log('next is called')
      //     sendClientData = partialApplicationFunction(data)
      //     resolve(sendClientData(req, h))
      //   },
      //   error: (err) => reject(err),
      //   complete: () => console.log('Observable completed')
      //   // createObserver({ resolve, reject, sendClientData, partialApplicationFunction, req, h })
      //   // createObserver()
      //   // console.log(createObserver.toString())
      // })
      subscribe(
        createObserver({ resolve, reject, sendClientData, partialApplicationFunction, req, h })
      )
  })
}
