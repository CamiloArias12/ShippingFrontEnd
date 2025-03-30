import { MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Language() {
    const languages: { [key: string]: string } = {
        'es': 'Español',
        'en': 'English',
        'pt': 'Português',
    };

    const { i18n } = useTranslation();

    return (
        <Select
            id="language-select"
            value={i18n.language.split('-')[0]}
            onChange={(e) => {
                i18n.changeLanguage((e.target as HTMLSelectElement).value);
            }}
        >
            {Object.keys(languages).map((key: string) => (
                <MenuItem key={key} value={key}>
                    {languages[key]}
                </MenuItem>
            ))}
        </Select>
    );
};

