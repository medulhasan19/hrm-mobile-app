import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

function useAlert() {
    const { t } = useTranslation();

    const showError = async (message?: string) => {
        Alert.alert(t('Error'), message ?? t('ErrorUnknown'), [
            { text: t('Ok') },
        ]);
    };

    return {
        showError,
    };
}

export default useAlert;
