type Config = {
  debug: boolean
  name: string
}

interface ConfigLoader {
  load: () => Config
}

export type {Config, ConfigLoader}
