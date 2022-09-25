import { Avatar, styled } from "@mui/material";

interface IProps {
  secondary?: boolean
}
export const StyledAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "secondary",
})<IProps>(({ theme, secondary }) => ({
  backgroundColor: secondary ? theme.palette.secondary.main : theme.palette.primary.main,
  height: secondary ? 50 : 56,
  width: secondary ? 50 : 56,
}));
