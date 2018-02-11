import { observer } from './observer-creator'

export const createSubscription = ({
  gcpCommand,
  sendClientData,
  partialApplicationFunction,
  registryName,
  req,
  h,
  createObserver
}) => {
  return new Promise((resolve, reject) => {
    gcpCommand({ registryName })
      .subscribe(
        observer({ resolve, reject, sendClientData, partialApplicationFunction, req, h })
      )
  })
}
