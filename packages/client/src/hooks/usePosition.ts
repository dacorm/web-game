import {
    useCallback, useEffect, useRef, useState,
} from 'react';

interface Config {
  positionOptions?: PositionOptions;
  provider?: Geolocation;
  suppressLocationOnMount?: boolean;
  onError?: (error?: GeolocationPositionError) => void;
  onSuccess?: (position: GeolocationPosition) => void;
}

interface Result {
  coords: GeolocationCoordinates | undefined;
  isGeolocationEnabled: boolean;
  positionError: GeolocationPositionError | undefined;
  getPosition: () => void;
}

const options: PositionOptions = { enableHighAccuracy: true, maximumAge: 0, timeout: Infinity };

export function useGeolocation(config: Config = {}): Result {
    const {
        positionOptions = options,
        suppressLocationOnMount = false,
        provider = typeof navigator !== 'undefined' ? navigator.geolocation : undefined,
        onError,
        onSuccess,
    } = config;

    const isCurrentlyMounted = useRef(true);

    const [coords, setCoords] = useState<GeolocationCoordinates | undefined>(undefined);
    const [positionError, setPositionError] = useState<GeolocationPositionError | undefined>(undefined);
    const [isGeolocationEnabled, setIsGeolocationEnabled] = useState<boolean>(false);

    const handlePositionError = useCallback(
        (error?: GeolocationPositionError) => {
            if (isCurrentlyMounted.current) {
                setCoords(() => undefined);
                setIsGeolocationEnabled(false);
                setPositionError(error);
            }
            onError?.(error);
        },
        [onError],
    );

    const handlePositionSuccess = useCallback(
        (position: GeolocationPosition) => {
            if (isCurrentlyMounted.current) {
                setCoords(position.coords);
                setIsGeolocationEnabled(true);
                setPositionError(() => undefined);
            }
            onSuccess?.(position);
        },
        [onSuccess],
    );

    const getPosition = useCallback(() => {
        if (!provider || !provider.getCurrentPosition) {
            throw new Error('Не получилось получить геопозицию');
        }

        provider.getCurrentPosition(handlePositionSuccess, handlePositionError, positionOptions);
    }, [provider, handlePositionError, handlePositionSuccess, positionOptions]);

    useEffect(() => {
        if (!suppressLocationOnMount) {
            getPosition();
        }
    }, []);

    return {
        coords, isGeolocationEnabled, positionError, getPosition,
    };
}
