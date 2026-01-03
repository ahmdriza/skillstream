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
    // Handle both controlled and uncontrolled state
    const [internalValue, setInternalValue] = useState(
        selectedKey || (Array.isArray(children) && children[0] ? children[0].key : null)
    );

    const isControlled = selectedKey !== undefined;
    const value = isControlled ? selectedKey : internalValue;

    const handleChange = (event: any, newValue: any) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }
        if (onSelectionChange) {
            onSelectionChange(newValue);
        }
    };

    const arrayChildren = Children.toArray(children);

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
                    const reactChild = child as React.ReactElement<any>; // Cast to access props
                    const childKey = reactChild.key; // React key
                    // For MUI Tab value, we need a string/number.
                    // If key is null, use index or title? HeroUI usually requires key.
                    // Let's assume key is present or fallback.
                    const value = childKey || reactChild.props.title;

                    return (
                        <MuiTab
                            key={childKey ?? value}
                            value={value}
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
                const childKey = reactChild.key;
                const childValue = childKey || reactChild.props.title;

                if (childValue !== value) return null;

                return (
                    <Box key={childKey ?? childValue} role="tabpanel">
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
