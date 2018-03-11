import { observer } from './observer-creator'

export const createSubscription = ({
  gcpCommand,
  partialApplicationFunction,
  registryName,
  createObserver
}) => {
  return new Promise((resolve, reject) => {
    gcpCommand({ registryName })
      .subscribe(
        observer({ resolve, reject, partialApplicationFunction })
      )
  })
}
