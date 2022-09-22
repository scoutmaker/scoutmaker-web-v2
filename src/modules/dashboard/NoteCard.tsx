import { Avatar, Card, CardActionArea, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { NotesIcon } from "@/components/icons";
import { formatDate } from "@/utils/format-date";
import { getDocumentNumber } from "@/utils/get-document-number";

import { NoteDto } from "../notes/types";

interface INoteCardProps {
  note: NoteDto;
  title: string;
}

export const NoteCard = ({ note, title }: INoteCardProps) => {
  const { t } = useTranslation()
  const { player, docNumber, id, author, createdAt, rating, shirtNo } = note;

  return (
    <Card sx={{ margin: '0 auto', width: '100%' }}>
      <CardActionArea>
        <Link href={`/notes/${id}`}>
          <CardHeader
            avatar={
              <StyledAvatar aria-label="note icon" >
                <NotesIcon />
              </StyledAvatar>
            }
            title={title.toUpperCase()}
            titleTypographyProps={{ variant: 'h6', color: 'textSecondary' }}
            subheader={t('dashboard:NOTE_NO', { number: getDocumentNumber({ docNumber, createdAt }) })}
          />
        </Link>
      </CardActionArea>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('PLAYER')}: </strong>
              {player
                ? `${player.firstName} ${player.lastName}`
                : `${t('PLAYER')} no. ${shirtNo || 'N/A'}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('SCOUT')}: </strong>
              {author.firstName} {author.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('CREATED_DATE')}: </strong>
              {formatDate(createdAt)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>{t('RATING')}: </strong>
              {rating}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const StyledAvatar = ({ children }: any) => (<Avatar sx={(theme) => ({
  background: theme.palette.secondary.main,
  width: 50,
  height: 50,
})}>{children}</Avatar>)