
import React, { useState } from 'react';
import { Switch } from 'react-native';

interface SwitchSelectionProps {
    onSelectionChange: (isEnabled: boolean) => void;
}

const SwitchSelection: React.FC<SwitchSelectionProps> = ({ onSelectionChange }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    const handleSelectionChange = (value: boolean) => {
        setIsEnabled(value);
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