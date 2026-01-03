'use client';
import { Tabs as MuiTabs, Tab as MuiTab, Box } from "@mui/material";
import { useState, Children, isValidElement, cloneElement } from "react";

export const Tabs = ({
    children,
    selectedKey,
    onSelectionChange,
    variant,
    color,
    radius,
    fullWidth,
    size,
    classNames,
    ...props
}: any) => {
    const arrayChildren = Children.toArray(children) as React.ReactElement[];

    // Helper to get consistent value from child
    const getChildValue = (child: React.ReactElement<any>) => {
        let key = child.key?.toString();
        if (key?.startsWith('.$')) {
            key = key.substring(2);
        }
        return key || child.props.title;
    };

    // Handle both controlled and uncontrolled state
    const [internalValue, setInternalValue] = useState(() => {
        if (selectedKey !== undefined) return selectedKey;
        const firstValidChild = arrayChildren.find(child => isValidElement(child));
        return firstValidChild ? getChildValue(firstValidChild) : null;
    });

    const isControlled = selectedKey !== undefined;
    const value = isControlled ? selectedKey : internalValue;

    const handleChange = (event: React.SyntheticEvent, newValue: any) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }
        if (onSelectionChange) {
            onSelectionChange(newValue);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <MuiTabs
                value={value}
                onChange={handleChange}
                variant={fullWidth ? "fullWidth" : "standard"}
                textColor={color === "primary" ? "primary" : "inherit"}
                indicatorColor={color === "primary" ? "primary" : "secondary"}
                className={classNames?.base}
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
                {...props}
            >
                {arrayChildren.map((child) => {
                    if (!isValidElement(child)) return null;
                    const reactChild = child as React.ReactElement<any>;
                    const childValue = getChildValue(reactChild);

                    return (
                        <MuiTab
                            key={childValue}
                            value={childValue}
                            label={reactChild.props.title}
                            icon={reactChild.props.icon}
                            iconPosition="start"
                            className={classNames?.tab}
                            sx={{ minHeight: 48 }}
                        />
                    );
                })}
            </MuiTabs>

            {/* Render Content */}
            {arrayChildren.map((child) => {
                if (!isValidElement(child)) return null;
                const reactChild = child as React.ReactElement<any>;
                const childValue = getChildValue(reactChild);

                if (childValue !== value) return null;

                return (
                    <Box key={childValue} role="tabpanel">
                        {reactChild.props.children}
                    </Box>
                );
            })}
        </Box>
    );
};

export const Tab = ({ key, title, children, ...props }: any) => {
    // This component is a placeholder for props storage.
    // The Tabs component reads its props (title, children).
    return null;
};
