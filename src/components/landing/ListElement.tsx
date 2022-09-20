import { CheckBox } from '@mui/icons-material';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import React from 'react';

type Props = {
  text: string;
};

export const ListElement = ({ text }: Props) => (
  <ListItem>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={text} primaryTypographyProps={{ fontSize: 22 }} />
  </ListItem>
);

const Icon = styled(CheckBox)(({ theme }) => ({
  fontSize: 36,
  color: theme.palette.primary.contrastText,
}))