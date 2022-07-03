import { useField } from 'formik'
import {
  TextField,
  Paper,
  MenuItem,
  Button,
  Divider,
  PaperProps,
  Autocomplete,
} from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import { ClubBasicDataDto } from '../../types/clubs'

interface ICustomPaperProps extends PaperProps {
  onAddClubClick: () => void
}

const CustomPaper = (props: ICustomPaperProps) => {
  const { onAddClubClick, children } = props
  return (
    <Paper {...props}>
      <MenuItem>
        <Button
          color="primary"
          startIcon={<AddOutlined />}
          onClick={onAddClubClick}
          onMouseDown={e => e.preventDefault()}
        >
          Dodaj nowy klub
        </Button>
      </MenuItem>
      <Divider />
      {children}
    </Paper>
  )
}

interface IClubsComboProps {
  clubsData: ClubBasicDataDto[]
  name: string
  label: string
  size?: 'medium' | 'small'
  addClubOption?: boolean
  onAddClubClick?: () => void
}

export const ClubsCombo = ({
  clubsData,
  name,
  label,
  size,
  addClubOption,
  onAddClubClick,
}: IClubsComboProps) => {
  const [field, fieldMeta, fieldHelpers] = useField(name)

  const { value } = field
  const { error, touched } = fieldMeta
  const { setValue } = fieldHelpers

  return (
    <Autocomplete
      id={name}
      {...field}
      onChange={(_, newValue: string | null) => {
        setValue(newValue)
      }}
      value={value}
      options={['', ...clubsData.map(club => club.id)]}
      disableClearable
      getOptionLabel={option => {
        const club = clubsData.find(c => c.id === option)
        if (club) {
          return club.name
        }
        return 'brak'
      }}
      renderOption={(props, option) => {
        const club = clubsData.find(c => c.id === option)
        return (
          <li {...props} key={option.id}>
            {club?.name || 'brak'}
          </li>
        )
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={touched && !!error}
          helperText={touched && error}
        />
      )}
      size={size}
      PaperComponent={
        addClubOption && onAddClubClick
          ? (props: PaperProps) => (
              <CustomPaper {...props} onAddClubClick={onAddClubClick} />
            )
          : Paper
      }
    />
  )
}
