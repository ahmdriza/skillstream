'use client';
import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";

export const Checkbox = ({ children, classNames, ...props }: any) => (
    <FormControlLabel
        control={<MuiCheckbox {...props} />}
        label={children}
        className={classNames?.label ? classNames.label : undefined}
    />
);
