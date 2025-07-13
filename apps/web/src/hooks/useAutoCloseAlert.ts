import { AlertProps } from '@/components/ui/alert/Alert';
import { useState, useEffect, useCallback } from 'react';

export function useAutoCloseAlert(duration: number = 2000) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertObj, setAlertObj] = useState<AlertProps>({ variant: 'info', message: '', title: '' });

  const setAlert = useCallback((alert: AlertProps) => {
    setAlertObj(alert);
    setAlertVisible(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (alertVisible) {
      timer = setTimeout(() => {
        setAlertVisible(false);
        setAlertObj({
          variant: 'info',
          title: '',
          message: '',
        });
      }, duration);
    }

    return () => clearTimeout(timer);
  }, [alertVisible, duration]);

  return { setAlert, alertVisible, alertObj };
}
