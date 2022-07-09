import Toast from 'react-native-root-toast';

type Options = {
  duration?: number;
};

export function showError(message: string, options?: Options) {
  // TODO: Not accounting for dark theme
  Toast.show(message, {
    duration: options?.duration ?? 1500,
    opacity: 0.9,
    containerStyle: {
      backgroundColor: '#FF5E8B',
    },
    textColor: '#fff',
  });
}

export function showSuccess(message: string, options?: Options) {
  // TODO: Not accounting for dark theme
  Toast.show(message, {
    duration: options?.duration ?? 1500,
    opacity: 0.9,
    containerStyle: {
      backgroundColor: '#0D1F3C',
    },
    textColor: '#fff',
  });
}
