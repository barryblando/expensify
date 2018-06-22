export const devSignale = {
  stream: process.stdout,
  scope: 'Development',
  types: {
    listening: {
      badge: '🛠️  👂',
      color: 'blue',
      label: 'Listening',
    },
    error: {
      badge: '❌  🚧',
      color: 'red',
      label: 'Error',
    },
    warning: {
      badge: '⚠️  🚧',
      color: 'yellow',
      label: 'Warning',
    },
    success: {
      badge: '👏  🎉',
      color: 'green',
      label: 'Success',
    },
    building: {
      badge: '🛠️  👷‍',
      color: 'yellow',
      label: 'Building',
    },
  },
};

export const prodSignale = {
  stream: process.stdout,
  scope: 'Production',
  types: {
    listening: {
      badge: '🛠️  👂',
      color: 'blue',
      label: 'Listening',
    },
    error: {
      badge: '❌  🚧',
      color: 'red',
      label: 'Error',
    },
    warning: {
      badge: '⚠️  🚧',
      color: 'yellow',
      label: 'Warning',
    },
    success: {
      badge: '👏  🎉',
      color: 'green',
      label: 'Success',
    },
    building: {
      badge: '🛠️  👷‍',
      color: 'yellow',
      label: 'Building',
    },
  },
};
