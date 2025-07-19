import React, { useEffect, useRef } from 'react';
import { Platform, View } from 'react-native';

const SITE_KEY = '6LeADR4rAAAAAD0c9CIg4-8uRh6jMAnHzJTyzfzq';
const BASE_URL = 'http://localhost';

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({ onVerify, onExpire }) => {
  if (Platform.OS === 'web') {
    // Solo para web
    const ReCAPTCHA = require('react-google-recaptcha').default;
    return (
      <View>
        <ReCAPTCHA
          sitekey={SITE_KEY}
          onChange={onVerify}
        />
      </View>
    );
  } else {
    // Solo para móvil
    const Recaptcha = require('react-native-recaptcha-that-works').default;
    type RecaptchaRefType = { open: () => void };
    const recaptchaRef = useRef<RecaptchaRefType>(null);

    // Abrir automáticamente al montar
    useEffect(() => {
      recaptchaRef.current?.open();
    }, []);

    return (
      <View>
        <Recaptcha
          ref={recaptchaRef}
          siteKey={SITE_KEY}
          baseUrl={BASE_URL}
          onVerify={onVerify}
          onExpire={onExpire}
          size="normal"
          theme="light"
          lang="en"
        />
      </View>
    );
  }
};

export default ReCaptcha;