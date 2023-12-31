import React from "react";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

type Props = {
  title?: string;
  onsubmit?: () => void;
  children: React.ReactNode;
  className?: string;
};

const StyledForm = styled("form")`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default function Form({
  title,
  onsubmit,
  children,
  className,
  ...otherProps
}: Props) {
  return (
    <StyledForm className={className} onSubmit={onsubmit} {...otherProps}>
      {title && (
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
      )}
      {children}
    </StyledForm>
  );
}
