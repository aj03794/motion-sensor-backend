import { observer } from './observer-creator'

export const createSubscription = ({
  gcpCommand,
  registryName,
  trackState
}) => {
  return new Promise((resolve, reject) => {
      trackState({ createSubscription: { gcpCommand: gcpCommand.name, registryName } })
    gcpCommand({ registryName, trackState })
      .subscribe(
        observer({ resolve, reject, trackState })
      )
  })
}
