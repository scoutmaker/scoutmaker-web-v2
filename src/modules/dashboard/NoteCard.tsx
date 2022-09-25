import { Card, CardActionArea, CardContent, CardHeader, Grid } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { NotesIcon } from "@/components/icons";
import { formatDate } from "@/utils/format-date";
import { getDocumentNumber } from "@/utils/get-document-number";

import { NoteDto } from "../notes/types";
import { CardItemBasic } from "@/components/details-card/details-card-item";
import { StyledAvatar } from "./StyledAvatar";

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
              <StyledAvatar aria-label="note icon" secondary>
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
          <CardItemBasic
            title={t('PLAYER')}
            value={player
              ? `${player.firstName} ${player.lastName}`
              : `${t('PLAYER')} no. ${shirtNo || 'N/A'}`}
            href={player ? `/players/${player.slug}` : undefined} />
          <CardItemBasic title={t('CREATED_DATE')} value={formatDate(createdAt)} />
          <CardItemBasic title={t('SCOUT')} value={`${author.firstName} ${author.lastName}`} />
          <CardItemBasic title={t('RATING')} value={rating} />
        </Grid>
      </CardContent>
    </Card>
  );
};
