import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { debounce } from '@mui/material/utils';
import { useTranslation } from 'react-i18next';

type PlacePrediction = {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: {
      offset: number;
      length: number;
    }[];
  };
}

type  GooglePlacesAutocompleteProps ={
  onChange: (data: { loc: google.maps.LatLngLiteral | null, address?: string }) => void;
  initialValue?: google.maps.LatLngLiteral | null;
  value?: string;
  onBlur?: () => void;
  label?: string;
  error?: boolean;
  helperText?: string;
}

export default function GooglePlacesAutocomplete({
  onChange,
  initialValue,
  value,
  onBlur,
  label,
  error,
  helperText
}: GooglePlacesAutocompleteProps) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<PlacePrediction[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlacePrediction | null>(null);

  // Update displayed value when external value changes
  useEffect(() => {
    if (value && value !== inputValue && !selectedPlace) {
      setInputValue(value);
    }
  }, [value]);

  // Function to get location from place ID
  const getPlaceDetails = (placeId: string, description: string) => {
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === 'OK' && results && results[0] && results[0].geometry) {
        const location = results[0].geometry.location;
        onChange({ 
          loc: { lat: location.lat(), lng: location.lng() },
          address: description
        });
      } else {
        console.error('Geocode error:', status);
      }
    });
  };

  // Debounced function to fetch place predictions
  const fetchPlacePredictions = React.useMemo(
    () =>
      debounce((input: string, callback: (results?: PlacePrediction[]) => void) => {
        if (!input) {
          callback([]);
          return;
        }

        const autocompleteService = new google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions(
          { input },
          callback,
        );
      }, 300),
    [],
  );

  // Load predictions when input changes
  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    fetchPlacePredictions(inputValue, (results?: PlacePrediction[]) => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetchPlacePredictions]);

  return (
    <Autocomplete
      id="google-places-autocomplete"
      getOptionLabel={(option) => typeof option === 'string' ? option : option.description}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      noOptionsText={t('maps.noOptions', 'No locations found')}
      value={selectedPlace}
      onChange={(event, newValue: PlacePrediction | null) => {
        setSelectedPlace(newValue);
        if (newValue) {
          getPlaceDetails(newValue.place_id, newValue.description);
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label || t('shipments.fields.destination')}
          fullWidth
          variant="outlined"
          onBlur={onBlur}
          error={error}
          helperText={helperText}
        />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Box  alignItems="center">
              <Box >
                <Box component={LocationOnIcon} sx={{ color: 'text.secondary', mr: 2 }} />
              </Box>
              <Box  sx={{ flexGrow: 1 }}>
                <Typography variant="body1">{option.structured_formatting.main_text}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Box>
            </Box>
          </li>
        );
      }}
    />
  );
}
