import { Accordion, AccordionDetails, AccordionSummary, Chip, styled, Typography } from "@mui/material"
import { useTranslation } from "next-i18next"

import { getFiltersText } from "./getFiltersText"
import { IFilterAccordionDtos } from "./types"

interface IProps {
  children: JSX.Element
  filters: { [key: string]: any }
  data: IFilterAccordionDtos
}

const FilterAccordion = ({ children, filters, data }: IProps) => {
  const { t } = useTranslation()
  const activeFilters = getFiltersText(t, { filters, ...data })

  return (<StyledAccordion disableGutters>
    <StyledAccordionSummary>
      <StyledAccordinText>Filtry {activeFilters.map(filt => <FilterChip label={filt} />)}</StyledAccordinText>
    </StyledAccordionSummary>
    <StyledAccordionDetails>
      {children}
    </StyledAccordionDetails>
  </StyledAccordion>)
}

export default FilterAccordion

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  background: 'none'
}))

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  background: theme.palette.primary.main,
}))

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  background: 'none',
  paddingTop: theme.spacing(2)
}))

const StyledAccordinText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textAlign: 'center',
  width: "100%",
  color: theme.palette.primary.contrastText
}))

interface IFilterChipProps {
  label: string
}

const FilterChip = ({ label }: IFilterChipProps) => (
  <Chip
    size="small"
    label={label}
    color='info'
    sx={{ fontWeight: 'bold', marginLeft: 0.5 }}
  />
)