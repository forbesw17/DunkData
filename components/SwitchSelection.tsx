
import React from 'react';
import { Switch } from 'react-native';

interface SwitchSelectionProps {
    onSelectionChange: (isEnabled: boolean) => void;
    isEnabled: boolean;
}

const SwitchSelection: React.FC<SwitchSelectionProps> = ({ isEnabled, onSelectionChange }) => {

    const handleSelectionChange = (value: boolean) => {
        onSelectionChange(value);
    };

    return (
        <Switch
            value={isEnabled}
            onValueChange={handleSelectionChange}
        />
    );
};

export default SwitchSelection;