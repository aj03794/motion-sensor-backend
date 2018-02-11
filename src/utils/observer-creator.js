export const observer = ({ resolve, reject, partialApplicationFunction }) => {
  return {
    next: data => {
      console.log('next is called')
      const sendClientData = partialApplicationFunction(data)
      resolve(sendClientData())
    },
    error: (err) => reject(err),
    complete: () => console.log('Observable completed')
  }
}
